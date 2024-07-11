import React, { useState, useEffect } from 'react';
import PlayerInput from './PlayerInput';
import Game from './Game';
import { messages } from './Messages'; // Messages.js dosyasını içe aktarın
import './App.css';
import './Game.css'; // Game.css dosyasını import edelim

const App = () => {
  const [language, setLanguage] = useState(navigator.language.startsWith('tr') ? 'tr' : 'en');
  const [numPlayers, setNumPlayers] = useState(1);
  const [players, setPlayers] = useState([{ name: `${messages[language].player1Name.split(' ')[0]} 1`, color: '#ffebcd' }]);
  const [digitLength, setDigitLength] = useState(3);
  const [secretNumbers, setSecretNumbers] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    const defaultPlayers = players.map((player, index) => ({
      ...player,
      name: `${messages[language].player1Name.split(' ')[0]} ${index + 1}`
    }));
    setPlayers(defaultPlayers);
  }, [language]);

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

  const startGame = (players) => {
    const secrets = [];
    for (let i = 0; i < players.length; i++) {
      let secret;
      do {
        secret = generateRandomNumber(digitLength);
      } while (secrets.includes(secret));
      secrets.push(secret);
    }
    setSecretNumbers(secrets);
    setPlayers(players);
    setGameStarted(true);
  };

  return (
    <div className="app">
      <div className="language-toggle">
        <img src="https://www.countryflags.com/wp-content/uploads/united-states-of-america-flag-png-large.png" onClick={() => setLanguage('en')} alt="English" />
        <img src="https://www.countryflags.com/wp-content/uploads/turkey-flag-png-large.png" onClick={() => setLanguage('tr')} alt="Türkçe" />
        <img src="https://www.countryflags.com/wp-content/uploads/germany-flag-png-large.png" onClick={() => setLanguage('de')} alt="Deutsch" />
        <img src="https://www.countryflags.com/wp-content/uploads/spain-flag-png-large.png" onClick={() => setLanguage('es')} alt="Español" />
        <img src="https://www.countryflags.com/wp-content/uploads/russia-flag-png-large.png" onClick={() => setLanguage('ru')} alt="Русский" />
        <img src="https://www.countryflags.com/wp-content/uploads/saudi-arabia-flag-png-large.png" onClick={() => setLanguage('ar')} alt="العربية" />
      </div>
      <div className="container">
        <h1>{messages[language].title}</h1>
        {!gameStarted ? (
          <PlayerInput
            language={language}
            messages={messages}
            numPlayers={numPlayers}
            setNumPlayers={setNumPlayers}
            players={players}
            setPlayers={setPlayers}
            startGame={startGame}
            digitLength={digitLength}
            setDigitLength={setDigitLength}
          />
        ) : (
          <Game
            language={language}
            messages={messages}
            players={players}
            secretNumbers={secretNumbers}
            digitLength={digitLength}
          />
        )}
      </div>
    </div>
  );
};

export default App;