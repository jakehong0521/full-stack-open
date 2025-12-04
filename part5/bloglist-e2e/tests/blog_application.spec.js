const { test, expect, beforeEach, describe } = require("@playwright/test");

import { createBlog, loginWith, logout } from "./helper";

const mockUser = {
  name: "Jake Hong",
  username: "jake",
  password: "password",
};
const mockBlog = {
  title: "E2E testing guide",
  author: "Jake Hong",
  url: "http://e2e-testing-guide.com",
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

    test("a blog can be liked", async ({ page }) => {
      await createBlog(page, mockBlog);
      await page.getByRole("button", { name: "view" }).click();
      const likeButton = page.getByRole("button", { name: "like" });
      await likeButton.click();
      await expect(page.getByText("likes 1", { exact: false })).toBeVisible();
    });

    test("the user who added a blog can delete it", async ({ page }) => {
      page.on("dialog", (dialog) => dialog.accept());
      await createBlog(page, mockBlog);
      await page.getByRole("button", { name: "view" }).click();
      const deleteButton = page.getByRole("button", { name: "remove" });
      await deleteButton.click();
      await expect(
        page.getByText(`${mockBlog.title} - ${mockBlog.author}`, {
          exact: false,
        })
      ).not.toBeVisible();
    });

    test('only the user who added a blog sees "remove" button', async ({
      page,
      request,
    }) => {
      await createBlog(page, mockBlog);
      await page.getByRole("button", { name: "view" }).click();
      await expect(page.getByRole("button", { name: "remove" })).toBeVisible();

      await logout(page);

      const otherUser = {
        name: "Jay Hong",
        username: "jay",
        password: "password",
      };
      await request.post("/api/users", {
        data: otherUser,
      });
      await loginWith(page, otherUser.username, otherUser.password);
      await page.getByRole("button", { name: "view" }).click();
      await expect(
        page.getByRole("button", { name: "remove" })
      ).not.toBeVisible();
    });
  });
});
