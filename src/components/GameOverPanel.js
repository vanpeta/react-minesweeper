import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Time from "./Time";

import { updateBestTimes } from "../actions/index";

class GameOverPanel extends Component {
  constructor(props) {
		super(props);
		this.state = { show: false }
		this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
		if (this.props.isAWinner) {
			let bestTimes = this.props.bestTimes[this.props.boardSize];
			let times = bestTimes.filter(t => t <= this.props.time);
			if (times.length < 5) {
				if (bestTimes.length > 4) {
					bestTimes.splice(bestTimes.indexOf(Math.max.apply(0, bestTimes)), 1);
				}
				bestTimes.push(this.props.time);
				this.props.updateBestTimes(this.props.boardSize, bestTimes);
			}
		}
    return this.setState({ show: false });
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.isRevealed !== nextProps.isRevealed && nextProps.isRevealed) {
      this.setState({ show: true });
    }
	}

	renderMessage() {
		if (this.props.isAWinner) {
			console.log("!!!!!", this.props.isAWinner);
			return (
				<div>Congratulations, you win. Your time is: <Time t={this.props.time} />
				</div>
			);
		}
		return <div>Game over, try again</div>; 
	}

  render() {
		const show = this.state.show;
		if (show) {
			return (
				<div className="gameOverContainer">
					<div className="gameOverPannel">
						<div className="gameOverBox">
							{this.renderMessage()}
							<button className="restartButton" onClick={this.handleClick}>Close</button>
						</div>
					</div>
				</div>
			)
		}
		return null
	}
}

function mapStateToProps(state) {
  return {
		isRevealed: state.boardRevealed, isAWinner: state.isAWinner, boardSize: state.board.size, bestTimes: state.bestTimes, time: state.time
  };
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(
		{ updateBestTimes },
		dispatch
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(GameOverPanel);