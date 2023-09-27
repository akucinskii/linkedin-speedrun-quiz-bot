const findAnswerInFile = async (filePath: string, textToFind: string) => {
  const file = Bun.file(filePath);

  const text = await file.text();

  const lines = text.split("\n");

  let found = false;

  for (let line of lines) {
    if (line.includes(textToFind)) {
      found = true;
    }

    if (found && line.includes("[x]")) {
      const answer = line.replace("[x]", "").trim();

      return answer;
    }
  }

  if (!found) {
    throw new Error("Answer not found");
  }
};

export default findAnswerInFile;
