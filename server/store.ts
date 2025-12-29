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

// Product seed data - matches schema: sku, name, description, category, price, imageUrl, stockQuantity, isActive, requiresQuote
const SEED_PRODUCTS = [
  // Enterprise Hardware - Servers
  { sku: "SM-4U60-STG", name: "Supermicro 4U 60-Bay Storage Server", description: "High-capacity storage server with 60 hot-swap 3.5 drive bays, Intel Xeon processors, and enterprise-grade reliability.", price: 38750.00, category: "enterprise-hardware", imageUrl: "/images/store/server-storage.jpg", stockQuantity: 100, isActive: "yes", requiresQuote: "no" },
  { sku: "SM-2U8-CMP", name: "Supermicro 2U 8-Bay Compute Server", description: "Powerful compute server with Intel Xeon 6521P processors (24C/48T), 256GB DDR5 RAM, and NVMe storage.", price: 15312.00, category: "enterprise-hardware", imageUrl: "/images/store/server-compute.jpg", stockQuantity: 150, isActive: "yes", requiresQuote: "no" },
  { sku: "SM-2U-HPC", name: "Supermicro 2U High-Performance Compute", description: "Premium compute server with dual Intel Xeon processors, 512GB DDR5 RAM, and ultra-fast NVMe storage.", price: 22517.00, category: "enterprise-hardware", imageUrl: "/images/store/server-hpc.jpg", stockQuantity: 50, isActive: "yes", requiresQuote: "no" },
  { sku: "NV-CX7-200", name: "NVIDIA ConnectX-7 VPI 200Gb/s", description: "Industry-leading network adapter with 200Gb/s InfiniBand and Ethernet connectivity.", price: 1850.00, category: "enterprise-hardware", imageUrl: "/images/store/nvidia-connectx.jpg", stockQuantity: 500, isActive: "yes", requiresQuote: "no" },
  { sku: "SG-EXOS-30T", name: "Seagate Exos M 3+ 30TB HDD", description: "Enterprise-class 30TB hard drive with industry-leading capacity. 2.5M hours MTBF.", price: 650.00, category: "enterprise-hardware", imageUrl: "/images/store/seagate-30tb.jpg", stockQuantity: 5000, isActive: "yes", requiresQuote: "no" },
  { sku: "MC-7450-4T", name: "Micron 7450 PRO 3.84TB NVMe SSD", description: "Data center NVMe SSD with exceptional performance. Up to 6,800 MB/s sequential read.", price: 425.00, category: "enterprise-hardware", imageUrl: "/images/store/micron-nvme.jpg", stockQuantity: 2000, isActive: "yes", requiresQuote: "no" },
  // Software & Licenses
  { sku: "ATH-PRO-MO", name: "ATHLYNX Pro Subscription", description: "Full access to ATHLYNX platform with advanced analytics, AI training bots, and priority support.", price: 29.99, category: "software", imageUrl: "/images/store/athlynx-pro.jpg", stockQuantity: 999999, isActive: "yes", requiresQuote: "no" },
  { sku: "ATH-ELT-MO", name: "ATHLYNX Elite Subscription", description: "Premium tier with unlimited AI credits, video analysis, recruiting tools, and dedicated account manager.", price: 99.99, category: "software", imageUrl: "/images/store/athlynx-elite.jpg", stockQuantity: 999999, isActive: "yes", requiresQuote: "no" },
  { sku: "AI-CRD-500", name: "AI Credits Pack - 500", description: "500 AI credits for training plans, video analysis, recruiting insights. Credits never expire.", price: 49.99, category: "software", imageUrl: "/images/store/ai-credits-500.jpg", stockQuantity: 999999, isActive: "yes", requiresQuote: "no" },
  { sku: "AI-CRD-2K", name: "AI Credits Pack - 2000", description: "2000 AI credits with 20% bonus. Best value for power users. Credits never expire.", price: 149.99, category: "software", imageUrl: "/images/store/ai-credits-2000.jpg", stockQuantity: 999999, isActive: "yes", requiresQuote: "no" },
  { sku: "WL-APP-LIC", name: "White-Label Sport App License", description: "License to deploy ATHLYNX-powered app for your sport, league, or organization.", price: 0, category: "software", imageUrl: "/images/store/white-label.jpg", stockQuantity: 100, isActive: "yes", requiresQuote: "yes" },
  { sku: "ENT-API-ACC", name: "Enterprise API Access", description: "Full API access for integration with your existing systems. Includes developer support.", price: 0, category: "software", imageUrl: "/images/store/api-access.jpg", stockQuantity: 100, isActive: "yes", requiresQuote: "yes" },
  // Data Center Packages
  { sku: "DC-START", name: "Starter Data Center Package", description: "Entry-level data center solution with 10 compute servers, 5 storage servers, and networking.", price: 0, category: "data-center", imageUrl: "/images/store/dc-starter.jpg", stockQuantity: 10, isActive: "yes", requiresQuote: "yes" },
  { sku: "DC-PRO", name: "Professional Data Center Package", description: "Mid-tier solution with 50 compute servers, 20 storage servers, and redundant networking.", price: 0, category: "data-center", imageUrl: "/images/store/dc-pro.jpg", stockQuantity: 10, isActive: "yes", requiresQuote: "yes" },
  { sku: "DC-ENT", name: "Enterprise Data Center Package", description: "Full-scale data center deployment with 200+ servers, petabyte storage, and NVIDIA networking.", price: 0, category: "data-center", imageUrl: "/images/store/dc-enterprise.jpg", stockQuantity: 5, isActive: "yes", requiresQuote: "yes" },
  { sku: "DC-CUSTOM", name: "Custom Data Center Solution", description: "Fully customized data center designed to your specifications.", price: 0, category: "data-center", imageUrl: "/images/store/dc-custom.jpg", stockQuantity: 100, isActive: "yes", requiresQuote: "yes" },
  // Support & Maintenance
  { sku: "WAR-3YR", name: "3-Year Extended Warranty", description: "Extend your hardware warranty to 3 years with parts replacement and technical support.", price: 2500.00, category: "support", imageUrl: "/images/store/warranty-3yr.jpg", stockQuantity: 999999, isActive: "yes", requiresQuote: "no" },
  { sku: "SUP-247", name: "24/7 Technical Support", description: "Round-the-clock technical support with 1-hour response time.", price: 5000.00, category: "support", imageUrl: "/images/store/support-247.jpg", stockQuantity: 999999, isActive: "yes", requiresQuote: "no" },
  { sku: "SVC-ONSITE", name: "On-Site Service Contract", description: "Next business day on-site service for hardware issues. Available nationwide.", price: 0, category: "support", imageUrl: "/images/store/onsite-service.jpg", stockQuantity: 100, isActive: "yes", requiresQuote: "yes" },
  { sku: "SVC-MANAGED", name: "Managed Services Package", description: "Full IT management including monitoring, updates, security, and optimization.", price: 0, category: "support", imageUrl: "/images/store/managed-svc.jpg", stockQuantity: 50, isActive: "yes", requiresQuote: "yes" },
  // AI Companions (Fuel Bots)
  { sku: "FB-TRAINER", name: "Fuel Bot - Sports Trainer", description: "AI-powered training companion for athletes. Runs drills, provides real-time coaching.", price: 0, category: "ai-companions", imageUrl: "/images/store/fuelbot-trainer.jpg", stockQuantity: 50, isActive: "yes", requiresQuote: "yes" },
  { sku: "FB-MEDICAL", name: "Fuel Bot - Medical Response", description: "Emergency response companion with AED delivery and real-time medical guidance.", price: 0, category: "ai-companions", imageUrl: "/images/store/fuelbot-medical.jpg", stockQuantity: 50, isActive: "yes", requiresQuote: "yes" },
  { sku: "FB-STADIUM", name: "Fuel Bot - Stadium Operations", description: "Multi-purpose companion for stadium operations including security and delivery.", price: 0, category: "ai-companions", imageUrl: "/images/store/fuelbot-stadium.jpg", stockQuantity: 30, isActive: "yes", requiresQuote: "yes" },
  { sku: "FB-DC", name: "Fuel Bot - Data Center", description: "Autonomous companion for data center monitoring, inspection, and maintenance.", price: 0, category: "ai-companions", imageUrl: "/images/store/fuelbot-datacenter.jpg", stockQuantity: 100, isActive: "yes", requiresQuote: "yes" },
  { sku: "FB-ENERGY", name: "Fuel Bot - Energy & Industrial", description: "Heavy-duty companion for energy facilities and industrial sites.", price: 0, category: "ai-companions", imageUrl: "/images/store/fuelbot-energy.jpg", stockQuantity: 50, isActive: "yes", requiresQuote: "yes" },
  // Sports Equipment
  { sku: "DG-KIT-01", name: "Diamond Grind Training Kit", description: "Complete baseball training kit with weighted balls, resistance bands, and training guide.", price: 149.99, category: "sports-equipment", imageUrl: "/images/store/dg-kit.jpg", stockQuantity: 500, isActive: "yes", requiresQuote: "no" },
  { sku: "ATH-SENS-3", name: "ATHLYNX Smart Sensor Pack", description: "Wearable sensors for tracking performance metrics. Includes 3 sensors and charging case.", price: 299.99, category: "sports-equipment", imageUrl: "/images/store/sensor-pack.jpg", stockQuantity: 300, isActive: "yes", requiresQuote: "no" },
  { sku: "TRN-CONE-50", name: "Pro Training Cones (Set of 50)", description: "Professional-grade training cones for agility drills. High-visibility colors.", price: 34.99, category: "sports-equipment", imageUrl: "/images/store/cones-50.jpg", stockQuantity: 1000, isActive: "yes", requiresQuote: "no" },
  { sku: "TRN-BAND-5", name: "Resistance Band Set", description: "Complete resistance band set with 5 levels. Perfect for warm-ups and strength training.", price: 29.99, category: "sports-equipment", imageUrl: "/images/store/bands-set.jpg", stockQuantity: 2000, isActive: "yes", requiresQuote: "no" },
];

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

  // Admin: Seed products database
  seedProducts: publicProcedure.mutation(async () => {
    const db = await getDb();
    if (!db) throw new Error('Database not available');
    
    // Clear existing products
    await db.execute(sql`DELETE FROM products`);
    
    // Insert all seed products
    for (const product of SEED_PRODUCTS) {
      await db.execute(sql.raw(`
        INSERT INTO products (sku, name, description, category, price, imageUrl, stockQuantity, isActive, requiresQuote, createdAt, updatedAt)
        VALUES ('${product.sku}', '${product.name.replace(/'/g, "''")}', '${product.description.replace(/'/g, "''")}', '${product.category}', ${product.price}, '${product.imageUrl}', ${product.stockQuantity}, '${product.isActive}', '${product.requiresQuote}', NOW(), NOW())
      `));
    }
    
    return { success: true, count: SEED_PRODUCTS.length };
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
