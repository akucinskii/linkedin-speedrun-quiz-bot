import { Page } from "puppeteer";
import selectAnswerAndGoNext from "./selectAnswerAndGoNext";

const startQuiz = async (page: Page, selectedCourse: string) => {
  await page.goto(
    `https://www.linkedin.com/skill-assessments/${selectedCourse}/quiz/?practiceModal=&practiceMode=true`
  );

  for (let i = 0; i < 2; i++) {
    await selectAnswerAndGoNext(page, selectedCourse);
    // for a while necessary
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
};

export default startQuiz;
