import path from "node:path";

import playwright from "playwright";
import slugify from "@sindresorhus/slugify";

console.log(Object.keys(playwright).filter(key => !key.startsWith("_")).sort());

const headless = true;
const browsers = [
  playwright.chromium,
  playwright.firefox,
  // playwright.webkit,
];

for (const b of browsers) {
  const browser = await b.launch({ headless });
  const page = await browser.newPage();

  console.log(await page.evaluate(() => navigator.userAgent));

  await page.goto("https://www.whatismybrowser.com/");
  let ua = await page.textContent(".string-major");
  ua = ua.trim();
  console.log(ua);
  const screenshotPath = path.join("screenshots", `${slugify(ua)}.png`);
  await page.screenshot({ path: screenshotPath, fullPage: true });
  await browser.close();
}
