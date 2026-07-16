// https://jsdoc.app

/**
 * Validates the solution.
 *
 * @param {string} solution - The secret solution.
 * @throws {Error} If the solution is invalid.
 */
function validateSolution(solution) {
    if (!solution) {
        throw new Error("A solution is required.");
    }

    if (!/^\d+$/.test(solution)) {
        throw new Error("The solution must contain only digits.");
    }
}

/**
 * Validates a guess.
 *
 * @param {string} guess - The player's guess.
 * @param {string} solution - The secret solution.
 * @throws {Error} If the guess is invalid.
 */
function validateGuess(guess, solution) {
    if (!/^\d+$/.test(guess)) {
        throw new Error(`"${guess}" must contain only digits.`);
    }

    if (guess.length !== solution.length) {
        throw new Error(
            `"${guess}" must contain exactly ${solution.length} digits.`
        );
    }
}

/**
 * Builds a frequency map of characters.
 *
 * @param {string} text
 * @returns {Object}
 */
function buildFrequencyMap(text) {
    const frequencyMap = {};

    for (const character of text) {
        frequencyMap[character] = (frequencyMap[character] || 0) + 1;
    }

    return frequencyMap;
}

/**
 * Counts characters in the correct position.
 *
 * @param {string} guess
 * @param {string} solution
 * @returns {number}
 */
function countCorrectPositions(guess, solution) {
    let count = 0;

    for (let i = 0; i < guess.length; i++) {
        if (guess[i] === solution[i]) {
            count++;
        }
    }

    return count;
}

/**
 * Counts all matching characters.
 *
 * @param {string} guess
 * @param {string} solution
 * @returns {number}
 */
function countCommonCharacters(guess, solution) {
    const guessMap = buildFrequencyMap(guess);
    const solutionMap = buildFrequencyMap(solution);

    let totalMatches = 0;

    for (const character of Object.keys(guessMap)) {
        if (solutionMap[character]) {
            totalMatches += Math.min(
                guessMap[character],
                solutionMap[character]
            );
        }
    }

    return totalMatches;
}

/**
 * Calculates characters in the wrong position.
 *
 * @param {number} totalMatches
 * @param {number} correctPositions
 * @returns {number}
 */
function calculateWrongPositions(totalMatches, correctPositions) {
    return totalMatches - correctPositions;
}

/**
 * Checks one guess against the solution.
 *
 * @param {string} guess
 * @param {string} solution
 * @returns {{correct:number, wrong:number}}
 */
function checkGuess(guess, solution) {
    validateGuess(guess, solution);

    const correct = countCorrectPositions(guess, solution);
    const totalMatches = countCommonCharacters(guess, solution);
    const wrong = calculateWrongPositions(totalMatches, correct);

    return {
        correct,
        wrong,
    };
}

/**
 * Formats the result.
 *
 * @param {{correct:number, wrong:number}} result
 * @returns {string}
 */
function formatResult(result) {
    return `${result.correct}-${result.wrong}`;
}

/**
 * Processes all guesses.
 *
 * @param {string} solution
 * @param {string[]} guesses
 * @returns {string[]}
 */
function processInput(solution, guesses) {
    return guesses.map((guess) => {
        const result = checkGuess(guess, solution);
        return formatResult(result);
    });
}

// ---------------- Main Program ----------------

try {
    const [solution, guessCount, ...guesses] = process.argv.slice(2);

    validateSolution(solution);

    if (guesses.length !== Number(guessCount)) {
        throw new Error(
            `Expected ${guessCount} guesses but received ${guesses.length}.`
        );
    }

    const results = processInput(solution, guesses);

    console.log(results.join(" "));
} catch (error) {
    console.error(error.message);
    process.exit(1);
}