import './styles.scss';
import { useState } from 'react';
import Board from './components/board';
import { calculateWinner } from './winner';
import StatusMessage from './components/statusmessage';
import History from './components/History';
const NEWGAME = [{ squares: Array(9).fill(null), isXNext: false }];
function App() {
  const[history, setHistory]= useState(NEWGAME);
  const[currentMove,setCurrentMove]=useState(0);
  const gamingBoard=history[currentMove];
/*
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(false);
*/  
  const winner = calculateWinner(gamingBoard.squares);
  
  
  //Exit function below
  const handleSquareClick = clickedPosition => {
    if (gamingBoard.squares[clickedPosition] || winner) {
      return;
    }

    setHistory(currentHistory => {
      const isTraversing= currentMove+1!== currentHistory.length;

      const lastGamingState= isTraversing ? 
      currentHistory[currentMove]:
      currentHistory[currentHistory.length-1];
      const nextSquaresState=lastGamingState.squares.map(
        (squareValue,position)=>{
          if(clickedPosition==position){
          return lastGamingState.isXNext ?'X' :'O';
        }
        return  squareValue;
    }); 
      /*return currentSquares.map((squareValue, position) => {
        if (clickedPosition === position) {
          return isXNext ? 'X' : 'O';
        }
        return squareValue;
      });*/
      const base = isTraversing ? 
      currentHistory.slice(0,currentHistory.indexOf(lastGamingState+1)):
      currentHistory
      return base.concat({squares:nextSquaresState,isXNext:!lastGamingState.isXNext})
    });
    setCurrentMove(move=>move+1);
  };
  const moveTo=move=>{
    setCurrentMove(move);
  }
  const onNewGameStart = () =>{
    setHistory(NEWGAME);
    setCurrentMove(0);
  }

  return (
    <div className="app">
      <h1>TIC TAC TOE</h1>
      <StatusMessage winner={winner} gamingBoard={gamingBoard}/>
      <Board squares={gamingBoard.squares} handleSquareClick={handleSquareClick} />
      <button type="button" onClick={onNewGameStart} className={`btn-reset ${winner? 'active': ''}`} >Set New Game</button>
      <h2>Current Game History</h2>
      <History history={history} moveTo={moveTo} currentMove={currentMove}/>
    </div>
  );
}

export default App;
