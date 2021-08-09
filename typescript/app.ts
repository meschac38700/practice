export default class App {
	/**
	 * Sort desc and filter numbers less than {maxNumber} in {numberArray}
	 * @param numberArray Array to filter
	 * @param maxNumber maximum number not to be exceeded
	 * @returns new array of numbers
	 */
	private static sortAndFilterLessThan(
		numberArray: Array<number>,
		maxNumber: number
	): Array<number> {
		return numberArray.sort((a, b) => b - a).filter((n) => n > maxNumber);
	}

	private static sumOfEquals(
		numberArray: Array<number>,
		target: number
	): boolean {
		return numberArray.reduce((acc, value) => (acc += value), 0) == target;
	}

	/**
	 * Find 2 indexes in the array that the addition gives the target number
	 * @param {Array} numberArray Array of numbers
	 * @param {number} target result expected
	 * @returns Array of indexes or empty Array
	 */
	static twoSum(numberArray: Array<number>, target: number): Array<number> {
		if (numberArray.includes(target)) return [numberArray.indexOf(target)];
		let result: Array<number> = [];
		for (const number of numberArray) {
			const complement: number = target - number;
			if (complement > 0 && numberArray.includes(complement)) {
				result = [numberArray.indexOf(number), numberArray.indexOf(complement)];
				break;
			}
		}
		return result;
	}

	static findAllIndexes(
		numberArray: Array<number>,
		target: number
	): Array<number> {
		let numArray = App.sortAndFilterLessThan(numberArray, target);
		let keepLoop = true;
		let i = 0;
		let numbers: Array<number> = [];
		while (keepLoop) {
			if (!numArray.length) keepLoop = false;

			if (App.sumOfEquals([...numArray], target)) {
				return numArray;
			}

			const complement: number = target - numArray[0];
			numbers.push(numArray[0]);
			numArray = App.sortAndFilterLessThan(numberArray, complement);
			if (!numArray.length) {
				numArray.shift();
				numbers.pop();
				continue;
			}

			if (!numArray.includes(complement)) {
				continue;
			}
		}
	}
}

const numberArray: Array<number> = [1, 2, 4, 8]; // 14 2 => 2 -> 12 -> not in [2, 4, 8, 16, 32] then [4, 8,] 12 - 4 = 8 in [ 4, 8] True then [indexOf(2), indexOf(4), indexOf(8)]

interface ExpectedCase {
	target: number;
	expect_indexes: Array<number>;
}

const expected_cases: Array<ExpectedCase> = [
	{ target: 12, expect_indexes: [1, 2] },
	{ target: 34, expect_indexes: [0, 4] },
	{ target: 18, expect_indexes: [0, 3] },
	{ target: 16, expect_indexes: [numberArray.indexOf(16)] },
	{ target: 32, expect_indexes: [numberArray.indexOf(32)] },
	{ target: 42, expect_indexes: [] },
];

expected_cases.forEach((expect: ExpectedCase) =>
	console.assert(
		JSON.stringify(App.twoSum(numberArray, expect.target)) ===
			JSON.stringify(expect.expect_indexes),
		new Error(`Sum for total of "${expect.target}"`)
	)
);

console.log("Everything is OK");
