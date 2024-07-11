import React, { useState, useEffect, useRef } from 'react';
import './Player.css';

const Player = ({ name, index, language, messages, result, attempts, score, isCurrent, makeGuess, color }) => {
  const [guess, setGuess] = useState('');
  const [checking, setChecking] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isCurrent) {
      inputRef.current.focus();
    }
  }, [isCurrent]);

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleGuess();
    }
  };

  const handleGuess = () => {
    if (guess.length > 0) {
      setChecking(true);
      setTimeout(() => {
        makeGuess(index, guess);
        setGuess('');
        setChecking(false);
      }, 700); // Spinner göstermek için 1 saniye bekletme
    }
  };

  return (
    <div className={`player ${isCurrent ? 'current' : ''}`} style={{ backgroundColor: color }}>
      <h2>{name}</h2>
      <input
        type="text"
        id={`guess${index + 1}`}
        placeholder={messages[language].guessPlaceholder}
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        onKeyPress={handleKeyPress}
        ref={inputRef}
        disabled={attempts <= 0}
      />
      <button onClick={handleGuess} disabled={attempts <= 0}>
        {messages[language].guessButton}
      </button>
      {checking && <div className="spinner"></div>}
      <div className={`result ${result.greenCount > 0 ? 'positive-animation' : ''} ${result.redCount > 0 ? 'negative-animation' : ''}`}>
        {result && (
          <>
            <div className="result-item correct">
              {messages[language].green}: {result.greenCount}
            </div>
            <div className="result-item partial">
              {messages[language].yellow}: {result.yellowCount}
            </div>
            <div className="result-item incorrect">
              {messages[language].red}: {result.redCount}
            </div>
          </>
        )}
      </div>
      <div className="score">{messages[language].score} <span className="score-value">{score}</span></div>
      <div className="attempts">{messages[language].attempts} <span className="attempts-value">{attempts}</span></div>
    </div>
  );
};

export default Player;