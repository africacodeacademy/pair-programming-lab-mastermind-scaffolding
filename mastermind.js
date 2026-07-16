// https://jsdoc.app
/**
 * @function checkGuess
 * Checks guess for "mastermind" game against solution
 *
 * @param {string} guess - the player's guess
 * @param {string} solution - the secret code being guessed
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
  const guessChars = guess.split("");
  const solutionChars = solution.split("");

  const totalCommon = guessChars.filter((char) =>
    solutionChars.includes(char),
  ).length;

  const correctPosition = guessChars.filter(
    (char, index) => char === solutionChars[index],
  ).length;

  const wrongPosition = totalCommon - correctPosition;
  return `${correctPosition}-${wrongPosition}`;
}

// https://jsdoc.app
/**
 * @function processInput
 * Checks guesses for "mastermind" game against solution
 *
 * @param {string} solution
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

function main() {
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
}

main();
