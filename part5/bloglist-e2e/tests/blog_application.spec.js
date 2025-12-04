const { test, expect, beforeEach, describe } = require("@playwright/test");

import { createBlog, loginWith } from "./helper";

const mockUser = {
  name: "Jake Hong",
  username: "jake",
  password: "password",
};

describe("Blog app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("/api/testing/reset");
    await request.post("/api/users", {
      data: mockUser,
    });

    await page.goto("/");
  });

  test("Login form is shown", async ({ page }) => {
    await expect(page.getByRole("textbox", { name: "username" })).toBeVisible();
    await expect(page.getByRole("textbox", { name: "password" })).toBeVisible();
  });

  describe("Login", () => {
    test("succeeds with correct credentials", async ({ page }) => {
      await loginWith(page, mockUser.username, mockUser.password);
      await expect(page.getByText(`${mockUser.name} logged in`)).toBeVisible();
    });

    test("fails with wrong credentials", async ({ page }) => {
      await loginWith(page, mockUser.username, "wrongpassword");
      await expect(
        page.getByText("Failed to login", { exact: false })
      ).toBeVisible();
    });
  });

  describe("When logged in", () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, mockUser.username, mockUser.password);
    });

    test("a new blog can be created", async ({ page }) => {
      const mockBlog = {
        title: "E2E testing guide",
        author: "Jake Hong",
        url: "http://e2e-testing-guide.com",
      };
      await createBlog(page, mockBlog);
      await expect(
        page.getByText("a new blog", { exact: false })
      ).toBeVisible();
      await expect(
        page.getByText(`${mockBlog.title} - ${mockBlog.author}`, {
          exact: false,
        })
      ).toBeVisible();
    });
  });
});
