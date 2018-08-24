import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { boardSizeSelected } from "../actions/index";

import Dashboard from "./Dashboard";
import BestTimes from "./BestTimes";

class Settings extends Component {
	constructor(props) {
		super(props)
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(e) {
		this.props.boardSizeSelected(e.target.value);
	}

	renderButtons() {
		const buttons = (
			<div>
				<div className="buttonsContainer">
					<button value="small" className="settingsButton" onClick={this.handleClick}>small</button>
					<button value="medium" className="settingsButton" onClick={this.handleClick}>medium</button>
					<button value="large" className="settingsButton" onClick={this.handleClick}>large</button>
				</div>
				<BestTimes />
			</div>
		)
		return !this.props.started && !this.props.size ? buttons : <Dashboard />;
	}

	render() {
		return <div className="settingBox">{this.renderButtons()}</div>;
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(
		{
			boardSizeSelected
		},
		dispatch
	);
}

function mapStateToProps(state) {
	return {
		started: state.isStarted, board: state.board
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);