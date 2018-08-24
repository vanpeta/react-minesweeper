import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import {
  start,
  insertMines,
  clearTile,
  flagTile,
  clearBoard,
  isAWinner,
  revealBoard
} from "../actions/index";

class Tile extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.handleClick = this.handleClick.bind(this);
    this.handleOnMouseEnter = this.handleOnMouseEnter.bind(this);
    this.handleOnMouseLeave = this.handleOnMouseLeave.bind(this);
    this.handleOnKeyUp = this.handleOnKeyUp.bind(this);
	}
	
  handleClick(e) {
    e.stopPropagation();
    // desactive click if game is over or tile is flagged
		if (this.props.revealed || this.props.isFlagged) {
      return;
    }
    // initialize game
    else if (!this.props.started) {
      this.props.start(this.props.started);
      this.props.insertMines(this.props.board, this.props.id);
    }
		// lose game
    if (this.props.isMine && this.props.started) {
			this.props.isAWinner(false);
			return this.props.revealBoard(true);
		}
		// clear tile
    return this.props.clearTile(this.props.board, this.props.id);
  }

  winLogic() {
		let board = this.props.board.board;
		let flagged = board.filter(t => t.isFlagged);
		let mines = board.filter(t => t.isMine);
		if (flagged.length === mines.length && flagged.every((value, index) => value === mines[index])) {
			this.props.isAWinner(true);
			this.props.revealBoard(true);
    }
  }
  // show number of neighbord mines when tile is cleared
  neighbords() {
    const neighbordsMines = this.props.neighbords.filter(t => t.isMine).length;
    if (!this.props.isMine && this.props.isCleared && neighbordsMines > 0) {
      return neighbordsMines;
    }
    return "";
  }
  // add focus for space bar input event
  handleOnMouseEnter(e) {
		if (!this.props.revealed) {
      this.myRef.current.focus();
    }
  }
  // remove focus for space bar input event
  handleOnMouseLeave(e) {
		if (!this.props.revealed) {
      this.myRef.current.blur();
    }
  }
	//flag tile
  handleOnKeyUp(e) {
		if (!this.props.revealed) {
      if (e.keyCode !== 32) {
        return alert("Press space bar to flag mines");
      } else if (this.props.isCleared) {
        return alert("You can't flagged a cleared tile");
      } else {
        this.props.flagTile(this.props.board, this.props.id);
      }
      return this.winLogic();
    }
	}
	
	className() {
		let string = this.props.isFlagged ? "tileBox flagged" : "tileBox";
		if (this.props.isCleared) {
			string = string + " cleared";
		}
		if (this.props.isMine && this.props.revealed && !this.props.isFlagged) {
      return "tileBox revealed";
    }
    if (!this.props.isMine && this.props.revealed && this.props.isFlagged) {
      return "tileBox wrongFlagged";
    }
		return string;
	}

  render() {
    return (
      <div
        className="tile"
        onClick={this.handleClick}
        onMouseEnter={this.handleOnMouseEnter}
        onMouseLeave={this.handleOnMouseLeave}
        onKeyUp={this.handleOnKeyUp}
        tabIndex={0}
        ref={this.myRef}
      >
        <div className={this.className()} id={this.props.id}>
          {this.neighbords()}
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(
		{
			start, insertMines, clearTile, flagTile, clearBoard, isAWinner, revealBoard
		},
		dispatch
	);
}

function mapStateToProps(state) {
	return {
		started: state.isStarted, board: state.board, revealed: state.boardRevealed
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Tile);