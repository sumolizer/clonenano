/**
 * @jest-environment node
 */
import { NextRequest } from "next/server";
import { proxy } from "@/proxy";

function requestTo(path: string, cookieHeader?: string) {
  return new NextRequest(`http://localhost${path}`, {
    headers: cookieHeader ? { cookie: cookieHeader } : undefined,
  });
}

describe("proxy (dashboard route gate)", () => {
  it("redirects to /login with a next param when there is no session cookie", () => {
    const res = proxy(requestTo("/dashboard/opportunities"));

    expect(res.status).toBe(307);
    const location = new URL(res.headers.get("location")!);
    expect(location.pathname).toBe("/login");
    expect(location.searchParams.get("next")).toBe("/dashboard/opportunities");
  });

  it("passes the request through when a session cookie is present", () => {
    const res = proxy(requestTo("/dashboard", "token=some.jwt.value"));

    expect(res.status).toBe(200);
    expect(res.headers.get("location")).toBeNull();
  });

  it("does not treat an empty cookie value as authenticated", () => {
    const res = proxy(requestTo("/dashboard", "token="));

    expect(res.status).toBe(307);
    expect(new URL(res.headers.get("location")!).pathname).toBe("/login");
  });
});
