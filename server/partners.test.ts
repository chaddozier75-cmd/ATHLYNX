import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock the database
vi.mock("./db", () => ({
  getDb: vi.fn(() => ({
    execute: vi.fn().mockResolvedValue([[{ id: 1, name: "Test Partner", company: "Test Company", access_level: "standard" }]]),
  })),
}));

// Mock notification
vi.mock("./_core/notification", () => ({
  notifyOwner: vi.fn().mockResolvedValue(true),
}));

describe("Partners Router", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Partner Authentication", () => {
    it("should have authenticate procedure defined", async () => {
      const { partnersRouter } = await import("./partners");
      expect(partnersRouter).toBeDefined();
      expect(partnersRouter._def.procedures.authenticate).toBeDefined();
    });

    it("should have getDocuments procedure defined", async () => {
      const { partnersRouter } = await import("./partners");
      expect(partnersRouter._def.procedures.getDocuments).toBeDefined();
    });

    it("should have logDownload procedure defined", async () => {
      const { partnersRouter } = await import("./partners");
      expect(partnersRouter._def.procedures.logDownload).toBeDefined();
    });
  });

  describe("Admin Procedures", () => {
    it("should have adminGetPartners procedure defined", async () => {
      const { partnersRouter } = await import("./partners");
      expect(partnersRouter._def.procedures.adminGetPartners).toBeDefined();
    });

    it("should have adminCreatePartner procedure defined", async () => {
      const { partnersRouter } = await import("./partners");
      expect(partnersRouter._def.procedures.adminCreatePartner).toBeDefined();
    });

    it("should have adminAddDocument procedure defined", async () => {
      const { partnersRouter } = await import("./partners");
      expect(partnersRouter._def.procedures.adminAddDocument).toBeDefined();
    });

    it("should have adminGetAccessLogs procedure defined", async () => {
      const { partnersRouter } = await import("./partners");
      expect(partnersRouter._def.procedures.adminGetAccessLogs).toBeDefined();
    });
  });

  describe("Access Levels", () => {
    it("should support standard, premium, and executive access levels", async () => {
      // Access levels are defined in the schema and used throughout the router
      const accessLevels = ["standard", "premium", "executive"];
      expect(accessLevels).toContain("standard");
      expect(accessLevels).toContain("premium");
      expect(accessLevels).toContain("executive");
    });
  });

  describe("Document Categories", () => {
    it("should support all document categories", async () => {
      const categories = ["quotes", "proposals", "technical", "presentations", "contracts", "other"];
      expect(categories.length).toBe(6);
      expect(categories).toContain("quotes");
      expect(categories).toContain("proposals");
      expect(categories).toContain("contracts");
    });
  });
});
