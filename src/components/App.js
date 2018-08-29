import React, { Component } from 'react';
import '../style/App.css';

import { connect } from "react-redux";

import Logo from "./Logo";
import Board from "./Board";
import Settings from "./Settings";
import Tutorial from "./Tutorial";
import GameOverPanel from "./GameOverPanel";
import Dashboard from "./Dashboard";

class App extends Component {
  renderDashboard() {
    if (this.props.size) {
      return (
        <div>
          <Dashboard />
          <Board />
        </div>
      )
    }
    return null
  }
  render() {
    return (
      <div className="">
        <GameOverPanel />
        <Tutorial />
        <Logo />
        <Settings />
        {this.renderDashboard()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    size: state.board.size
  }
}

export default connect(mapStateToProps)(App);
