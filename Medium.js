import { winningConditions } from "./winningConditions.js";

export class MediumMode {
	getMove = (fields, player) => {
		for (let i = 0; i <= 7; i++) {
			const [posA, posB, posC] = winningConditions[i];
			const value1 = fields[posA];
			const value2 = fields[posB];
			const value3 = fields[posC];

			if (value1 === value2 && value1 !== "" && value3 === "") {
				return posC;
			}
			if (value1 === value3 && value1 !== "" && value2 === "") {
				return posB;
			}
			if (value2 === value3 && value2 !== "" && value1 === "") {
				return posA;
			}
		}

		const emptyIndexes = Object.entries(fields)
			.filter((fieldEntry) => fieldEntry[1] === "")
			.map((fieldEntry) => fieldEntry[0]);

		const randomPositionIndex = Math.floor(
			Math.random() * emptyIndexes.length
		);

		return emptyIndexes[randomPositionIndex];
	};
}
