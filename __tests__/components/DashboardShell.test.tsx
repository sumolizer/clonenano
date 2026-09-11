import { render, screen, waitFor } from "@testing-library/react";
import DashboardShell from "@/components/dashboard/DashboardShell";

const replace = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: jest.fn(), replace }),
  usePathname: () => "/dashboard/opportunities",
}));

beforeEach(() => {
  jest.clearAllMocks();
  global.fetch = jest.fn();
});

describe("DashboardShell", () => {
  it("shows a loading state before the auth check resolves", () => {
    (global.fetch as jest.Mock).mockReturnValue(new Promise(() => {})); // never resolves
    render(<DashboardShell>content</DashboardShell>);
    expect(screen.getByText("Loading your workspace…")).toBeInTheDocument();
  });

  it("redirects to /login with the current path as `next` when logged out", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({ json: async () => ({ user: null }) });

    render(<DashboardShell>content</DashboardShell>);

    await waitFor(() =>
      expect(replace).toHaveBeenCalledWith("/login?next=%2Fdashboard%2Fopportunities")
    );
    expect(screen.queryByText("content")).not.toBeInTheDocument();
  });

  it("redirects to /login when the auth check itself fails", async () => {
    (global.fetch as jest.Mock).mockRejectedValue(new Error("network down"));

    render(<DashboardShell>content</DashboardShell>);

    await waitFor(() => expect(replace).toHaveBeenCalledWith("/login"));
  });

  it("renders the sidebar and children once a user is confirmed", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      json: async () => ({ user: { id: "1", name: "Jane Doe", email: "jane@example.com", role: "creator" } }),
    });

    render(<DashboardShell>dashboard content</DashboardShell>);

    expect(await screen.findByText("dashboard content")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Overview" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Earnings" })).toBeInTheDocument();
    expect(replace).not.toHaveBeenCalled();
  });
});
