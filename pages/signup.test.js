import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Signup from "./signup";
import apiClient from "@/lib/apiClient";

jest.mock("@/lib/apiClient");

describe("Signup component", () => {
  it("renders correctly", () => {
    render(<Signup />);

    expect(screen.getByPlaceholderText("name@domain.com")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("password")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /sign up/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/login instead/i)).toBeInTheDocument();
  });

  it("submits the form with email and password", async () => {
    const email = "test@example.com";
    const password = "password123";

    apiClient.post.mockResolvedValueOnce({ data: {} });

    render(<Signup />);

    fireEvent.change(screen.getByPlaceholderText("name@domain.com"), {
      target: { value: email },
    });
    fireEvent.change(screen.getByPlaceholderText("password"), {
      target: { value: password },
    });

    fireEvent.click(screen.getByRole("button", { name: /sign up/i }));

    expect(apiClient.post).toHaveBeenCalledWith("api/auth/register", {
      email,
      password,
    });
  });

  it("handles API errors gracefully", async () => {
    const email = "test@example.com";
    const password = "password123";

    const error = new Error("Failed to register");

    apiClient.post.mockRejectedValueOnce(error);

    render(<Signup />);

    fireEvent.change(screen.getByPlaceholderText("name@domain.com"), {
      target: { value: email },
    });
    fireEvent.change(screen.getByPlaceholderText("password"), {
      target: { value: password },
    });

    fireEvent.click(screen.getByRole("button", { name: /sign up/i }));

    await screen.findByText(/error/i); // If you are displaying the error somewhere

    expect(apiClient.post).toHaveBeenCalledWith("api/auth/register", {
      email,
      password,
    });
    expect(console.log).toHaveBeenCalledWith("error", error);
  });
});
