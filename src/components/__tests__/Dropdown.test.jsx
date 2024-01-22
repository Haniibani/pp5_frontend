import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Dropdown from "../Dropdown";

const mockOptions = [
  { id: 1, message: "Option 1", newField: false },
  { id: 2, message: "Option 2", newField: true },
  { id: 3, message: "Option 3", newField: false },
];

describe("Dropdown Component", () => {
  it("renders the icon element", () => {
    const IconElement = <div data-testid="mock-icon">Icon</div>;
    render(<Dropdown options={mockOptions} IconElement={IconElement} />);
    
    const iconElement = screen.getByTestId("mock-icon");
    expect(iconElement).toBeInTheDocument();
  });

  it("displays options when clicked", () => {
    const IconElement = <div data-testid="mock-icon">Icon</div>;
    const onOpenMock = jest.fn(); // Mock the onOpen function
    render(<Dropdown options={mockOptions} IconElement={IconElement} onOpen={onOpenMock} />);
    
    const iconElement = screen.getByTestId("mock-icon");
    fireEvent.click(iconElement);
    
    const option1 = screen.getByText("Option 1");
    const option2 = screen.getByText("Option 2");
    const option3 = screen.getByText("Option 3");
    
    expect(option1).toBeInTheDocument();
    expect(option2).toBeInTheDocument();
    expect(option3).toBeInTheDocument();
  });

  it("calls onOpen when clicked", () => {
    const IconElement = <div data-testid="mock-icon">Icon</div>;
    const onOpenMock = jest.fn(); // Define onOpenMock as a jest mock function
    render(<Dropdown options={mockOptions} IconElement={IconElement} onOpen={onOpenMock} />);
    
    const iconElement = screen.getByTestId("mock-icon");
    fireEvent.click(iconElement);
    
    expect(onOpenMock).toHaveBeenCalled();
  });
  
});
