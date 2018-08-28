import React, { Component } from 'react';
import "../style/Settings.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { boardSizeSelected } from "../actions/index";

import BestTimes from "./BestTimes";

class Settings extends Component {
	constructor(props) {
		super(props)
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(e) {
		this.props.boardSizeSelected(e.target.id);
	}

	renderButtons() {
		const buttons = (
			<div className="settingBox">
				<div className="buttonsContainer">
					<div id="small" className="settingsOption" onClick={this.handleClick}>
						<div id="small"className="settingsOptionHeader">
							Small
						</div>
						<div id="small" className="optionImage">
							<img id="small"alt="small" src={require('../content/small.png')} />
						</div>
						<div id="small"className="settingsOptionFooter">
							100 tiles with 15 mines.
						</div>
					</div>
					<div id="medium" className="settingsOption" onClick={this.handleClick}>
						<div id="medium" className="settingsOptionHeader">
							Medium
						</div>
						<div id="medium" className="optionImage">
							<img id="medium" alt="medium" src={require('../content/medium.png')} />
						</div>
						<div id="medium" className="settingsOptionFooter">
							400 tiles and 60 mines.
						</div>
					</div>
					<div id="large" className="settingsOption" onClick={this.handleClick}>
						<div id="large" className="settingsOptionHeader">
							Large
						</div>
						<div id="large" className="optionImage">
							<img id="large" alt="large" src={require('../content/large.png')} />
						</div>
						<div id="large" className="settingsOptionFooter">
							900 tiles and 135 mines.
						</div>
					</div>
				</div>
				<BestTimes />
			</div>
		)
		return !this.props.board.size ? buttons : null;
	}

	render() {
		return <div>{this.renderButtons()}</div>;
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