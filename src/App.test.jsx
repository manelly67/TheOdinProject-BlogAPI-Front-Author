import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "./components/routes.jsx";
import { act } from "react";

describe("something truthy and falsy", () => {
  it("true to be true", () => {
    expect(true).toBe(true);
  });

  it("false to be false", () => {
    expect(false).toBe(false);
  });
});

describe("App component", () => {
  it("renders correct nav bar", () => {
    const router = createBrowserRouter(routes);
    render(<RouterProvider router={router} />);
    const lenghNavBar = screen.getAllByRole("link").length;
    expect(lenghNavBar).toBe(2);
  });
  it("renders correct initial page", () => {
    const router = createBrowserRouter(routes);
    render(<RouterProvider router={router} />);
    const { container } = render(<RouterProvider router={router} />);
    expect(container).toMatchSnapshot();
  });
  it("should display fetched data", async () => {
    let blogdata;
    async function getData(arg) {
      try {
        const response = await fetch(arg, { mode: "cors" });
        const responseData = await response.json();
        return responseData;
      } catch (error) {
        alert("Something was wrong. try again later");
        console.log(error);
      }
    }
   
    await act(async () => {
      blogdata = await getData("https://top-backend-blogapi.onrender.com/");
      expect(blogdata.title).not.toMatch("TITLE");
      expect(blogdata.allPosts).not.toBeUndefined();
    });
  });
});
