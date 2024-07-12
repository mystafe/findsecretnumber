import React, { useState, useEffect, useRef } from 'react';
import Game from './Game';

const GameContainer = ({ language, messages, players, digitLength, restartGame, endGame }) => {
  const [guesses, setGuesses] = useState(players.map(() => ''));
  const [results, setResults] = useState(players.map(() => ({ correct: 0, partial: 0, incorrect: 0 })));
  const [scores, setScores] = useState(players.map(() => 100));
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const inputRefs = useRef([]);

  const handleGuessChange = (index, value) => {
    const newGuesses = [...guesses];
    newGuesses[index] = value;
    setGuesses(newGuesses);
  };

  const checkGuess = (guess, secret) => {
    let correct = 0;
    let partial = 0;
    let incorrect = 0;
    const secretArray = secret.split('');
    const guessArray = guess.split('');

    const secretCount = {};
    const guessCount = {};

    // İlk turda doğru yerinde olanları sayıyoruz
    guessArray.forEach((digit, i) => {
      if (digit === secretArray[i]) {
        correct++;
      } else {
        // Eğer doğru yerde değilse, sayıları sayıyoruz
        secretCount[secretArray[i]] = (secretCount[secretArray[i]] || 0) + 1;
        guessCount[digit] = (guessCount[digit] || 0) + 1;
      }
    });

    // İkinci turda doğru rakamları yanlış yerde olanları sayıyoruz
    Object.keys(guessCount).forEach((digit) => {
      if (secretCount[digit]) {
        partial += Math.min(secretCount[digit], guessCount[digit]);
      }
    });

    incorrect = digitLength - correct - partial;

    return { correct, partial, incorrect };
  };

  const handleGuessSubmit = (index) => {
    const secretNumber = players[index].secretNumber;
    const result = checkGuess(guesses[index], secretNumber);
    const newResults = [...results];
    newResults[index] = result;
    setResults(newResults);

    const newScores = [...scores];
    if (result.correct !== digitLength) {
      newScores[index] -= (100 / 20); // Her yanlış tahminde puan eksiltilir
    }
    setScores(newScores);

    setCurrentPlayerIndex((currentPlayerIndex + 1) % players.length); // Sıradaki oyuncuya geç
  };

  const handleKeyPress = (event, index) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleGuessSubmit(index);
    }
  };

  useEffect(() => {
    if (results.some(result => result.correct === digitLength)) {
      const winnerIndex = results.findIndex(result => result.correct === digitLength);
      const winner = players[winnerIndex];
      const winnerScore = scores[winnerIndex];
      endGame(winner, winnerScore, players, scores);
    }
  }, [results, players, digitLength, scores, endGame]);

  useEffect(() => {
    if (inputRefs.current[currentPlayerIndex]) {
      inputRefs.current[currentPlayerIndex].focus();
    }
  }, [currentPlayerIndex]);

  return (
    <Game
      language={language}
      messages={messages}
      players={players}
      digitLength={digitLength}
      guesses={guesses}
      results={results}
      currentPlayerIndex={currentPlayerIndex}
      inputRefs={inputRefs}
      handleGuessChange={handleGuessChange}
      handleGuessSubmit={handleGuessSubmit}
      handleKeyPress={handleKeyPress}
      restartGame={restartGame}
    />
  );
};

export default GameContainer;