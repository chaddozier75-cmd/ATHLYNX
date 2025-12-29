import { z } from "zod";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { getDb } from "./db";
import { sql } from "drizzle-orm";

export const storeRouter = router({
  getProducts: publicProcedure
    .input(z.object({
      category: z.string().optional(),
      search: z.string().optional(),
      featured: z.boolean().optional(),
      limit: z.number().default(20),
      offset: z.number().default(0),
    }).optional())
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error('Database not available');
      const category = input?.category;
      const search = input?.search;
      const featured = input?.featured;
      const limit = input?.limit ?? 20;
      const offset = input?.offset ?? 0;
      
      let whereClause = `status = 'active'`;
      if (category) whereClause += ` AND category = '${category}'`;
      if (search) whereClause += ` AND (name LIKE '%${search}%' OR description LIKE '%${search}%')`;
      if (featured) whereClause += ` AND featured = 'yes'`;
      
      const result = await db.execute(sql.raw(`SELECT * FROM products WHERE ${whereClause} ORDER BY featured DESC, createdAt DESC LIMIT ${limit} OFFSET ${offset}`));
      return (result as any)[0] as any[];
    }),

  getProduct: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error('Database not available');
      const result = await db.execute(sql`SELECT * FROM products WHERE slug = ${input.slug} AND status = 'active' LIMIT 1`);
      return ((result as any)[0] as any[])[0] || null;
    }),

  getCategories: publicProcedure.query(async () => {
    const db = await getDb();
    if (!db) throw new Error('Database not available');
    const result = await db.execute(sql`SELECT DISTINCT category, COUNT(*) as count FROM products WHERE status = 'active' GROUP BY category`);
    return (result as any)[0] as any[];
  }),

  getFeatured: publicProcedure.query(async () => {
    const db = await getDb();
    if (!db) throw new Error('Database not available');
    const result = await db.execute(sql`SELECT * FROM products WHERE featured = 'yes' AND status = 'active' ORDER BY rating DESC LIMIT 6`);
    return (result as any)[0] as any[];
  }),

  getCart: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) throw new Error('Database not available');
    const result = await db.execute(sql`SELECT ci.*, p.name, p.price, p.salePrice, p.images, p.stock FROM cart_items ci JOIN products p ON ci.productId = p.id WHERE ci.userId = ${ctx.user.id}`);
    return (result as any)[0] as any[];
  }),

  addToCart: protectedProcedure
    .input(z.object({
      productId: z.number(),
      quantity: z.number().default(1),
      size: z.string().optional(),
      color: z.string().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new Error('Database not available');
      const existing = await db.execute(sql`SELECT * FROM cart_items WHERE userId = ${ctx.user.id} AND productId = ${input.productId}`);
      if (((existing as any)[0] as any[]).length > 0) {
        await db.execute(sql`UPDATE cart_items SET quantity = quantity + ${input.quantity} WHERE userId = ${ctx.user.id} AND productId = ${input.productId}`);
      } else {
        await db.execute(sql`INSERT INTO cart_items (userId, productId, quantity, size, color) VALUES (${ctx.user.id}, ${input.productId}, ${input.quantity}, ${input.size || null}, ${input.color || null})`);
      }
      return { success: true };
    }),

  updateCartItem: protectedProcedure
    .input(z.object({ itemId: z.number(), quantity: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new Error('Database not available');
      if (input.quantity <= 0) {
        await db.execute(sql`DELETE FROM cart_items WHERE id = ${input.itemId} AND userId = ${ctx.user.id}`);
      } else {
        await db.execute(sql`UPDATE cart_items SET quantity = ${input.quantity} WHERE id = ${input.itemId} AND userId = ${ctx.user.id}`);
      }
      return { success: true };
    }),

  removeFromCart: protectedProcedure
    .input(z.object({ itemId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new Error('Database not available');
      await db.execute(sql`DELETE FROM cart_items WHERE id = ${input.itemId} AND userId = ${ctx.user.id}`);
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
    const result = await db.execute(sql`SELECT SUM(quantity) as count FROM cart_items WHERE userId = ${ctx.user.id}`);
    return ((result as any)[0] as any[])[0]?.count || 0;
  }),

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

  createCheckout: protectedProcedure.mutation(async ({ ctx }) => {
    const db = await getDb();
    if (!db) throw new Error('Database not available');
    const cartResult = await db.execute(sql`SELECT ci.*, p.name, p.price, p.salePrice FROM cart_items ci JOIN products p ON ci.productId = p.id WHERE ci.userId = ${ctx.user.id}`);
    const cartItems = (cartResult as any)[0] as any[];
    if (cartItems.length === 0) throw new Error("Cart is empty");
    
    let subtotal = 0;
    for (const item of cartItems) {
      subtotal += parseFloat(item.salePrice || item.price) * item.quantity;
    }
    const tax = subtotal * 0.08;
    const shipping = subtotal > 50 ? 0 : 9.99;
    const total = subtotal + tax + shipping;
    const orderNumber = `ATH-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    
    await db.execute(sql`INSERT INTO orders (userId, orderNumber, status, subtotal, tax, shipping, total) VALUES (${ctx.user.id}, ${orderNumber}, 'pending', ${subtotal}, ${tax}, ${shipping}, ${total})`);
    const orderIdResult = await db.execute(sql`SELECT id FROM orders WHERE orderNumber = ${orderNumber} LIMIT 1`);
    const orderId = ((orderIdResult as any)[0] as any[])[0].id;
    
    for (const item of cartItems) {
      const price = parseFloat(item.salePrice || item.price);
      await db.execute(sql`INSERT INTO order_items (orderId, productId, productName, quantity, price, size, color) VALUES (${orderId}, ${item.productId}, ${item.name}, ${item.quantity}, ${price}, ${item.size || null}, ${item.color || null})`);
    }
    await db.execute(sql`DELETE FROM cart_items WHERE userId = ${ctx.user.id}`);
    
    return { success: true, orderNumber, total: total.toFixed(2), message: "Order placed successfully!" };
  }),

  getStats: publicProcedure.query(async () => {
    const db = await getDb();
    if (!db) throw new Error('Database not available');
    const productResult = await db.execute(sql`SELECT COUNT(*) as count FROM products WHERE status = 'active'`);
    const categoryResult = await db.execute(sql`SELECT COUNT(DISTINCT category) as count FROM products`);
    const orderResult = await db.execute(sql`SELECT COUNT(*) as count FROM orders`);
    return {
      products: ((productResult as any)[0] as any[])[0]?.count || 0,
      categories: ((categoryResult as any)[0] as any[])[0]?.count || 0,
      orders: ((orderResult as any)[0] as any[])[0]?.count || 0,
    };
  }),
});
