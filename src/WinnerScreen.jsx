import React from 'react';
import './WinnerScreen.css';

const WinnerScreen = ({ winner, messages, language, resetGame }) => {
  return (
    <div className="winner-overlay">
      <div className="winner-screen">
        <h1>🎉 {winner.name} {messages[language].winMessage} 🎉</h1>
        <div className="secret-numbers">
          {messages[language].secretNumbersTitle}:
          <ul>
            {winner.secretNumbers.map((number, index) => (
              <li key={index}>{number}</li>
            ))}
          </ul>
        </div>
        <button className="restart-button" onClick={resetGame}>{messages[language].restartButton}</button>
      </div>
    </div>
  );
};

export default WinnerScreen;