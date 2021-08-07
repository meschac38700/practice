export default class App {
	/**
	 * Find 2 indexes in the array that the addition gives the target number
	 * @param {Array} numberArray Array of numbers
	 * @param {number} target result expected
	 * @returns Array of indexes or empty Array
	 */
	static twoSum(numberArray: Array<number>, target: number): Array<number> {
		let result: Array<number> = [];
		for (const number of numberArray) {
			const complement: number = target - number;
                        if(complement === 0) return [numberArray.indexOf(number)];
			if (complement > 0 && numberArray.includes(complement)) {
				result = [numberArray.indexOf(number), numberArray.indexOf(complement)];
				break;
			}
		}
		return result;
	}
}

const numberArray:Array<number> = [2, 4, 8, 16, 32];

interface ExpectedCase {
	target: number;
	expect_indexes: Array<number>;
}

const expected_cases: Array<ExpectedCase> = [
	{ target: 12, expect_indexes: [1, 2] },
	{ target: 34, expect_indexes: [0, 4] },
	{ target: 18, expect_indexes: [0, 3] },
        {target: 16, expect_indexes: [numberArray.indexOf(16)]},
        {target: 32, expect_indexes: [numberArray.indexOf(32)]},
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
