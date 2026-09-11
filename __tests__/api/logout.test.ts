/**
 * @jest-environment node
 */
import { POST } from "@/app/api/auth/logout/route";

describe("POST /api/auth/logout", () => {
  it("clears the auth cookie", async () => {
    const res = await POST();
    expect(res.status).toBe(200);

    const cookie = res.cookies.get("token");
    expect(cookie).toBeDefined();
    expect(cookie?.value).toBe("");
    expect(cookie?.maxAge).toBe(0);
  });
});
