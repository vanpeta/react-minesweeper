import React, { Component } from 'react';

import { connect } from "react-redux";

import Time from "./Time";

class BestTimesDashboard extends Component {
	renderTimes() {
		if (this.props.bestimes[this.props.size].length < 1) {
			return "No times yet"
		}
		return this.props.bestimes[this.props.size].map( (t, i) => {
			return (
				<div key={i}>
					{i+1}. <Time t={t} />
				</div>
			);
		});
	}
	render() {
		return (
			<div className="bestTimesDashboard">
				<div className="bestTimesDashboardHeader">Best Times (size: {this.props.size})</div>
				{this.renderTimes()}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		size: state.board.size, bestimes: state.bestTimes
	}
}

export default connect(mapStateToProps)(BestTimesDashboard);
