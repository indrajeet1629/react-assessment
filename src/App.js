import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Continents from "./component/Continents";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Continents />
      </div>
    );
  }
}

export default App;
