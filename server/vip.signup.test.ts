import { describe, it, expect, beforeAll } from "vitest";
import { appRouter } from "./routers";
import { getDb } from "./db";
import { vipMembers } from "../drizzle/schema";
import { eq } from "drizzle-orm";

describe("VIP Signup Flow", () => {
  let testEmail: string;

  beforeAll(() => {
    // Generate unique test email
    testEmail = `test-${Date.now()}@athlynx.test`;
  });

  it("should successfully create a VIP member signup", async () => {
    const caller = appRouter.createCaller({
      user: null,
      req: {} as any,
      res: {} as any,
    });

    const result = await caller.vip.signup({
      email: testEmail,
      phone: "+1234567890",
      role: "Athlete",
      sport: "Baseball",
    });

    expect(result.success).toBe(true);
    expect(result.accessCode).toBeDefined();
    expect(result.accessCode.length).toBeGreaterThanOrEqual(10);
    expect(result.accessCode.length).toBeLessThanOrEqual(12);
    expect(result.accessCode).toMatch(/^[A-Z0-9]+$/);
  });

  it("should save VIP member data to database", async () => {
    const db = await getDb();
    if (!db) {
      throw new Error("Database not available");
    }

    const members = await db
      .select()
      .from(vipMembers)
      .where(eq(vipMembers.email, testEmail))
      .limit(1);

    expect(members).toHaveLength(1);
    expect(members[0].email).toBe(testEmail);
    expect(members[0].phone).toBe("+1234567890");
    expect(members[0].role).toBe("Athlete");
    expect(members[0].sport).toBe("Baseball");
    expect(members[0].status).toBe("pending");
    expect(members[0].accessCode).toBeDefined();
  });

  it("should reject duplicate email signups", async () => {
    const caller = appRouter.createCaller({
      user: null,
      req: {} as any,
      res: {} as any,
    });

    await expect(
      caller.vip.signup({
        email: testEmail,
        phone: "+1234567890",
        role: "Coach",
        sport: "Football",
      })
    ).rejects.toThrow();
  });

  it("should validate email format", async () => {
    const caller = appRouter.createCaller({
      user: null,
      req: {} as any,
      res: {} as any,
    });

    await expect(
      caller.vip.signup({
        email: "invalid-email",
        role: "Parent",
        sport: "Basketball",
      })
    ).rejects.toThrow();
  });

  it("should allow optional phone number", async () => {
    const caller = appRouter.createCaller({
      user: null,
      req: {} as any,
      res: {} as any,
    });

    const uniqueEmail = `test-nophone-${Date.now()}@athlynx.test`;
    const result = await caller.vip.signup({
      email: uniqueEmail,
      role: "Brand",
      sport: "Soccer",
    });

    expect(result.success).toBe(true);
    expect(result.accessCode).toBeDefined();

    const db = await getDb();
    if (!db) {
      throw new Error("Database not available");
    }

    const members = await db
      .select()
      .from(vipMembers)
      .where(eq(vipMembers.email, uniqueEmail))
      .limit(1);

    expect(members[0].phone).toBeNull();
  });
});
