import React from 'react';
import Board from './Board.js';
import './index.css';


class Game extends React.Component {

    constructor(props) {

        super(props);
        this.state = { 
            history: [{
                squares: Array(9).fill(null),
            }],
            turnNumber: 0,
            isXTurn: true
        };

    }

    handleClick(i) {

        const history = this.state.history.slice(0, this.state.turnNumber + 1);
        const currentState = history[history.length - 1];
        const squares = currentState.squares.slice();

        if (squares[i] || checkForWinner(squares)) {
            return;
        }

        if (this.state.isXTurn) {
            squares[i] = 'X';
        }
        else {
            squares[i] = 'O';
        }

        this.setState({isXTurn: !this.state.isXTurn});
        this.setState({history: history.concat([{
            squares: squares}])
        });
        this.setState({
            turnNumber: history.length
        });

    }

    render() {
        
        const history = this.state.history.slice();
        const currentState = history[this.state.turnNumber];
        const winner = checkForWinner(currentState.squares);

        const gameTurns = history.map((move, index) => {

            let turnText;

            if (index) {
                turnText = "Go to turn: #" + index;
            }
            else {
                turnText = "Go to game start";
            }

            return (
                <li key={index}>
                    <button onClick={() => this.jumpTo(index)}>{turnText}</button>
                </li>
            );

        });

        let status;
        if (winner !== null) {

            status = "Winner is: " + winner;

        }
        else {

            status = "Actual player: " + (this.state.isXTurn ? 'X' : 'O');

        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board 
                        squares={currentState.squares} 
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{gameTurns}</ol>
                </div>
            </div>
        );
        
    }

    jumpTo(turnIndex) {
        this.setState({
            turnNumber: turnIndex,
            isXTurn: (turnIndex % 2) === 0
        });
    }

}

function checkForWinner(squares) {
    
    const linesToCheck = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let i = 0; i < linesToCheck.length; i++) {
        const [a, b, c] = linesToCheck[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }

    return null;

}

export default Game;