/* eslint-disable react/prop-types */
import React from "react";
const StatusMessage = ({ winner, isXNext, squares }) => {
  const noMovesLeft = squares.every(squareValue => squareValue !== null);
  const nextPlayer = isXNext ? 'X' : 'O';

  const renderStatusMessage = () => {
    if (winner) {
      return (
        
          <>
          Winner is{' '}
          <span className={winner === 'X' ? 'text-green' : 'text-orange'}>
            {winner}
          </span>
        </>
      );
    }
    if (!winner && noMovesLeft) {
      return <>The game is tied</>;
    }
    if (!winner && !noMovesLeft) {
      return (
        <>
          Next Player is <span className={isXNext ? 'text-green' : 'text-orange'}>{nextPlayer} </span>
        </>
      );
    }
    return null;
  };
  return (
    <div className="status-message">{renderStatusMessage()}</div>
  );
};
export default StatusMessage;
