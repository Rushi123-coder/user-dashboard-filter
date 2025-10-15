import React from "react";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import { describe, it, expect } from "vitest";  // ← import vitest functions
import UsersTable from "../components/UsersTable";

describe("UsersTable Component", () => {
  const mockUsers = [
    {
      id: 1,
      name: "John Doe",
      username: "johnd",
      email: "john@example.com",
      address: { city: "New York" },
      company: { name: "TechCorp" },
    },
    {
      id: 2,
      name: "Jane Smith",
      username: "janes",
      email: "jane@example.com",
      address: { city: "Los Angeles" },
      company: { name: "InnovateX" },
    },
  ];

  it("renders table headers correctly", () => {
    render(<UsersTable users={mockUsers} />);
    const headers = ["#", "Name", "Username", "Email", "City", "Company"];
    headers.forEach((header) => {
      expect(screen.getByText(header)).toBeInTheDocument();
    });
  });

  it("renders user rows correctly", () => {
    render(<UsersTable users={mockUsers} />);
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
  });

  it("shows 'No results' message when user list is empty", () => {
    render(<UsersTable users={[]} />);
    expect(screen.getByText(/No results/i)).toBeInTheDocument();
  });
});
