import { Page } from "puppeteer";
import findAnswerInFile from "./findAnswerInFile";
import formatString from "./utils/formatString";

const selectAnswerAndGoNext = async (page: Page, selectedCourse: string) => {
  const element = await page.$(".sa-assessment-quiz__multi-line");

  const elementText = await page.evaluate((el) => el.textContent, element);

  const question = formatString(elementText?.split("?")[0]);

  let answer = "";

  answer = await findAnswerInFile(
    `linkedin-skill-assessments-quizzes/${selectedCourse}/${selectedCourse}-quiz.md`,
    // To run powerpoint quiz:
    // `linkedin-skill-assessments-quizzes/microsoft-power-point/microsoft-power-point-quiz.md`,
    question
  );

  const hiddenElements = await page.$$('[aria-hidden="true"]');

  const formattedAnswer = formatString(answer);

  let answerElement;

  console.log("Searching for the answer in the hidden elements");
  for (let element of hiddenElements) {
    const elementText = await page.evaluate((el) => el.textContent, element);

    console.log(elementText);
    const formattedElementText = formatString(elementText);

    console.log("AAA: ", formattedElementText, "ANSWER: ", formattedAnswer);

    if (formattedElementText?.includes(formattedAnswer)) {
      answerElement = element;

      break;
    }
  }

  const codeBlocks = await page.$$(".sa-code-block");

  // Since we can't find the answer in the hidden elements, we will try to find it in the code blocks

  if (!answerElement) {
    console.log(
      "Answer not found in hidden elements. Searching for the answer in the code blocks"
    );
    for (let codeBlock of codeBlocks) {
      let codeBlockText = await page.evaluate(
        (el) => el.textContent,
        codeBlock
      );

      const codeBlockWithoutLineNumbers = codeBlockText.split("\n");
      //Remove the first symbol of every line if it's a number (line number)
      codeBlockWithoutLineNumbers.forEach((line: string, index: number) => {
        if (!isNaN(parseInt(line[0]))) {
          codeBlockWithoutLineNumbers[index] = line.slice(1);
        }
      });

      const codeBlockTextWithoutLineNumbers =
        codeBlockWithoutLineNumbers.join("");

      const formattedCodeBlockText = formatString(
        codeBlockTextWithoutLineNumbers
      );

      console.log(formattedCodeBlockText, answer);

      if (formattedCodeBlockText?.includes(answer)) {
        answerElement = codeBlock;
        break;
      }
    }
  }

  if (!answerElement) {
    throw new Error("We couldn't find the answer :sadpepe:");
  }

  console.log("Clicking on the answer");
  answerElement?.click();

  const primaryCtaButton = await page.$(
    '[data-test-assessment-primary-cta="true"]'
  );

  if (!primaryCtaButton) {
    throw new Error("Primary CTA button not found");
  }

  console.log("Clicking on the accept answer button");
  // this says check your answer
  await primaryCtaButton.click();

  console.log("Clicking on the next question button");
  // this says next question
  await primaryCtaButton.click();
};

export default selectAnswerAndGoNext;
