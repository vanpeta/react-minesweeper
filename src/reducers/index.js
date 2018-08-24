import { combineReducers } from "redux";

import board from "./reducer_board";
import isStarted from "./reducer_start"
import isAWinner from "./reducer_is_a_winner";
import boardRevealed from "./reducer_reveal_board";
import bestTimes from "./reducer_best_times";
import time from "./reducer_time";


const rootReducer = combineReducers({
	board, isStarted, isAWinner, boardRevealed, bestTimes, time
});

export default rootReducer;