import formatString from "./utils/formatString";

const findAnswerInFile = async (filePath: string, textToFind: string) => {
  const file = Bun.file(filePath);
  const correctTextToFind = formatString(textToFind).replaceAll("/", "");

  const text = await file.text();

  const lines = text.split("\n");

  let foundQuestion = false;
  let foundAnswer = false;
  let answer = "";

  // TODO: Optimize this loop
  // I did a shorcut of fastest solution becouse i speedrunned this code in <5 minutes.
  // But hey, it works

  console.log("Searching for the question in the file");
  for (let notFormattedLine of lines) {
    // Remove spaces becouse they make more problems than they solve
    const line = formatString(notFormattedLine);

    // First we need to find the question

    console.log("LINE: ", line, " QUESTION: ", textToFind);
    if (line.includes(correctTextToFind)) {
      console.log("Question found: ", line);
      foundQuestion = true;
      continue;
    }

    // If question is already found the answer is in the lines below the question

    if (foundQuestion && line.includes("[x]")) {
      console.log("Answer found");
      foundAnswer = true;
      answer = line.replace("[x]", "").trim();
      // go to the next line
      continue;
    }

    // If we find a code block in not formatted block, we need to skip it
    if (notFormattedLine.includes("```")) {
      // If we find a code block, we need to stop
      continue;
    }

    // The answer can be multiple lines so we need to account for that as well
    if (foundAnswer && foundQuestion) {
      console.log("ANSWER FOUND:", answer);
      console.log("ANSWER FOUND LINE:", line);
    }

    if (notFormattedLine.startsWith("-") && foundAnswer && foundQuestion) {
      break;
    }

    // If the answer is multiple lines and we find a new question, we need to stop
    if (notFormattedLine.startsWith("#") && foundAnswer && foundQuestion) {
      break;
    }
    if (notFormattedLine.startsWith("[") && foundAnswer && foundQuestion) {
      break;
    }

    // append the next line to the answer
    if (foundAnswer && foundQuestion) {
      answer += line.trim();
    }
  }

  if (!foundQuestion) {
    throw new Error(`Question not found: ${textToFind}`);
  }

  if (!foundAnswer) {
    throw new Error("Answer not found");
  }

  if (answer[0] === ":") {
    answer = answer.slice(1);
  }

  answer = formatString(answer).replaceAll("**", "");

  return answer;
};

export default findAnswerInFile;
