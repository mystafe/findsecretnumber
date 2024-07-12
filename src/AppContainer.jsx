import React, { useState } from 'react';
import App from './App';
import { messages } from './Messages';

const AppContainer = () => {
  const [language, setLanguage] = useState(navigator.language.startsWith('tr') ? 'tr' : 'en');
  const [gameStarted, setGameStarted] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const generateRandomNumber = (length) => {
    let number = '';
    while (number.length < length) {
      const digit = Math.floor(Math.random() * 10);
      if (!number.includes(digit)) {
        number += digit;
      }
    }
    return number;
  };

  const [players, setPlayers] = useState([
    { name: `${messages[language].player1Name.split(' ')[0]} 1`, color: '#FFB6C1', secretNumber: generateRandomNumber(3) }
  ]);
  const [scores, setScores] = useState([100]);
  const [winner, setWinner] = useState(null);
  const [winnerScore, setWinnerScore] = useState(0);
  const [digitLength, setDigitLength] = useState(3);
  const [numPlayers, setNumPlayers] = useState(1); // numPlayers state eklendi


  const startGame = (players) => {
    const playersWithSecretNumbers = players.map(player => ({
      ...player,
      secretNumber: generateRandomNumber(digitLength)
    }));
    setPlayers(playersWithSecretNumbers);
    setScores(players.map(() => 100));
    setGameStarted(true);
    setGameEnded(false);
  };

  const endGame = (winner, winnerScore, players, scores) => {
    setWinner(winner);
    setWinnerScore(winnerScore);
    setPlayers(players);
    setScores(scores);
    setGameEnded(true);
  };

  const restartGame = () => {
    setGameStarted(false);
    setGameEnded(false);
    setPlayers([
      { name: `${messages[language].player1Name.split(' ')[0]} 1`, color: '#FFB6C1', secretNumber: generateRandomNumber(digitLength) }
    ]);
    setScores([100]);
    setWinner(null);
    setWinnerScore(0);
    setDigitLength(3);
    setNumPlayers(1); // numPlayers sıfırlama
  };

  return (
    <App
      language={language}
      setLanguage={setLanguage}
      gameStarted={gameStarted}
      gameEnded={gameEnded}
      players={players}
      scores={scores}
      winner={winner}
      winnerScore={winnerScore}
      digitLength={digitLength}
      setDigitLength={setDigitLength}
      startGame={startGame}
      endGame={endGame}
      restartGame={restartGame}
      messages={messages}
      numPlayers={numPlayers} // numPlayers prop eklendi
      setNumPlayers={setNumPlayers} // setNumPlayers prop eklendi
      setPlayers={setPlayers} // setPlayers prop eklendi
    />
  );
};

export default AppContainer;