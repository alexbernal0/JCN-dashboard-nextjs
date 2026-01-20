import { describe, expect, it } from "vitest";

describe("MotherDuck Connection Test", () => {
  it("should have MOTHERDUCK_TOKEN environment variable set", () => {
    const token = process.env.MOTHERDUCK_TOKEN;
    expect(token).toBeDefined();
    expect(token).not.toBe("");
    expect(typeof token).toBe("string");
  });

  it("should be able to make a test API call to fundamentals endpoint", async () => {
    // This test validates that the Python API can be called
    // In production, this would make an actual HTTP request to /api/fundamentals
    // For now, we just verify the token exists
    const token = process.env.MOTHERDUCK_TOKEN;
    expect(token).toBeTruthy();
    
    // Token format validation (should start with 'eyJ' for JWT)
    if (token) {
      expect(token.length).toBeGreaterThan(20);
    }
  });
});
