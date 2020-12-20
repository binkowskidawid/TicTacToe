export class Board {
	fieldsElements = [...document.querySelectorAll(".board__item")];
	panel = document.querySelector(".panel");
	button = document.querySelector(".reset__button");
	modeSelect = document.querySelector("#mode__select");

	constructor(onItemClick, onButtonClick, onModeChange) {
		this.onButtonClick = onButtonClick;
		this.button.addEventListener("click", this.handleButtonClick);
		this.fieldsElements.forEach((field) => {
			field.addEventListener("click", onItemClick);
		});
		this.modeSelect.addEventListener("change", onModeChange);
	}

	handleButtonClick = () => {
		this.resetBoard();
		this.onButtonClick();
	};

	resetBoard = () => {
		this.resetBoardClasses();
		this.clearWinMessage();
	}

	resetBoardClasses = () => {
		this.fieldsElements.forEach((field) => {
			field.classList.remove(
				"board__item--filled-X",
				"board__item--filled-O"
			);
		});
	};

	getFieldForPosition = (position) => {
		return this.fieldsElements[position];
	}

	displayWinMessage = (activePlayer) => {
		this.panel.innerText = `Gratualcje ${activePlayer}, WYGRAŁEŚ !!!`;
	};

	displayTieMessage = () => {
		this.panel.innerText = `Remis !!!`;
	};

	clearWinMessage = () => {
		this.panel.innerText = "";
	};
}
