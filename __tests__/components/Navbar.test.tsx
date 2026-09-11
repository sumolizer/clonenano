import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const push = jest.fn();
const refresh = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push, refresh }),
  usePathname: () => "/",
}));

import Navbar from "@/components/Navbar";

beforeEach(() => {
  jest.clearAllMocks();
  global.fetch = jest.fn();
});

function mockMe(user: unknown) {
  (global.fetch as jest.Mock).mockImplementation((url: string) => {
    if (url === "/api/auth/me") {
      return Promise.resolve({ json: async () => ({ user }) });
    }
    return Promise.resolve({ json: async () => ({}) });
  });
}

describe("Navbar auth state", () => {
  it("shows Sign in / Sign up when logged out", async () => {
    mockMe(null);
    render(<Navbar />);

    const desktopNav = screen.getByRole("banner");
    await waitFor(() => expect(within(desktopNav).getByRole("link", { name: "Sign in" })).toBeInTheDocument());
    expect(within(desktopNav).getByRole("link", { name: "Sign up" })).toBeInTheDocument();
    expect(within(desktopNav).queryByText(/Hi,/)).not.toBeInTheDocument();
  });

  it("shows a greeting and Sign out when logged in", async () => {
    mockMe({ id: "1", name: "Jane Doe", email: "jane@example.com", role: "brand" });
    render(<Navbar />);

    expect(await screen.findByText("Hi, Jane")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Sign out" })).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Sign in" })).not.toBeInTheDocument();
  });

  it("signs out, clears the greeting, and redirects home", async () => {
    mockMe({ id: "1", name: "Jane Doe", email: "jane@example.com", role: "brand" });
    const user = userEvent.setup();
    render(<Navbar />);

    const signOutBtn = await screen.findByRole("button", { name: "Sign out" });

    (global.fetch as jest.Mock).mockImplementation((url: string) => {
      if (url === "/api/auth/logout") return Promise.resolve({ json: async () => ({ ok: true }) });
      return Promise.resolve({ json: async () => ({ user: null }) });
    });

    await user.click(signOutBtn);

    expect(global.fetch).toHaveBeenCalledWith("/api/auth/logout", { method: "POST" });
    await waitFor(() => expect(push).toHaveBeenCalledWith("/"));
    expect(refresh).toHaveBeenCalled();
  });

  it("toggles the Resources dropdown", async () => {
    mockMe(null);
    const user = userEvent.setup();
    render(<Navbar />);

    expect(screen.queryByRole("link", { name: "Blog" })).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /resources/i }));
    expect(screen.getByRole("link", { name: "Blog" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Free tools" })).toBeInTheDocument();
  });
});
