class EvenOdd {
	public constructor(public even: Array<number>, public odd: Array<number>) {}

	public equalsTo(other: EvenOdd): boolean {
		return JSON.stringify(this) === JSON.stringify(other);
	}

	public toString(): string {
		return `Even: [ ${this.even.join(", ")} ], Odd: [ ${this.odd.join(", ")} ]`;
	}
}

export default class App {
	/**
	 * @param numberArray array to divide
	 * @returns EvenOdd instance that contains odd and even numbers
	 */
	public static arrayToEvenOdd(numberArray: Array<number>): EvenOdd {
		const oddNumbers: Array<number> = [];
		const evenNumbers: Array<number> = [];
		numberArray.forEach((n) =>
			n % 2 === 0 ? evenNumbers.push(n) : oddNumbers.push(n)
		);
		return new EvenOdd(evenNumbers, oddNumbers);
	}

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
		return numberArray.sort((a, b) => b - a).filter((n) => n < maxNumber);
	}

	/**
	 * @param numberArray array of number
	 * @param target expected sum result
	 * @returns boolean array sum equals to target number
	 */
	public static sumOfEquals(
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
}

console.assert(
	App.arrayToEvenOdd([1, 2, 3, 4, 8, 16, 32]).equalsTo(
		new EvenOdd([2, 4, 8, 16, 32], [1, 3])
	),
	new Error(`Divide odd/even of "[1, 2, 3, 4, 8, 16, 32]"`)
);

const numberArray: Array<number> = [2, 4, 8, 16, 32];
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

const expectedCases: Array<ExpectedCase> = [
	{ target: 3, expect_indexes: [1, 2] },
	{ target: 4, expect_indexes: [0, 4] },
	{ target: 11, expect_indexes: [1, 2, 3, 5] },
];
expectedCases.forEach((expect: ExpectedCase) =>
	console.assert(
		App.sumOfEquals(expect.expect_indexes, expect.target),
		new Error(`Sum of [${expect.expect_indexes}] != ${expect.target}`)
	)
);
console.assert(App.sumOfEquals([1, 2], 3), new Error(`Sum of [1,2] != 3`));

console.log("Everything is OK");
