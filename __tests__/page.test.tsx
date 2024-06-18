import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Home from "../app/page";

describe("Page", () => {
  it("renders a heading", () => {
    render(<Home />);

    // Check if the main container is rendered
    const main = screen.getByRole("main");
    expect(main).toBeInTheDocument();

    // Check if the code element is rendered with correct text
    const codeElement = screen.getByText("Get started by editing");
    expect(codeElement).toBeInTheDocument();
    expect(screen.getByText("app/page.tsx")).toBeInTheDocument();

    // Check if the Vercel link is rendered
    const vercelLink = screen.getByRole("link", { name: /By/i });
    expect(vercelLink).toBeInTheDocument();
    expect(vercelLink).toHaveAttribute(
      "href",
      "https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
    );

    // Check if the Next.js logo is rendered
    const nextLogo = screen.getByAltText("Next.js Logo");
    expect(nextLogo).toBeInTheDocument();

    // Check if the four links are rendered with correct texts
    const docsLink = screen.getByRole("link", { name: /Docs/i });
    expect(docsLink).toBeInTheDocument();
    expect(docsLink).toHaveAttribute(
      "href",
      "https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
    );

    const learnLink = screen.getByRole("link", { name: /Learn/i });
    expect(learnLink).toBeInTheDocument();
    expect(learnLink).toHaveAttribute(
      "href",
      "https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
    );

    const templatesLink = screen.getByRole("link", { name: /Templates/i });
    expect(templatesLink).toBeInTheDocument();
    expect(templatesLink).toHaveAttribute(
      "href",
      "https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
    );

    const deployLink = screen.getByRole("link", { name: /Deploy/i });
    expect(deployLink).toBeInTheDocument();
    expect(deployLink).toHaveAttribute(
      "href",
      "https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
    );
  });
});
