import React, { Component } from 'react'
import logo from './logo.svg';
import './App.css';
import Board from './components/Board';
import History from './components/History'

export default class App extends Component {
  constructor(props){
    super(props)
    this.state={
      squares:Array(9).fill(null),
      isXNext:true,  //if its true then X, false then O
    }
  }
  setTheState = (obj) => {
    console.log('123')
    this.setState(obj);
  };


  
  render() {
    return (
      <div className="App">
        <h1>Tic Tac Toe !!!!!</h1>
      <Board {...this.state} setTheState={this.setTheState}/>
      <History/>
    </div>
    )
  }
}
