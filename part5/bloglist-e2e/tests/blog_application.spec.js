const { test, expect, beforeEach, describe } = require("@playwright/test");

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
      await page
        .getByRole("textbox", { name: "username" })
        .fill(mockUser.username);
      await page
        .getByRole("textbox", { name: "password" })
        .fill(mockUser.password);
      await page.getByRole("button", { name: "login" }).click();
      await expect(page.getByText(`${mockUser.name} logged in`)).toBeVisible();
    });

    test("fails with wrong credentials", async ({ page }) => {
      await page
        .getByRole("textbox", { name: "username" })
        .fill(mockUser.username);
      await page
        .getByRole("textbox", { name: "password" })
        .fill("wrongpassword");
      await page.getByRole("button", { name: "login" }).click();
      await expect(
        page.getByText("Failed to login", { exact: false })
      ).toBeVisible();
    });
  });
});
