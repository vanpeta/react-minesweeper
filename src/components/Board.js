import React, { Component } from 'react';
import { connect } from "react-redux";
import "../style/Board.css";
import Tile from "./Tile";

class Board extends Component {
	constructor(props) {
		super(props);
		this.state = { className: "board" }
	}

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

	componentDidMount() {
		requestAnimationFrame(() => {
			this.setState({ className: "board slideIn" });
		});
	}

	render() {
		return (
			<div className={this.state.className}>
				<div className={"board-" + this.props.board.size}>
					{this.renderTitles()}
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		board: state.board, started: state.isStarted
	}
}

export default connect(mapStateToProps)(Board);