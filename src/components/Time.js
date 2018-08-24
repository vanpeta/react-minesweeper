import React, { Component } from 'react';

class Time extends Component {

	renderTime() {
		let seconds = 0;
		let tens = this.props.t;
		let minutes = "";
		if (tens > 9) {
			seconds = Math.floor(tens / 10);
			tens = tens % 10;
		}
		if (seconds > 59) {
			minutes = Math.floor(seconds / 60) + ":";
			seconds = seconds % 60;
			if (seconds < 10) {
				seconds = "0" + seconds
			}
		}
		return (minutes + seconds + "." + tens);
	}

	render() {
		return <span>{this.renderTime()}</span>;
	}
}

export default Time;