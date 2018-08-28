import React, { Component } from 'react';
import "../style/Dashboard.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { start, clearBoard, revealBoard, isAWinner } from "../actions/index";

import Timer from "./Timer";

class Dashboard extends Component {
	constructor(props) {
		super(props);
		this.state = { className: "dashboard" };
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
		return this.props.start(false);
	}

	componentDidMount() {
		console.log("ssss")
		requestAnimationFrame(() => {
			this.setState({ className: "dashboard slideIn" });
		});
	}

	render() {
		return (
			<div className={this.state.className}>
				<div className="dashboardLeftPanel">
					<div className="data">Mines Flagged: {this.minesFlagged()}</div>
					<div className="data">Total Mines: {this.numberOfMines()}</div>
					<div className="data"><Timer /></div>
					<div className="restartButton" onClick={this.handleClick}>
						RESTART
					</div>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		board: state.board
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