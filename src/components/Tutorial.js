import React, { Component } from 'react';
import { connect } from "react-redux";
import '../style/Tutorial.css';

class Tutorial extends Component {
	constructor(props) {
		super(props);
		this.state = { 
			show: true,
			input: false
		}
		this.show = this.show.bind(this);
		this.input = this.input.bind(this);
	}

	show() {
		console.log("click")
		this.setState({ show: false });
		if (this.state.input) {
			localStorage.setItem("hideTutorial", true);
		}
	}

	input() {
		this.setState({ input: !this.state.input });
	}

	className() {
		if (this.props.started) {
			return "tutorial tutorialStarted";
		}
		return "tutorial"
	}

	tutorialMessage() {
		if (this.props.started) {
			return <div className="tutorialMessage">To flag mines press the space bar.<span>3 of 3</span></div>;
    } else if (this.props.size && !this.props.started) {
			return <div className="tutorialMessage">Click on any tile to start.<span>2 of 3</span></div>;
		}
		return <div className="tutorialMessage">Select board size.<span>1 of 3</span></div>;
	}
	render() {
		if (localStorage.getItem("hideTutorial") || !this.state.show) {
      return null;
    }
		let checkmark = null;
		if (!this.state.input) {
			checkmark = null;
		} else {
			checkmark = <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
      </svg>;
		}
		return (
			<div className={this.className()}>
				<div className="tutorialTextContainer">{this.tutorialMessage()}</div>
				<div className="tutorialInput">
					<div className="fakeInputBorder" onClick={this.input}>
						<div className="fakeInput">
							{checkmark}
						</div>
					</div>
					<div className="tutorialLabel" onClick={this.input}>Don't show this again</div>
				</div>
				<div className="tutorialButtonContainer">
					<div className="tutorialButton" onClick={this.show}>CLOSE</div>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
  return {
    started: state.isStarted, size: state.board.size
  };
}

export default connect(mapStateToProps)(Tutorial);
