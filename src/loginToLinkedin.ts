import { Page } from "puppeteer";

const loginToLinkedin = async (
  page: Page,
  username: string,
  password: string
) => {
  if (!username || !password) {
    throw new Error("Missing LinkedIn credentials");
  }

  await page.goto("https://www.linkedin.com/login/us");

  await page.type("#username", username);
  await page.type("#password", password);

  await page.click(".btn__primary--large");

  console.log("Click on the correct frog");
  await page.waitForNavigation();
};

export default loginToLinkedin;
