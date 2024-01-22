import React from "react";

import { render, screen, fireEvent } from "@testing-library/react";

import { BrowserRouter as Router } from "react-router-dom";

import NavBar from "../NavBar";


jest.mock("axios");

test("renders NavBar", () => {
  render(
    <Router>
      <NavBar />
    </Router>
  );

  const logoImage = screen.getByAltText("logo");
  expect(logoImage).toBeInTheDocument();
});

test("renders Home link", () => {
  render(
    <Router>
      <NavBar />
    </Router>
  );

  const homeLink = screen.getByText("Home");
  expect(homeLink).toBeInTheDocument();
});

test("renders Sign in and Sign up links when not logged in", () => {
  render(
    <Router>
      <NavBar />
    </Router>
  );

  const signInLink = screen.getByRole("link", { name: "Sign in" });
  const signUpLink = screen.getByRole("link", { name: "Sign up" });

  expect(signInLink).toBeInTheDocument();
  expect(signUpLink).toBeInTheDocument();
});

test("renders Sign in and Sign up buttons again on log out", async () => {
  render(
    <Router>
        <NavBar />
    </Router>
  );

  // Now you can proceed with your assertions
  const signInLink = await screen.findByRole("link", { name: "Sign in" });
  const signUpLink = await screen.findByRole("link", { name: "Sign up" });

  expect(signInLink).toBeInTheDocument();
  expect(signUpLink).toBeInTheDocument();
});

