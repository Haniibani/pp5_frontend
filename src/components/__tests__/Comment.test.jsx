import React from "react";

import { render, screen, fireEvent, waitFor } from "@testing-library/react";

import { BrowserRouter as Router } from "react-router-dom";

import Comment from "../Comment";

const mockComment = {
  profile_id: 1,
  profile_image: "avatar.jpg",
  owner: "John Doe",
  updated_at: "2022-01-25",
  content: "Test comment content",
  id: 123,
  setPost: jest.fn(),
  setComments: jest.fn(),
};

describe("Comment Component", () => {
  it("renders a comment", () => {
    render(
      <Router>
        <Comment {...mockComment} />
      </Router>
    );

    const ownerElement = screen.getByText("John Doe");
    const dateElement = screen.getByText("2022-01-25");
    const contentElement = screen.getByText("Test comment content");

    expect(ownerElement).toBeInTheDocument();
    expect(dateElement).toBeInTheDocument();
    expect(contentElement).toBeInTheDocument();
  });

  it("renders the owner's name", () => {
    render(
      <Router>
        <Comment {...mockComment} />
      </Router>
    );
    const ownerElement = screen.getByText("John Doe");
    expect(ownerElement).toBeInTheDocument();
  });

  it("renders the comment content", () => {
    render(
      <Router>
        <Comment {...mockComment} />
      </Router>
    );
    const contentElement = screen.getByText("Test comment content");
    expect(contentElement).toBeInTheDocument();
  });

  it("renders the profile image", () => {
    render(
      <Router>
        <Comment {...mockComment} />
      </Router>
    );
    const profileImageElement = screen.getByAltText("avatar");
    expect(profileImageElement).toBeInTheDocument();
    expect(profileImageElement).toHaveAttribute("src", "avatar.jpg");
  });
});
