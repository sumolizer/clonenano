import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const push = jest.fn();
const refresh = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push, refresh }),
}));

import LoginForm from "@/components/LoginForm";

beforeEach(() => {
  jest.clearAllMocks();
  global.fetch = jest.fn();
});

describe("LoginForm", () => {
  it("submits credentials and redirects to the given `next` destination on success", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ user: { id: "1", name: "Jane", email: "jane@example.com", role: "brand" } }),
    });

    const user = userEvent.setup();
    render(<LoginForm next="/dashboard/opportunities" />);

    await user.type(screen.getByPlaceholderText("you@company.com"), "jane@example.com");
    await user.type(screen.getByPlaceholderText("••••••••"), "correcthorsebattery");
    await user.click(screen.getByRole("button", { name: /sign in/i }));

    await waitFor(() => expect(push).toHaveBeenCalledWith("/dashboard/opportunities"));
    expect(refresh).toHaveBeenCalled();

    expect(global.fetch).toHaveBeenCalledWith(
      "/api/auth/login",
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({ email: "jane@example.com", password: "correcthorsebattery" }),
      })
    );
  });

  it("shows the server's error message and does not redirect on failure", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      json: async () => ({ error: "Invalid email or password" }),
    });

    const user = userEvent.setup();
    render(<LoginForm next="/dashboard" />);

    await user.type(screen.getByPlaceholderText("you@company.com"), "jane@example.com");
    await user.type(screen.getByPlaceholderText("••••••••"), "wrongpassword");
    await user.click(screen.getByRole("button", { name: /sign in/i }));

    expect(await screen.findByText("Invalid email or password")).toBeInTheDocument();
    expect(push).not.toHaveBeenCalled();
  });

  it("shows a network-error message when the request itself fails", async () => {
    (global.fetch as jest.Mock).mockRejectedValue(new Error("network down"));

    const user = userEvent.setup();
    render(<LoginForm next="/dashboard" />);

    await user.type(screen.getByPlaceholderText("you@company.com"), "jane@example.com");
    await user.type(screen.getByPlaceholderText("••••••••"), "correcthorsebattery");
    await user.click(screen.getByRole("button", { name: /sign in/i }));

    expect(await screen.findByText("Network error — please try again")).toBeInTheDocument();
    expect(push).not.toHaveBeenCalled();
  });

  it("links to the register page", () => {
    render(<LoginForm next="/dashboard" />);
    expect(screen.getByRole("link", { name: "Sign up" })).toHaveAttribute("href", "/register");
  });
});
