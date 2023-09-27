import puppeteer from "puppeteer";
import loginToLinkedin from "./src/loginToLinkedin";
import startQuiz from "./src/startQuiz";

const SELECTED_QUIZ = Bun.argv[2];
const USERNAME = Bun.env.LINKEDIN_USERNAME;
const PASSWORD = Bun.env.LINKEDIN_PASSWORD;

if (!SELECTED_QUIZ) {
  throw new Error("Missing quiz name");
}

if (!USERNAME || !PASSWORD) {
  throw new Error("Missing LinkedIn credentials");
}

const browser = await puppeteer.launch({ headless: false });

const page = await browser.newPage();

try {
  await loginToLinkedin(page, USERNAME, PASSWORD);

  await startQuiz(page, SELECTED_QUIZ);
} catch (err) {
  page.close();
}
