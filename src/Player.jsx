import React, { useState, useEffect, useRef } from 'react';
import './Player.css';

const Player = ({ name, index, language, messages, result, attempts, score, isCurrent, makeGuess, color, onNextPlayer }) => {
  const [guess, setGuess] = useState('');
  const [animation, setAnimation] = useState('');
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
      setAnimation(''); // Animasyonu sıfırla
      const prevGreenCount = result.greenCount;
      const prevRedCount = result.redCount;
      makeGuess(index, guess);

      setTimeout(() => {
        if (result.greenCount > prevGreenCount) {
          setAnimation('positive-animation');
        } else if (result.redCount > prevRedCount) {
          setAnimation('negative-animation');
        }
      }, 700); // Animasyonu hissettirmek için 0.7 saniye bekletme

      setTimeout(() => {
        onNextPlayer();
      }, 1200); // Bir sonraki oyuncuya geçişi 0.5 saniye geciktir
    }
  };

  return (
    <div className={`player ${isCurrent ? 'current' : ''} ${animation}`} style={{ backgroundColor: color }}>
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
      <div className={`result`}>
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