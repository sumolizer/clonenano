import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Faq from "@/components/Faq";

const ITEMS = [
  { question: "What is this?", answer: "Answer one." },
  { question: "How does it work?", answer: "Answer two." },
  { question: "Is it free?", answer: "Answer three." },
];

describe("Faq", () => {
  it("has the first question open by default", () => {
    render(<Faq items={ITEMS} />);
    expect(screen.getByText("Answer one.")).toBeInTheDocument();
    expect(screen.queryByText("Answer two.")).not.toBeInTheDocument();
  });

  it("opens a different question and closes the previous one", async () => {
    const user = userEvent.setup();
    render(<Faq items={ITEMS} />);

    await user.click(screen.getByRole("button", { name: /How does it work\?/ }));

    expect(screen.getByText("Answer two.")).toBeInTheDocument();
    expect(screen.queryByText("Answer one.")).not.toBeInTheDocument();
  });

  it("closes the open question when clicked again", async () => {
    const user = userEvent.setup();
    render(<Faq items={ITEMS} />);

    const firstQuestion = screen.getByRole("button", { name: /What is this\?/ });
    expect(firstQuestion).toHaveAttribute("aria-expanded", "true");

    await user.click(firstQuestion);

    expect(firstQuestion).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByText("Answer one.")).not.toBeInTheDocument();
  });
});
