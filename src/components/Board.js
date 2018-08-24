import React, { Component } from 'react';
import { connect } from "react-redux";

import Tile from "./Tile";

class Board extends Component {

	renderTitles() {
		const board = this.props.board.board;
		if (!this.props.board.size !== "") {
			return board.map((e, index) => {
				return (
					<Tile
						key={index}
						id={index}
						isFlagged={e.isFlagged}
						isMine={e.isMine}
						isCleared={e.isCleared}
						neighbords={e.neighbords}
					/>
				)
			})
		} else {
			return ""
		}
	}

	render() {
		return <div className={"board board-" + this.props.board.size}>{this.renderTitles()}</div>;
	}
}

function mapStateToProps(state) {
	return {
		board: state.board, started: state.isStarted
	}
}

export default connect(mapStateToProps)(Board);