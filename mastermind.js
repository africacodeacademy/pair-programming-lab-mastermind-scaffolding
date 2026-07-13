// https://jsdoc.app
/**
 * @function checkGuess
 * Checks guess for "mastermind" game against solution
 *
 * @param {string} guess - the solution to the
 * @param {string} solution - the target for the guess
 *
 * @returns {string} - a string representing the number of correct numbers
 *                     in the correct position and the number of correct
 *                     numbers in the incorrect position for the guess
 *
 * @example
 * checkGuess('1532', '1234')
 * // returns '2-1'
 * // two numbers in the correct place (1 and 3)
 * // and one correct number in the incorrect place (2)
 *
 */
function checkGuess(guess, solution) {
  // Convert strings to arrays for easier manipulation
  const solutionArray = solution.split("");
  const guessArray = guess.split("");

  const guessMatched = new Array(guessArray.length).fill(false);
  const solutionMatched = new Array(solutionArray.length).fill(false);

  let perfectMatches = 0;
  for (let i = 0; i < solutionArray.length; i++) {
    if (solutionArray[i] === guessArray[i]) {
      perfectMatches++;
      solutionMatched[i] = true;
      guessMatched[i] = true;
    }
  }

  let wrongPositionMatches = 0;
  for (let i = 0; i < guessArray.length; i++) {
    if (guessMatched[i]) continue;

    for (let j = 0; j < solutionArray.length; j++) {
      if (solutionMatched[j]) continue;

      if (guessArray[i] === solutionArray[j]) {
        wrongPositionMatches++;
        solutionMatched[j] = true;
        guessMatched[i] = true;
        break;
      }
    }
  }

  return `${perfectMatches}-${wrongPositionMatches}`;
}

// https://jsdoc.app
/**
 * @function processInput
 * Checks guesses for "mastermind" game against solution
 *
 * @param {string} solution - the target for the guesses
 * @param {string[]} guesses - an array of strings representing guesses
 *
 * @returns {string[]} - an array of strings representing the number of
 *                       correct numbers in the correct position and the number
 *                       of correct numbers in the incorrect position for each
 *                       guess
 *
 * @example
 * // returns ['2-1', '0-1']
 * processInput('1234', ['1532', '8793'])
 *
 */
function processInput(solution, guesses) {
  return guesses.map((guess) => checkGuess(guess, solution));
}

// ----------- main program ------- //
// process arguments via destructuring
//
const [solution, guessCount, ...guesses] = process.argv.slice(2);

// (lightly) verify the input
if (guesses.length !== Number(guessCount)) {
  console.warn(
    `The number of guesses provided (${guesses.length}) does not match the guess count (${guessCount}).`,
  );
  console.warn("Exiting.");
  process.exit(-1);
}

// pass the input to the processor and print the output
const output = processInput(solution, guesses);
console.log(output.join(" "));
