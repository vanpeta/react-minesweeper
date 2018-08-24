import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { start, clearBoard, revealBoard, isAWinner } from "../actions/index";

import Timer from "./Timer";

class Dashboard extends Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	minesFlagged() {
		return this.props.board.board.filter(t => t.isFlagged).length;
	}
	
	numberOfMines() {
		return this.props.board.board.filter(t => t.isMine).length;
	}

	handleClick() {
		this.props.clearBoard();
		this.props.isAWinner(false, "");
		this.props.revealBoard(false);
		return this.props.start(this.props.started);
	}

	render() {
		return <div className="dashboard">
						<div className="dashboardLeftPanel">
							<div>Mines Flagged: {this.minesFlagged()}</div>
							<div>Total Mines: {this.numberOfMines()}</div>
							<Timer />
						</div>
							<button className="restartButton" onClick={this.handleClick}>
								restart
							</button>
					 </div>;
	}
}

function mapStateToProps(state) {
	return {
		board: state.board,
		started: state.isStarted
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(
		{
			start, clearBoard, revealBoard, isAWinner
		},
		dispatch
	);
}


export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);