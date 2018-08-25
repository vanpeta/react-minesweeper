import React, { Component } from 'react';
import '../style/App.css';

import Board from "./Board";
import Settings from "./Settings";
import GameOverPanel from "./GameOverPanel";

class App extends Component {
  render() {
    return (
      <div className="">
        <GameOverPanel />
        <header className="">
          <h1 className="App-title">Minesweeper</h1>
        </header>
        <Settings />
        <Board />
      </div>
    );
  }
}

export default App;
