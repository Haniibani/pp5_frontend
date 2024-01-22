import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import FilterFeed from "../FilterFeed";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

jest.mock("../../contexts/CurrentUserContext", () => ({
  useCurrentUser: jest.fn(),
}));

const mockCurrentUser = {
  profile_id: 2,
  name: "Jane Doe",
};

const mockTags = [
  { id: "1", name: "Tag1" },
  { id: "2", name: "Tag2" },
];

describe("FilterFeed Component", () => {
  beforeEach(() => {
    useCurrentUser.mockImplementation(() => mockCurrentUser);
  });

  it("renders without crashing", () => {
    render(<FilterFeed setFilter={() => {}} mobile={false} />);
  });

  it("select dropdown changes value on selecting a tag", () => {
    render(<FilterFeed setFilter={() => {}} mobile={false} />);
    const select = screen.getByLabelText(/Filter on Tag:/i);
    expect(select.value).toBe("");
    fireEvent.change(select, { target: { value: "2" } });
    expect(select.value).toBe("2");
  });

  it("allows selection of a tag", () => {
    render(<FilterFeed setFilter={() => {}} mobile={false} />);
    const select = screen.getByLabelText("Filter on Tag:");
    fireEvent.change(select, { target: { value: "2" } });
    expect(select.value).toBe("2");
  });
});
