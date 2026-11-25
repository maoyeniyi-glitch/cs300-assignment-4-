import { render, screen, fireEvent } from "@testing-library/react";
import { expect, test } from "vitest";
import App from "./App.jsx";

test("adds a new book to the reading list", () => {
  render(<App />);

  fireEvent.change(screen.getByLabelText("Book Title"), {
    target: { value: "Things Fall Apart" }
  });

  fireEvent.change(screen.getByLabelText("Author"), {
    target: { value: "Chinua Achebe" }
  });

  fireEvent.click(
    screen.getByRole("button", { name: "Add Book" })
  );

  expect(
    screen.getByText("Things Fall Apart")
  ).toBeInTheDocument();
});

test("shows errors when the form is empty", () => {
  render(<App />);

  fireEvent.click(
    screen.getByRole("button", { name: "Add Book" })
  );

  expect(
    screen.getByText("Enter a title.")
  ).toBeInTheDocument();

  expect(
    screen.getByText("Enter an author.")
  ).toBeInTheDocument();
});