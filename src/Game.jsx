import React, { useState } from 'react';
import Player from './Player';
import './Game.css'; // Game.css dosyasını import edelim

const Game = ({ language, messages, players, secretNumbers, digitLength }) => {
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [results, setResults] = useState(Array(players.length).fill(''));
  const [attempts, setAttempts] = useState(Array(players.length).fill(20));
  const [scores, setScores] = useState(Array(players.length).fill(100));

  const makeGuess = (playerIndex, guess) => {
    const secretNumber = secretNumbers[(playerIndex + 1) % players.length];
    if (guess.length !== secretNumber.length) {
      alert(messages[language].invalidLength);
      return;
    }
    if (attempts[playerIndex] <= 0) {
      alert(messages[language].outOfAttempts);
      return;
    }

    const result = evaluateGuess(guess, secretNumber);
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
      alert(messages[language].win.replace('{player}', players[playerIndex].name).replace('{secret}', secretNumber));
      return;
    }

    setCurrentPlayer((currentPlayer + 1) % players.length);
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

  return (
    <div id="game">
      <div className="current-player">
        {messages[language].currentPlayer} {players[currentPlayer].name}
      </div>
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
        />
      ))}
    </div>
  );
};

export default Game;