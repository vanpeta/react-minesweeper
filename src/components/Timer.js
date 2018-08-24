import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Time from "./Time";

import { shareTime } from "../actions/index";

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = { time: 0 };
    this.tick = this.tick.bind(this);
  }

  componentDidMount() {
    if (this.props.started) {
      this.startTimer();
    }
  }

  startTimer() {
    this.intervalHandle = setInterval(this.tick, 100);
  }

  tick() {
		this.setState({ time: this.state.time + 1 });
		if (this.props.revealed) {
			this.props.shareTime(this.state.time);
      clearInterval(this.intervalHandle);
    }
  }

  componentWillUnmount() {
		clearInterval(this.intervalHandle);
	}

  render() {
		return (
			<span>
        time: <Time t={this.state.time} />
			</span>
		);
  }
}

function mapStateToProps(state) {
	return {
		started: state.isStarted, revealed: state.boardRevealed
	}
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
		{ shareTime },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Timer);