# linkedin-speedrun-quiz-bot

## I made this abomination in 2 evenings. Don't judge. 

Sometimes it crashes depending if the question is not found in the "database" or answer is different than the one on linkedin. Or i messed something up. It works 50% of the time. 

## Prerequisites

git clone this repo to main folder to make it work https://github.com/Ebazhanov/linkedin-skill-assessments-quizzes (great job guys)
```bash
git clone https://github.com/Ebazhanov/linkedin-skill-assessments-quizzes.git
```

Add your login and password to .env file. dont worry its all local 
```bash
LINKEDIN_USERNAME=YOUR_USERNAME
LINKEDIN_PASSWORD=YOUR_PASSWORD
```


To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts TEST_YOU_WANT_TO_TEST
```

This project was created using `bun init` in bun v1.0.3. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
