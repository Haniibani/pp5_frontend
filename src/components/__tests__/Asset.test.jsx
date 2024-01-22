import React from "react";
import { render, screen } from "@testing-library/react";
import Asset from "../Asset"; // Update the import path accordingly

describe("Asset Component", () => {
  it("renders a spinner when 'spinner' prop is true", () => {
    render(<Asset spinner />);
    const spinner = screen.getByTestId("spinner");
    expect(spinner).toBeInTheDocument();
  });

  it("renders an image when 'src' prop is provided", () => {
    const src = "example.jpg";
    render(<Asset src={src} message="Example Image" />);
    const image = screen.getByAltText("Example Image");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", src);
  });

  it("renders a message when 'message' prop is provided", () => {
    const message = "This is a test message.";
    render(<Asset message={message} />);
    const messageElement = screen.getByText(message);
    expect(messageElement).toBeInTheDocument();
  });

  it("does not render a spinner, image, or message when no props are provided", () => {
    render(<Asset />);
    const spinner = screen.queryByTestId("spinner");
    const image = screen.queryByAltText("Example Image");
    const messageElement = screen.queryByText("This is a test message.");
    
    expect(spinner).not.toBeInTheDocument();
    expect(image).not.toBeInTheDocument();
    expect(messageElement).not.toBeInTheDocument();
  });
});
