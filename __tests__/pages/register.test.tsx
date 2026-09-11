import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const push = jest.fn();
const refresh = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push, refresh }),
}));

import RegisterForm from "@/components/RegisterForm";

beforeEach(() => {
  jest.clearAllMocks();
  global.fetch = jest.fn();
});

describe("RegisterForm", () => {
  it("shows a role picker first, with no form fields yet", () => {
    render(<RegisterForm next="/dashboard" />);
    expect(screen.getByText("First, who are you here as?")).toBeInTheDocument();
    expect(screen.queryByPlaceholderText("Jane Doe")).not.toBeInTheDocument();
  });

  it("registers as a brand with the correct payload and redirects to `next` on success", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ user: { id: "1", name: "Jane", email: "jane@example.com", role: "brand" } }),
    });

    const user = userEvent.setup();
    render(<RegisterForm next="/dashboard/opportunities" />);

    await user.click(screen.getByRole("button", { name: /i'm a brand/i }));
    expect(screen.getByText("Sign up as a brand")).toBeInTheDocument();

    await user.type(screen.getByPlaceholderText("Jane Doe"), "Jane Doe");
    await user.type(screen.getByPlaceholderText("you@company.com"), "jane@example.com");
    await user.type(screen.getByPlaceholderText("At least 8 characters"), "correcthorsebattery");
    await user.click(screen.getByRole("button", { name: /create account/i }));

    await waitFor(() => expect(push).toHaveBeenCalledWith("/dashboard/opportunities"));
    expect(global.fetch).toHaveBeenCalledWith(
      "/api/auth/register",
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({
          name: "Jane Doe",
          email: "jane@example.com",
          password: "correcthorsebattery",
          role: "brand",
        }),
      })
    );
  });

  it("registers as a creator with role: creator in the payload", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ user: { id: "1", name: "Sam", email: "sam@example.com", role: "creator" } }),
    });

    const user = userEvent.setup();
    render(<RegisterForm next="/dashboard" />);

    await user.click(screen.getByRole("button", { name: /i'm a creator/i }));
    await user.type(screen.getByPlaceholderText("Jane Doe"), "Sam Okafor");
    await user.type(screen.getByPlaceholderText("you@company.com"), "sam@example.com");
    await user.type(screen.getByPlaceholderText("At least 8 characters"), "correcthorsebattery");
    await user.click(screen.getByRole("button", { name: /create account/i }));

    await waitFor(() => {
      const call = (global.fetch as jest.Mock).mock.calls[0];
      expect(JSON.parse(call[1].body).role).toBe("creator");
    });
  });

  it("shows the server's error message on failure and stays on the form", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      json: async () => ({ error: "An account with this email already exists" }),
    });

    const user = userEvent.setup();
    render(<RegisterForm next="/dashboard" />);

    await user.click(screen.getByRole("button", { name: /i'm a brand/i }));
    await user.type(screen.getByPlaceholderText("Jane Doe"), "Jane Doe");
    await user.type(screen.getByPlaceholderText("you@company.com"), "jane@example.com");
    await user.type(screen.getByPlaceholderText("At least 8 characters"), "correcthorsebattery");
    await user.click(screen.getByRole("button", { name: /create account/i }));

    expect(await screen.findByText("An account with this email already exists")).toBeInTheDocument();
    expect(push).not.toHaveBeenCalled();
  });

  it("lets the user go back to the role picker", async () => {
    const user = userEvent.setup();
    render(<RegisterForm next="/dashboard" />);

    await user.click(screen.getByRole("button", { name: /i'm a brand/i }));
    expect(screen.getByText("Sign up as a brand")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /back/i }));
    expect(screen.getByText("First, who are you here as?")).toBeInTheDocument();
  });
});
