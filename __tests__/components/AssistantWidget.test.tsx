import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AssistantWidget from "@/components/AssistantWidget";

async function sendMessage(user: ReturnType<typeof userEvent.setup>, text: string) {
  const input = screen.getByPlaceholderText("What can I help you find?");
  await user.type(input, text);
  await user.click(screen.getByRole("button", { name: "Send message" }));
}

describe("AssistantWidget", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("echoes the user's message and replies with the specified first canned response", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<AssistantWidget />);

    await sendMessage(user, "hello there");

    expect(screen.getByText("hello there")).toBeInTheDocument();

    jest.advanceTimersByTime(500);

    expect(
      await screen.findByText(/Naano is a creator platform/i)
    ).toBeInTheDocument();
  });

  it("rotates to a different canned response on the second message", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<AssistantWidget />);

    await sendMessage(user, "first message");
    jest.advanceTimersByTime(500);
    await screen.findByText(/Naano is a creator platform/i);

    await sendMessage(user, "second message");
    jest.advanceTimersByTime(500);

    expect(
      await screen.findByText(/just a placeholder assistant/i)
    ).toBeInTheDocument();
    // the first reply should still be there too — it's a running conversation
    expect(screen.getByText(/Naano is a creator platform/i)).toBeInTheDocument();
  });

  it("does not submit an empty or whitespace-only message", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<AssistantWidget />);

    await sendMessage(user, "   ");
    jest.advanceTimersByTime(500);

    expect(screen.queryByText(/Naano is a creator platform/i)).not.toBeInTheDocument();
  });

  it("closes the panel via the close button", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<AssistantWidget />);

    await user.click(screen.getByPlaceholderText("What can I help you find?"));
    expect(screen.getByText("Naano Assistant")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Close assistant" }));
    expect(screen.queryByText("Naano Assistant")).not.toBeInTheDocument();
  });
});
