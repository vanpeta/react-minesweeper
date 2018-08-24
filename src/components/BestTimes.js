import React, { Component } from "react";
import { connect } from "react-redux";

import Time from "./Time";

class BestTimes extends Component {

  renderBestTimes(size) {
		const arr = this.props.bestTimes[size];
		if (arr.length === 0) {
			return (
				<tr>
					<td className="bestTimeBox">
						<div className="noTime">
							No times yet
						</div>
					</td>
				</tr>
			)
		}
		arr.sort((a , b) => a - b);
		return arr.map((t, index) => {
			return (
				<tr key={index}>
          <td className="bestTimeBox">
						<div className="bestTimeitem">
              <span className="bestTimePosition">{index + 1}</span>
              <Time t={t}/>
            </div>
          </td>
				</tr>
			);
    });
  }
  render() {
		if(this.props.boardSize) {
			return ""
		}
    return (
			<div className="bestTimesComponent">
        <div className="bestTimesTitle">Your Best Times</div>
					<div className="tableContainer">
						<table className="bestTimesTable">
							<thead>
								<tr>
									<th>small</th>
								</tr>
							</thead>
							<tbody>
								{this.renderBestTimes("small")}
							</tbody>
						</table>
					</div>
					<div className="tableContainer">
						<table className="bestTimesTable">
							<thead>
								<tr>
									<th>medium</th>
								</tr>
							</thead>
							<tbody>
								{this.renderBestTimes("medium")}
							</tbody>
						</table>
					</div>
					<div className="tableContainer">
						<table className="bestTimesTable">
							<thead>
								<tr>
									<th>large</th>
								</tr>
							</thead>
							<tbody>
								{this.renderBestTimes("large")}
							</tbody>
						</table>
					</div>
				</div>
		);
  }
}

function mapStateToProps(state) {
	return {
		bestTimes: state.bestTimes, boardSize: state.board.size
	}
}

export default connect(mapStateToProps)(BestTimes);