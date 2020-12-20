import { Board } from "./Board.js";
import { EasyMode } from "./Easy.js";
import { MediumMode } from "./Medium.js";
import {winningConditions} from "./winningConditions.js";

export class Game {
	fields = null;
	activePlayer = null;
	gameActive = null;

	currentMode = null; //null = pvp
	doesAIsMoveFirst = false;

	constructor() {
		this.board = new Board(
			this.handleItemClick,
			this.handleReset,
			this.handleModeChange
		);
		this.setDefaults();
	}

	validateGame = () => {
		let gameWon = false;

		for (let i = 0; i <= 7; i++) {
			const [posA, posB, posC] = winningConditions[i];
			const value1 = this.fields[posA];
			const value2 = this.fields[posB];
			const value3 = this.fields[posC];
			// console.group(i);
			// console.log(value1);
			// console.log(value2);
			// console.log(value3);
			// console.groupEnd();

			if (value1 != "" && value1 === value2 && value1 === value3) {
				gameWon = true;
				break;
			}
		}

		if (gameWon) {
			this.gameActive = false;
			this.board.displayWinMessage(this.activePlayer);
		} else if (this.isBoardFull()) {
			this.gameActive = false;
			this.board.displayTieMessage();
		}
	};

	isBoardFull = () => {
		return this.fields.find((field) => field === "") === undefined;
	};

	handleModeChange = (e) => {
		this.currentMode = this.getModeClassForName(e.target.value);
		this.setDefaults(false);
		this.board.resetBoard();
	};

	getModeClassForName = (name) => {
		if (name === "easy") return new EasyMode();
		if (name === "medium") return new MediumMode();
		return null;
	};

	handleReset = () => {
		this.setDefaults(!this.doesAIsMoveFirst);
		this.AIsFirstMove();
	};

	AIsFirstMove = () => {
		if (this.doesAIsMoveFirst && this.currentMode !== null) {
			this.makeMove(
				this.currentMode.getMove(this.fields, this.activePlayer)
			);
		}
	};

	handleItemClick = (e) => {
		const { pos } = e.target.dataset;

		if (this.gameActive && this.fields[pos] === "") {
			this.makeMove(pos);

			if (this.gameActive && this.currentMode !== null) {
				this.makeMove(
					this.currentMode.getMove(this.fields, this.activePlayer)
				);
			}
		}
	};

	makeMove = (position) => {
		this.fields[position] = this.activePlayer;
		this.board
			.getFieldForPosition(position)
			.classList.add(`board__item--filled-${this.activePlayer}`);
		this.validateGame();
		this.activePlayer = this.activePlayer === "X" ? "O" : "X";
	};

	setDefaults = (isAIsMove) => {
		this.fields = ["", "", "", "", "", "", "", "", ""];
		this.activePlayer = "X";
		this.gameActive = true;
		this.doesAIsMoveFirst = isAIsMove !== undefined ? isAIsMove : false;
	};
}

const game = new Game();
