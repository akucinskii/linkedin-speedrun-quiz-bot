import { Page } from "puppeteer";
import selectAnswerAndGoNext from "./selectAnswerAndGoNext";

const startQuiz = async (page: Page, selectedCourse: string) => {
  await page.goto(
    // For testing purposes, TODO: add an option to select practice mode if somebody really wants to do practice with automation software
    // `https://www.linkedin.com/skill-assessments/${selectedCourse}/quiz/?practiceModal=&practiceMode=true`

    `https://www.linkedin.com/skill-assessments/${selectedCourse}/quiz/?normal_mode`
  );

  for (let i = 0; i < 15; i++) {
    await selectAnswerAndGoNext(page, selectedCourse);
    // TODO: this is absolute garbage, but it fixed the issue with the quiz not going forward
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
};

export default startQuiz;
