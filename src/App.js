import React, { Component } from 'react'
import './App.css';
import Board from './components/Board';
import FacebookLogin from 'react-facebook-login';

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      squares: Array(9).fill(null),
      isXNext: true,  //if its true then X, false then O
      history: [],
      current: 0,
      isLogin: false,
      userName: '',
      timeCount: 30,
      topRank:[],
    }
  }
  setTheState = (obj) => {
    console.log('123')
    this.setState(obj);
  };

  timeTravel = (id) => {

    let newArray = this.state.history.slice()
    console.log('go back', newArray);
    this.setState({
      squares: newArray[id].squares.slice(),
      isXNext: newArray[id].isXNext,
      history: newArray.slice(),
      current: id,
    })
  }
  responseFacebook = (response) => {
    console.log(response);

    this.setState({ isLogin: true, userName: response.name, })
  }
  getData = async()=>{
    let url = 'https://ftw-highscores.herokuapp.com/tictactoe-dev';
    let data = await fetch(url)
    let res = await data.json()
    console.log('what is results: ',res);
    this.setState({...this.state,topRank:res.items})
  }

  componentDidMount() {
    this.getData();
    const timer = setInterval(() => {
      this.setState({ timeCount: this.state.timeCount - 1 })
      if (this.state.timeCount === 0) {
        clearTimeout(timer)
        return
      }
    }, 1000)

  }
  

  render() {
    if (this.state.isLogin === true) {
      return (
        <div className="App">
          <h1>Tic Tac Toe !!!!!</h1>
          <div style={{ display: "flex" }}>
            <Board {...this.state} setTheState={this.setTheState} />
            <div>hístory{this.state.history.map((item, index) => { return <div><button key={item} onClick={() => { this.timeTravel(index) }}>move{index + 1}</button></div> })}</div>
            <div><h1 >Nameneeeeeeee {this.state.userName}</h1></div>
            <div><h1>Time:00:00:{this.state.timeCount}</h1></div>
            <div>Top rank{this.state.topRank.map(item=> {return <div>{item.player}:{item.score}</div>})} </div>
          </div>
        </div>
      )
    }
    else {
      return <FacebookLogin
        autoLoad={true}
        appId="701601370632048"
        fields="name,email,picture"
        callback={(resp) => this.responseFacebook(resp)}
      />
    }

  }
}
