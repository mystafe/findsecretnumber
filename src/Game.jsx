import React, { useState } from 'react';
import Player from './Player';
import WinnerScreen from './WinnerScreen';
import './Game.css';

const Game = ({ language, messages, players, secretNumbers, digitLength, resetGame }) => {
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [results, setResults] = useState(players.map(() => ({ greenCount: 0, yellowCount: 0, redCount: 0 })));
  const [attempts, setAttempts] = useState(players.map(() => 20));
  const [scores, setScores] = useState(players.map(() => 100));
  const [winner, setWinner] = useState(null);

  const makeGuess = (playerIndex, guess) => {
    const secretNumber = secretNumbers[playerIndex];
    const result = evaluateGuess(guess, secretNumber);

    console.log(`Secret number for player ${playerIndex + 1}: ${secretNumber}`); // Gizli sayıları konsola yazdır

    const newResults = [...results];
    newResults[playerIndex] = result;
    setResults(newResults);

    const newAttempts = [...attempts];
    newAttempts[playerIndex] -= 1;
    setAttempts(newAttempts);

    const newScores = [...scores];
    newScores[playerIndex] -= 5;
    setScores(newScores);

    if (result.greenCount === digitLength) {
      setTimeout(() => {
        setWinner({ name: players[playerIndex].name, secretNumbers });
      }, 2000); // 2 saniye sonra kazanan ekranını göster
    }
  };

  const evaluateGuess = (guess, secretNumber) => {
    let greenCount = 0;
    let yellowCount = 0;
    let redCount = 0;
    let guessCount = {};

    for (let char of secretNumber) {
      guessCount[char] = (guessCount[char] || 0) + 1;
    }

    for (let i = 0; i < guess.length; i++) {
      if (guess[i] === secretNumber[i]) {
        greenCount++;
        guessCount[guess[i]]--;
      } else if (secretNumber.includes(guess[i]) && guessCount[guess[i]] > 0) {
        yellowCount++;
        guessCount[guess[i]]--;
      } else {
        redCount++;
      }
    }

    return { greenCount, yellowCount, redCount };
  };

  const onNextPlayer = () => {
    setCurrentPlayer((currentPlayer + 1) % players.length);
  };

  return (
    <div id="game">
      {winner ? (
        <WinnerScreen winner={winner} messages={messages} language={language} resetGame={resetGame} />
      ) : (
        <>
          <div className="current-player">
            {messages[language].currentPlayer} {players[currentPlayer].name}
          </div>
          <div className="player-container">
            {players.map((player, index) => (
              <Player
                key={index}
                name={player.name}
                index={index}
                language={language}
                messages={messages}
                result={results[index]}
                attempts={attempts[index]}
                score={scores[index]}
                isCurrent={index === currentPlayer}
                makeGuess={makeGuess}
                color={player.color}
                onNextPlayer={onNextPlayer}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Game;