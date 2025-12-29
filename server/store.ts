import { z } from "zod";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { getDb } from "./db";
import { sql } from "drizzle-orm";
import { notifyOwner } from "./_core/notification";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2025-12-15.clover",
});

// Generate unique order number
function generateOrderNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `DHG-${timestamp}-${random}`;
}

export const storeRouter = router({
  // ============================================
  // PRODUCTS
  // ============================================
  
  getProducts: publicProcedure
    .input(z.object({
      category: z.string().optional(),
      search: z.string().optional(),
      limit: z.number().default(50),
      offset: z.number().default(0),
    }).optional())
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error('Database not available');
      
      const category = input?.category;
      const search = input?.search;
      const limit = input?.limit ?? 50;
      const offset = input?.offset ?? 0;
      
      let whereClause = `isActive = 'yes'`;
      if (category && category !== 'all') {
        whereClause += ` AND category = '${category}'`;
      }
      if (search) {
        whereClause += ` AND (name LIKE '%${search}%' OR description LIKE '%${search}%')`;
      }
      
      const result = await db.execute(sql.raw(`SELECT * FROM products WHERE ${whereClause} ORDER BY category, id LIMIT ${limit} OFFSET ${offset}`));
      return (result as any)[0] as any[];
    }),

  getProduct: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error('Database not available');
      const result = await db.execute(sql`SELECT * FROM products WHERE id = ${input.id} AND isActive = 'yes' LIMIT 1`);
      return ((result as any)[0] as any[])[0] || null;
    }),

  getCategories: publicProcedure.query(async () => {
    const db = await getDb();
    if (!db) throw new Error('Database not available');
    const result = await db.execute(sql`SELECT DISTINCT category, COUNT(*) as count FROM products WHERE isActive = 'yes' GROUP BY category ORDER BY category`);
    return (result as any)[0] as any[];
  }),

  // ============================================
  // CART (Persisted for logged-in users)
  // ============================================

  getCart: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) throw new Error('Database not available');
    const result = await db.execute(sql`
      SELECT ci.id, ci.quantity, ci.addedAt, 
             p.id as productId, p.sku, p.name, p.description, p.price, p.image, p.category, p.requiresQuote
      FROM cart_items ci 
      JOIN products p ON ci.productId = p.id 
      WHERE ci.userId = ${ctx.user.id}
      ORDER BY ci.addedAt DESC
    `);
    return (result as any)[0] as any[];
  }),

  addToCart: protectedProcedure
    .input(z.object({
      productId: z.number(),
      quantity: z.number().default(1),
    }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new Error('Database not available');
      
      // Check if product requires quote
      const productResult = await db.execute(sql`SELECT requiresQuote, price FROM products WHERE id = ${input.productId}`);
      const product = ((productResult as any)[0] as any[])[0];
      if (product?.requiresQuote === 'yes' || parseFloat(product?.price) === 0) {
        throw new Error("This product requires a sales inquiry. Please contact sales.");
      }
      
      // Check if already in cart
      const existing = await db.execute(sql`SELECT id, quantity FROM cart_items WHERE userId = ${ctx.user.id} AND productId = ${input.productId}`);
      const existingItem = ((existing as any)[0] as any[])[0];
      
      if (existingItem) {
        await db.execute(sql`UPDATE cart_items SET quantity = quantity + ${input.quantity}, updatedAt = NOW() WHERE id = ${existingItem.id}`);
      } else {
        await db.execute(sql`INSERT INTO cart_items (userId, productId, quantity) VALUES (${ctx.user.id}, ${input.productId}, ${input.quantity})`);
      }
      return { success: true };
    }),

  updateCartItem: protectedProcedure
    .input(z.object({ 
      cartItemId: z.number(), 
      quantity: z.number() 
    }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new Error('Database not available');
      
      if (input.quantity <= 0) {
        await db.execute(sql`DELETE FROM cart_items WHERE id = ${input.cartItemId} AND userId = ${ctx.user.id}`);
      } else {
        await db.execute(sql`UPDATE cart_items SET quantity = ${input.quantity}, updatedAt = NOW() WHERE id = ${input.cartItemId} AND userId = ${ctx.user.id}`);
      }
      return { success: true };
    }),

  removeFromCart: protectedProcedure
    .input(z.object({ cartItemId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new Error('Database not available');
      await db.execute(sql`DELETE FROM cart_items WHERE id = ${input.cartItemId} AND userId = ${ctx.user.id}`);
      return { success: true };
    }),

  clearCart: protectedProcedure.mutation(async ({ ctx }) => {
    const db = await getDb();
    if (!db) throw new Error('Database not available');
    await db.execute(sql`DELETE FROM cart_items WHERE userId = ${ctx.user.id}`);
    return { success: true };
  }),

  getCartCount: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) throw new Error('Database not available');
    const result = await db.execute(sql`SELECT COALESCE(SUM(quantity), 0) as count FROM cart_items WHERE userId = ${ctx.user.id}`);
    return parseInt(((result as any)[0] as any[])[0]?.count) || 0;
  }),

  // ============================================
  // ORDERS
  // ============================================

  getOrders: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) throw new Error('Database not available');
    const result = await db.execute(sql`SELECT * FROM orders WHERE userId = ${ctx.user.id} ORDER BY createdAt DESC`);
    return (result as any)[0] as any[];
  }),

  getOrder: protectedProcedure
    .input(z.object({ orderNumber: z.string() }))
    .query(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new Error('Database not available');
      
      const orderResult = await db.execute(sql`SELECT * FROM orders WHERE orderNumber = ${input.orderNumber} AND userId = ${ctx.user.id} LIMIT 1`);
      const order = ((orderResult as any)[0] as any[])[0];
      
      if (order) {
        const itemsResult = await db.execute(sql`SELECT * FROM order_items WHERE orderId = ${order.id}`);
        order.items = (itemsResult as any)[0];
      }
      return order || null;
    }),

  // ============================================
  // CHECKOUT WITH STRIPE
  // ============================================

  createCheckout: protectedProcedure
    .input(z.object({
      shippingName: z.string(),
      shippingEmail: z.string().email(),
      shippingAddress: z.string(),
      shippingCity: z.string(),
      shippingZip: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new Error('Database not available');
      
      // Get cart items
      const cartResult = await db.execute(sql`
        SELECT ci.quantity, p.id as productId, p.sku, p.name, p.price, p.description
        FROM cart_items ci 
        JOIN products p ON ci.productId = p.id 
        WHERE ci.userId = ${ctx.user.id}
      `);
      const cartItems = (cartResult as any)[0] as any[];
      
      if (cartItems.length === 0) {
        throw new Error("Cart is empty");
      }
      
      // Calculate totals
      let subtotal = 0;
      const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
      
      for (const item of cartItems) {
        const price = parseFloat(item.price);
        subtotal += price * item.quantity;
        
        lineItems.push({
          price_data: {
            currency: 'usd',
            product_data: {
              name: item.name,
              description: item.description || undefined,
            },
            unit_amount: Math.round(price * 100), // Stripe uses cents
          },
          quantity: item.quantity,
        });
      }
      
      const shipping = subtotal >= 100 ? 0 : 9.99;
      const tax = subtotal * 0.0825; // 8.25% tax
      const total = subtotal + shipping + tax;
      
      // Add shipping as line item if applicable
      if (shipping > 0) {
        lineItems.push({
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Shipping',
              description: 'Standard shipping',
            },
            unit_amount: Math.round(shipping * 100),
          },
          quantity: 1,
        });
      }
      
      // Generate order number
      const orderNumber = generateOrderNumber();
      
      // Create order in database
      await db.execute(sql`
        INSERT INTO orders (userId, orderNumber, status, subtotal, shipping, tax, total, shippingName, shippingEmail, shippingAddress, shippingCity, shippingZip)
        VALUES (${ctx.user.id}, ${orderNumber}, 'pending', ${subtotal.toFixed(2)}, ${shipping.toFixed(2)}, ${tax.toFixed(2)}, ${total.toFixed(2)}, ${input.shippingName}, ${input.shippingEmail}, ${input.shippingAddress}, ${input.shippingCity}, ${input.shippingZip})
      `);
      
      // Get order ID
      const orderIdResult = await db.execute(sql`SELECT id FROM orders WHERE orderNumber = ${orderNumber} LIMIT 1`);
      const orderId = ((orderIdResult as any)[0] as any[])[0].id;
      
      // Create order items
      for (const item of cartItems) {
        const price = parseFloat(item.price);
        await db.execute(sql`
          INSERT INTO order_items (orderId, productId, productName, productSku, quantity, unitPrice, totalPrice)
          VALUES (${orderId}, ${item.productId}, ${item.name}, ${item.sku}, ${item.quantity}, ${price.toFixed(2)}, ${(price * item.quantity).toFixed(2)})
        `);
      }
      
      // Create Stripe checkout session
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        success_url: `${process.env.VITE_APP_URL || 'http://localhost:3000'}/store/success?order=${orderNumber}`,
        cancel_url: `${process.env.VITE_APP_URL || 'http://localhost:3000'}/store?cancelled=true`,
        customer_email: input.shippingEmail,
        metadata: {
          orderNumber,
          orderId: orderId.toString(),
          userId: ctx.user.id.toString(),
        },
        automatic_tax: { enabled: false },
      });
      
      // Update order with Stripe session ID
      await db.execute(sql`UPDATE orders SET stripeCheckoutSessionId = ${session.id} WHERE id = ${orderId}`);
      
      return {
        success: true,
        checkoutUrl: session.url,
        orderNumber,
        sessionId: session.id,
      };
    }),

  // Confirm payment (called after Stripe redirect)
  confirmPayment: protectedProcedure
    .input(z.object({ orderNumber: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new Error('Database not available');
      
      // Get order
      const orderResult = await db.execute(sql`SELECT * FROM orders WHERE orderNumber = ${input.orderNumber} AND userId = ${ctx.user.id} LIMIT 1`);
      const order = ((orderResult as any)[0] as any[])[0];
      
      if (!order) {
        throw new Error("Order not found");
      }
      
      if (order.status === 'paid') {
        return { success: true, alreadyPaid: true };
      }
      
      // Verify payment with Stripe
      if (order.stripeCheckoutSessionId) {
        const session = await stripe.checkout.sessions.retrieve(order.stripeCheckoutSessionId);
        
        if (session.payment_status === 'paid') {
          // Update order status
          await db.execute(sql`UPDATE orders SET status = 'paid', paidAt = NOW(), stripePaymentIntentId = ${session.payment_intent} WHERE id = ${order.id}`);
          
          // Clear cart
          await db.execute(sql`DELETE FROM cart_items WHERE userId = ${ctx.user.id}`);
          
          // Notify owner
          await notifyOwner({
            title: `New Order: ${input.orderNumber}`,
            content: `New order received!\n\nOrder: ${input.orderNumber}\nTotal: $${order.total}\nCustomer: ${order.shippingName} (${order.shippingEmail})\n\nShipping to:\n${order.shippingAddress}\n${order.shippingCity}, ${order.shippingZip}`,
          });
          
          return { success: true, paid: true };
        }
      }
      
      return { success: false, message: "Payment not confirmed" };
    }),

  // ============================================
  // SALES INQUIRIES (Enterprise/Contact Sales)
  // ============================================

  submitSalesInquiry: publicProcedure
    .input(z.object({
      name: z.string().min(1),
      email: z.string().email(),
      phone: z.string().optional(),
      company: z.string().optional(),
      jobTitle: z.string().optional(),
      inquiryType: z.enum([
        'enterprise_hardware',
        'data_center',
        'software_license',
        'fuel_bots',
        'support_contract',
        'custom_solution',
        'partnership',
        'other'
      ]),
      productInterest: z.string().optional(),
      quantity: z.number().optional(),
      budget: z.string().optional(),
      timeline: z.string().optional(),
      message: z.string().optional(),
    }))
    .mutation(async ({ input, ctx }) => {
      const db = await getDb();
      if (!db) throw new Error('Database not available');
      
      // Insert inquiry
      await db.execute(sql`
        INSERT INTO sales_inquiries (userId, name, email, phone, company, jobTitle, inquiryType, productInterest, quantity, budget, timeline, message, source)
        VALUES (${ctx.user?.id || null}, ${input.name}, ${input.email}, ${input.phone || null}, ${input.company || null}, ${input.jobTitle || null}, ${input.inquiryType}, ${input.productInterest || null}, ${input.quantity || null}, ${input.budget || null}, ${input.timeline || null}, ${input.message || null}, 'store')
      `);
      
      // Notify owner
      const inquiryTypeLabels: Record<string, string> = {
        enterprise_hardware: 'Enterprise Hardware',
        data_center: 'Data Center',
        software_license: 'Software License',
        fuel_bots: 'AI Companions / Fuel Bots',
        support_contract: 'Support Contract',
        custom_solution: 'Custom Solution',
        partnership: 'Partnership',
        other: 'Other',
      };
      
      await notifyOwner({
        title: `🔔 New Sales Inquiry: ${inquiryTypeLabels[input.inquiryType]}`,
        content: `New enterprise sales inquiry received!\n\n` +
          `**Contact:**\n` +
          `Name: ${input.name}\n` +
          `Email: ${input.email}\n` +
          `Phone: ${input.phone || 'Not provided'}\n` +
          `Company: ${input.company || 'Not provided'}\n` +
          `Title: ${input.jobTitle || 'Not provided'}\n\n` +
          `**Inquiry Details:**\n` +
          `Type: ${inquiryTypeLabels[input.inquiryType]}\n` +
          `Product Interest: ${input.productInterest || 'Not specified'}\n` +
          `Quantity: ${input.quantity || 'Not specified'}\n` +
          `Budget: ${input.budget || 'Not specified'}\n` +
          `Timeline: ${input.timeline || 'Not specified'}\n\n` +
          `**Message:**\n${input.message || 'No message provided'}`,
      });
      
      return { success: true, message: "Thank you for your inquiry! Our sales team will contact you within 24 hours." };
    }),

  getSalesInquiries: protectedProcedure.query(async ({ ctx }) => {
    // Only allow admin to view all inquiries
    if (ctx.user.role !== 'admin') {
      const db = await getDb();
      if (!db) throw new Error('Database not available');
      const result = await db.execute(sql`SELECT * FROM sales_inquiries WHERE userId = ${ctx.user.id} ORDER BY createdAt DESC`);
      return (result as any)[0] as any[];
    }
    
    const db = await getDb();
    if (!db) throw new Error('Database not available');
    const result = await db.execute(sql`SELECT * FROM sales_inquiries ORDER BY createdAt DESC`);
    return (result as any)[0] as any[];
  }),

  // ============================================
  // ADMIN: Product Management
  // ============================================

  adminCreateProduct: protectedProcedure
    .input(z.object({
      sku: z.string(),
      name: z.string(),
      description: z.string().optional(),
      category: z.string(),
      price: z.number(),
      image: z.string().optional(),
      requiresQuote: z.boolean().default(false),
    }))
    .mutation(async ({ ctx, input }) => {
      if (ctx.user.role !== 'admin') {
        throw new Error("Unauthorized");
      }
      
      const db = await getDb();
      if (!db) throw new Error('Database not available');
      
      await db.execute(sql`
        INSERT INTO products (sku, name, description, category, price, image, requiresQuote)
        VALUES (${input.sku}, ${input.name}, ${input.description || null}, ${input.category}, ${input.price.toFixed(2)}, ${input.image || null}, ${input.requiresQuote ? 'yes' : 'no'})
      `);
      
      return { success: true };
    }),

  // ============================================
  // STATS
  // ============================================

  getStats: publicProcedure.query(async () => {
    const db = await getDb();
    if (!db) throw new Error('Database not available');
    
    const productResult = await db.execute(sql`SELECT COUNT(*) as count FROM products WHERE isActive = 'yes'`);
    const categoryResult = await db.execute(sql`SELECT COUNT(DISTINCT category) as count FROM products WHERE isActive = 'yes'`);
    const orderResult = await db.execute(sql`SELECT COUNT(*) as count FROM orders WHERE status = 'paid'`);
    const inquiryResult = await db.execute(sql`SELECT COUNT(*) as count FROM sales_inquiries WHERE status = 'new'`);
    
    return {
      products: parseInt(((productResult as any)[0] as any[])[0]?.count) || 0,
      categories: parseInt(((categoryResult as any)[0] as any[])[0]?.count) || 0,
      orders: parseInt(((orderResult as any)[0] as any[])[0]?.count) || 0,
      pendingInquiries: parseInt(((inquiryResult as any)[0] as any[])[0]?.count) || 0,
    };
  }),
});
