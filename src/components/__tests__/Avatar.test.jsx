import React from "react";
import { render, screen } from "@testing-library/react";
import Avatar, { AvatarNavItem } from "../Avatar"; 

describe("Avatar Component", () => {
  it("renders an avatar image and text", () => {
    const src = "avatar.jpg";
    const text = "John Doe";
    render(<Avatar src={src} text={text} />);
    
    const avatarImage = screen.getByAltText("avatar");
    const avatarText = screen.getByText(text);
    
    expect(avatarImage).toBeInTheDocument();
    expect(avatarImage).toHaveAttribute("src", src);
    expect(avatarText).toBeInTheDocument();
  });

  it("renders an avatar image within AvatarNavItem", () => {
    const src = "avatar.jpg";
    const text = "John Doe";
    render(<AvatarNavItem src={src} text={text} />);
    
    const avatarImage = screen.getByAltText("avatar");
    const avatarText = screen.getByText(text);
    
    expect(avatarImage).toBeInTheDocument();
    expect(avatarImage).toHaveAttribute("src", src);
    expect(avatarText).toBeInTheDocument();
  });
});
