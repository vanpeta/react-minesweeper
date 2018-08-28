import React, { Component } from 'react';
import '../style/App.css';

import Logo from "./Logo";
import Board from "./Board";
import Settings from "./Settings";
import GameOverPanel from "./GameOverPanel";

class App extends Component {
  render() {
    return (
      <div className="">
        <GameOverPanel />
        <Logo />
        <Settings />
        <Board />
      </div>
    );
  }
}

export default App;
