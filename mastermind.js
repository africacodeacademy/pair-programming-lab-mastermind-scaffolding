// https://jsdoc.app

function createGuessData(solution, guess) {
  return {
    solutionDigits: solution.split(""),
    guessDigits: guess.split(""),
  };
}

function createMatchedArrays(length) {
  return {
    matchedSolutionDigits: new Array(length).fill(false),
    matchedGuessDigits: new Array(length).fill(false),
  };
}

function countPerfectMatches(
  solutionDigits,
  guessDigits,
  matchedSolutionDigits,
  matchedGuessDigits,
) {
  let perfectMatches = 0;

  for (let index = 0; index < solutionDigits.length; index++) {
    if (solutionDigits[index] === guessDigits[index]) {
      perfectMatches++;
      matchedSolutionDigits[index] = true;
      matchedGuessDigits[index] = true;
    }
  }

  return perfectMatches;
}

function countWrongPositionMatches(
  solutionDigits,
  guessDigits,
  matchedSolutionDigits,
  matchedGuessDigits,
) {
  let wrongPositionMatches = 0;

  for (let guessIndex = 0; guessIndex < guessDigits.length; guessIndex++) {
    if (matchedGuessDigits[guessIndex]) {
      continue;
    }

    for (
      let solutionIndex = 0;
      solutionIndex < solutionDigits.length;
      solutionIndex++
    ) {
      if (matchedSolutionDigits[solutionIndex]) {
        continue;
      }

      if (guessDigits[guessIndex] === solutionDigits[solutionIndex]) {
        wrongPositionMatches++;
        matchedGuessDigits[guessIndex] = true;
        matchedSolutionDigits[solutionIndex] = true;
        break;
      }
    }
  }

  return wrongPositionMatches;
}

function formatResult(perfectMatches, wrongPositionMatches) {
  return `${perfectMatches}-${wrongPositionMatches}`;
}

function checkGuess(guess, solution) {
  const { solutionDigits, guessDigits } = createGuessData(solution, guess);

  const { matchedSolutionDigits, matchedGuessDigits } = createMatchedArrays(
    solutionDigits.length,
  );

  const perfectMatches = countPerfectMatches(
    solutionDigits,
    guessDigits,
    matchedSolutionDigits,
    matchedGuessDigits,
  );

  const wrongPositionMatches = countWrongPositionMatches(
    solutionDigits,
    guessDigits,
    matchedSolutionDigits,
    matchedGuessDigits,
  );

  return formatResult(perfectMatches, wrongPositionMatches);
}

// https://jsdoc.app

function processInput(solution, guesses) {
  return guesses.map((guess) => checkGuess(guess, solution));
}

const [solution, guessCount, ...guesses] = process.argv.slice(2);

// Verify the input before processing.
if (guesses.length !== Number(guessCount)) {
  console.warn(
    `The number of guesses provided (${guesses.length}) does not match the guess count (${guessCount}).`,
  );
  console.warn("Exiting.");
  process.exit(-1);
}

const output = processInput(solution, guesses);
console.log(output.join(" "));
