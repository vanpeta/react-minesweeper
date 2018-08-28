import React, { Component } from 'react';
import '../style/Logo.css';

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { start, clearBoard, revealBoard, isAWinner } from "../actions/index";

class Logo extends Component {
	constructor(props) {
		super(props)
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {
		this.props.clearBoard();
    this.props.isAWinner(false, "");
    this.props.revealBoard(false);
    return this.props.start(false);
	}

	render() {
		return (
			<header className="">
				<h1 className="App-title" onClick={this.handleClick}>Minesweeper</h1>
			</header>
		);
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

export default connect(null, mapDispatchToProps)(Logo);