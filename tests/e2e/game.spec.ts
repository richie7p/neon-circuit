import { test, expect } from "@playwright/test";

test("new career, WebGL race, real input and pause", async ({ page }, info) => {
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  await page.goto("/");
  await page.getByRole("button", { name: "新遊戲", exact: true }).click();
  await page.getByRole("button", { name: "跳過", exact: true }).click();
  await page.getByRole("button", { name: /故事賽事/ }).click();
  await page.getByRole("button").filter({ hasText: "1." }).first().click();
  await page.getByRole("button", { name: "跳過", exact: true }).click();
  await page.getByRole("button", { name: "開始比賽", exact: true }).click();
  if (await page.getByRole("button", { name: "跳過", exact: true }).isVisible()) {
    await page.getByRole("button", { name: "跳過", exact: true }).click();
  }
  await expect(page.locator("canvas").first()).toBeVisible();
  await expect(page.getByText("KM/H", { exact: true })).toBeVisible();
  await page.keyboard.down("w");
  await expect.poll(() => page.evaluate(() => window.__controlsTest?.getSpeed() ?? 0), { timeout: 20000 }).toBeGreaterThan(1);
  await page.keyboard.up("w");
  await page.keyboard.press("Escape");
  await expect(page.getByRole("heading", { name: "暫停", exact: true })).toBeVisible();
  await page.screenshot({ path: info.outputPath("race.png") });
  expect(errors).toEqual([]);
});

test("career export, invalid import and backup-only recovery", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "新遊戲", exact: true }).click();
  await page.getByRole("button", { name: "跳過", exact: true }).click();
  await page.getByRole("button", { name: "主選單", exact: true }).click();
  await page.getByRole("button", { name: "設定", exact: true }).click();
  const download = page.waitForEvent("download");
  await page.getByRole("button", { name: "匯出存檔" }).click();
  expect((await download).suggestedFilename()).toBe("neon-circuit-save.json");
  await page.getByLabel("匯入存檔", { exact: true }).setInputFiles({ name: "bad.json", mimeType: "application/json", buffer: Buffer.from("null") });
  await expect(page.getByRole("status")).toContainText("格式無效");
  await page.evaluate(() => {
    localStorage.setItem("neon-circuit-save-v1:bak", localStorage.getItem("neon-circuit-save-v1")!);
    localStorage.removeItem("neon-circuit-save-v1");
  });
  await page.reload();
  await page.getByRole("button", { name: "繼續遊戲", exact: true }).click();
  await expect(page.getByRole("button", { name: /故事賽事/ })).toBeVisible();
});
