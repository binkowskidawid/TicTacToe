export class EasyMode {
	getMove = (fields, player) => {

		const emptyIndexes = Object.entries(fields).filter(fieldEntry => fieldEntry[1] === "").map(fieldEntry => fieldEntry[0])

		const randomPositionIndex = Math.floor(Math.random() * emptyIndexes.length);

		return emptyIndexes[randomPositionIndex];
	};
}
