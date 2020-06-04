import React, { Component } from 'react'
import Square from './Square'

export default class Board extends Component {
    state = {
        mess: '',

    }
    renderSquare = (num) => {
        return <Square id={num} boxClick={this.boxClick} value={this.props.squares[num]} />
    }
postData = async() => {
        let data = new URLSearchParams();
        data.append("player", this.props.userName);
        data.append("score", "TIME_ELAPSED_IN_SECONDS");
        console.log('dataaaa', data);
        
        const url = `https://ftw-highscores.herokuapp.com/tictactoe-dev`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: data.toString(),
            json: true
        });
    }

    boxClick = (id) => {
        let currentPointer = this.props.current
        currentPointer++
        console.log('id', id);
        //change value from null to 'x' at the array index number id
        let squaresFromApp = this.props.squares
        console.log('squrreurere', squaresFromApp);

        squaresFromApp[id] = this.props.isXNext ? 'x' : 'o'
        console.log('after change', squaresFromApp[id]);

        let cutHistory = this.props.history.slice(0, currentPointer)

        
        this.postData()

        this.props.setTheState({
            squares: squaresFromApp,
            isXNext: !this.props.isXNext,
            history: [...cutHistory.slice(),
            { squares: squaresFromApp.slice(), isXNext: !this.props.isXNext }], current: currentPointer
        })
        if (this.showWinner(squaresFromApp)) {
            

            this.props.setTheState({
                squares: Array(9).fill(null),
                isXNext: true,  //if its true then X, false then O
                history: [],
                current: 0,
                userName: this.props.userName,
                timeCount: 30,
            });
        }
    }

    
    
    showWinner = (squaresFromApp) => {


        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squaresFromApp[a] && squaresFromApp[a] === squaresFromApp[b] && squaresFromApp[a] === squaresFromApp[c]) {

                this.setState({ mess: `${squaresFromApp[a]}win` })
                return true;
                
            }
        }
        return null;
    }
    render() {
        let status = ''
        status = `next player:${this.props.isXNext ? 'X' : 'O'}`
        let message = `Player winner :${this.state.mess}`
        return (
            <div>
                <h2>{status}</h2>
                <h3>{message}</h3>
                <div className="row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>

                <div className="row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>

                <div className="row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        )
    }
}
