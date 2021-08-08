"use strict";
export default class App {
	/**
	 * Find 2 indexes in the array that the addition gives the target number
	 * @param {Array} numberArray Array of numbers
	 * @param {number} target result expected
	 * @returns Array of indexes or empty Array
	 */
	static twoSum(numberArray, target) {
		if (numberArray.includes(target)) return [numberArray.indexOf(target)];
		let result = [];
		for (const currentNumber of numberArray) {
			const complement = target - currentNumber;
			if (complement > 0 && numberArray.includes(complement)) {
				result = [
					numberArray.indexOf(currentNumber),
					numberArray.indexOf(complement),
				];
				break;
			}
		}
		return result;
	}
}

const expected_cases = [2, 4, 8, 16, 32];

[
	{ target: 12, expect_indexes: [1, 2] },
	{ target: 34, expect_indexes: [0, 4] },
	{ target: 18, expect_indexes: [0, 3] },
	{ target: 16, expect_indexes: [expected_cases.indexOf(16)] },
	{ target: 32, expect_indexes: [expected_cases.indexOf(32)] },
	{ target: 42, expect_indexes: [] },
].forEach((expect) =>
	console.assert(
		JSON.stringify(App.twoSum(expected_cases, expect.target)) ===
			JSON.stringify(expect.expect_indexes),
		new Error(
			`Sum for total of "${expect.target}" not ${JSON.stringify(
				App.twoSum(expected_cases, expect.target)
			)}`
		)
	)
);
console.log("Everything is OK");
