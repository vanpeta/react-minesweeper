export default function (state = { size: "", board: [] }, action) {
	switch (action.type) {
		case "BOARD_SIZE":
			const board = [];
			let id = 0;
			if (action.payload === "small") {
				board.length = 100;
			}
			else if (action.payload === "medium") {
				board.length = 400;
			}
			else if (action.payload === "large") {
				board.length = 900;
			}
			while (id < board.length) {
				board[id] = { id, isMine: false, isCleared: false, isFlagged: false, neighbords: [] };
				id++;
			}
			let newBoard = { size: action.payload, board};
			return newBoard;
		case "INSERT_MINES":
			const tileClicked = action.tileClicked;
			// setting total number of mines to 15% of the board
			let mines = (action.payload.board.length * 15) / 100;
			newBoard = Object.assign({}, action.payload);
			let randomArray = [];
			let random = 0
			//inserting mines randomly avoiding first tile clicked by tile id
			while (randomArray.length < mines) {
				random = Math.floor(Math.random() * action.payload.board.length);
				if ((!randomArray.includes(random)) && (random !== tileClicked)) {
					randomArray.push(random);
				}
			}
			randomArray.map(r => {
				let newMine = newBoard.board.find(tile => (tile.id === r));
				return newMine.isMine = true;
			});
			// identifying tile neigbors
			let diff = 0;
			if (newBoard.size === "small") {
				diff = 10;
			}
			if (newBoard.size === "medium") {
				diff = 20;
			}
			if (newBoard.size === "large") {
				diff = 30;
			}
			newBoard.board.map((tile, index) => {
				if (newBoard.board[index - (diff + 1)] && index % diff !== 0) {
					tile.neighbords.push(newBoard.board[index - (diff + 1)])
				}
				if (newBoard.board[index - diff]) {
					tile.neighbords.push(newBoard.board[index - diff])
				}
				if (newBoard.board[index - (diff - 1)] && (index + 1) % diff !== 0) {
					tile.neighbords.push(newBoard.board[index - (diff - 1)])
				}
				if (newBoard.board[index - 1] && index % diff !== 0) {
					tile.neighbords.push(newBoard.board[index - 1])
				}
				if (newBoard.board[index + 1] && (index + 1) % diff !== 0) {
					tile.neighbords.push(newBoard.board[index + 1])
				}
				if (newBoard.board[index + (diff - 1)] && index % diff !== 0) {
					tile.neighbords.push(newBoard.board[index + (diff - 1)])
				}
				if (newBoard.board[index + diff]) {
					tile.neighbords.push(newBoard.board[index + diff])
				}
				if (newBoard.board[index + (diff + 1)] && (index + 1) % diff !== 0) {
					tile.neighbords.push(newBoard.board[index + (diff + 1)])
				}
				return newBoard
			})
			return newBoard
		case "CLEAR_TILE":
			newBoard = Object.assign({}, action.payload);
			const tileToClear = newBoard.board.find(tile => (tile.id === action.tileClicked));
			if (!tileToClear.isMine) {
				// clearing tile clicked
				tileToClear.isCleared = true;
				// if no neighbor is a mine and isn't flagged
				if (tileToClear.neighbords.filter(e => e.isMine && !e.isFlagged).length === 0) {
          let safeNeighbords = tileToClear.neighbords.slice();
          function map(arr) {
            arr.map((neighbord, index) => {
							if (!neighbord.isMine && !neighbord.isFlagged) {
                newBoard.board.find(n => n === neighbord).isCleared = true;
              }
              arr.splice(index, 1);
              neighbord.neighbords.map(t => {
                if (!arr.includes(t) && t !== tileToClear && !t.isCleared && !t.isFlagged && t.neighbords.filter(e => e.isMine).length === 0) {
                  arr.push(t);
                }
                //clear tile neighbors
								if (!t.isMine && !t.isFlagged) {
                  newBoard.board.find(r => r === t).isCleared = true;
                }
                return arr;
              });
              return arr;
            });
          }
          while (safeNeighbords.length > 0) {
            map(safeNeighbords);
          }
        }
			} else {
				console.log("EXPLODED")
				return newBoard
			}
			return newBoard
		case "FLAG_TILE":
			newBoard = Object.assign({}, action.payload);
			const tileToFlag = newBoard.board.find(tile => (tile.id === action.tileToFlag));
			if (!tileToFlag.isFlagged) {
				tileToFlag.isFlagged = true;
			} else {
				tileToFlag.isFlagged = false;
			}
			return newBoard;
		case "CLEAR_BOARD":
			return { size: "", board: [] };
		default:
	}
	return state
}