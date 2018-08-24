import {
  BOARD_SIZE,
  START,
  INSERT_MINES,
  CLEAR_TILE,
  FLAG_TILE,
  CLEAR_BOARD,
	IS_A_WINNER,
	SHARE_TIME,
  REVEAL_BOARD,
  UPDATE_BEST_TIMES
} from "./types";

export const boardSizeSelected = (size) => {
	return { type: BOARD_SIZE, payload: size }
}

export const start = (bool) => {
	return { type: START, payload: bool }
}

export const insertMines = (board, tileClicked) => {
	return { type: INSERT_MINES, payload: board, tileClicked }
}

export const clearTile = (board, tileClicked) => {
	return { type: CLEAR_TILE, payload: board, tileClicked }
}

export const flagTile = (board, tileToFlag) => {
	return { type: FLAG_TILE, payload: board, tileToFlag }
}

export const clearBoard = () => {
	return { type: CLEAR_BOARD }
}

export const isAWinner = (winner) => {
	return { type: IS_A_WINNER, payload: winner };
}

export const revealBoard = (bool) => {
	return { type: REVEAL_BOARD, payload: bool };
};

export const shareTime = (time) => {
	return { type: SHARE_TIME, payload: time }
}

export const updateBestTimes = (size, times) => {
	let payload = {}
	payload[size] = times;
	return { type: UPDATE_BEST_TIMES, payload };
};