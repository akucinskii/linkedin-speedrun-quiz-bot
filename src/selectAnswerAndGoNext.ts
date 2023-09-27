import { Page } from "puppeteer";
import findAnswerInFile from "./findAnswerInFile";

const selectAnswerAndGoNext = async (page: Page, selectedCourse: string) => {
  const element = await page.$(".sa-assessment-quiz__multi-line");

  const elementText = await page.evaluate((el) => el.textContent, element);

  const question = elementText?.split("?")[0];

  const answer = await findAnswerInFile(
    `linkedin-skill-assessments-quizzes/${selectedCourse}/${selectedCourse}-quiz.md`,
    question
  );

  console.log(question);

  if (!answer) {
    throw new Error("Answer not found");
  }

  const hiddenElements = await page.$$('[aria-hidden="true"]');

  const answerWithoutTicks = answer.replace(/`/g, "");

  const answerWithoutHyphen = answerWithoutTicks.replace(/-/g, "");

  let answerElement;

  for (let element of hiddenElements) {
    const elementText = await page.evaluate((el) => el.textContent, element);

    console.log(
      "elementText: ",
      elementText,
      "answer we need: ",
      answerWithoutHyphen
    );

    if (elementText.replace(/-/g, "")?.includes(answerWithoutHyphen.trim())) {
      answerElement = element;
      break;
    }
  }

  if (!answerElement) {
    throw new Error("We couldn't find the answer :sadpepe:");
  }

  answerElement?.click();

  const primaryCtaButton = await page.$(
    '[data-test-assessment-primary-cta="true"]'
  );

  if (!primaryCtaButton) {
    throw new Error("Primary CTA button not found");
  }

  // this says check your answer
  await primaryCtaButton.click();

  // this says next question
  await primaryCtaButton.click();
};

export default selectAnswerAndGoNext;
