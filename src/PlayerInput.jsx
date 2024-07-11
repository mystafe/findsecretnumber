import React, { useEffect, useRef } from 'react';
import chairIcon from './chair-icon.png'; // Koltuk ikonunun yolu
import './PlayerInput.css'; // CSS dosyasını import edelim

const PlayerInput = ({ language, messages, numPlayers, setNumPlayers, players, setPlayers, startGame, digitLength, setDigitLength }) => {
  const inputRefs = useRef([]);

  useEffect(() => {
    // İlk oyuncu inputuna otomatik olarak odaklan
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [inputRefs.current.length]); // inputRefs.current.length değiştiğinde tekrar çalışsın

  const handleNameChange = (index, value) => {
    const newPlayers = [...players];
    newPlayers[index].name = value;
    setPlayers(newPlayers);
  };

  const handleColorChange = (index, color) => {
    const newPlayers = [...players];
    newPlayers[index].color = color;
    setPlayers(newPlayers);
  };

  const handleAddPlayer = () => {
    if (numPlayers < 4) {
      const newNumPlayers = numPlayers + 1;
      setNumPlayers(newNumPlayers);
      setPlayers([...players, { name: `${messages[language].player1Name.split(' ')[0]} ${newNumPlayers}`, color: `#${Math.floor(Math.random() * 16777215).toString(16)}` }]);
    }
  };

  const handleKeyPress = (event, index) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Formun submit edilmesini engelle
      if (index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleStartGame = () => {
    if (players.some(player => player.name === '')) {
      alert(messages[language].invalidLength);
      return;
    }
    startGame(players);
  };

  return (
    <div id="name-inputs">
      {players.map((player, index) => (
        <div key={index} className="player-input">
          <label htmlFor={`player${index + 1}-name`}>{`${messages[language].player1Name.split(' ')[0]} ${index + 1}:`}</label>
          <input
            type="text"
            id={`player${index + 1}-name`}
            value={player.name}
            ref={el => inputRefs.current[index] = el}
            onChange={(e) => handleNameChange(index, e.target.value)}
            onKeyPress={(e) => handleKeyPress(e, index)}
            placeholder={`${messages[language].player1Name.split(' ')[0]} ${index + 1}`}
          />
          <input
            type="color"
            value={player.color}
            onChange={(e) => handleColorChange(index, e.target.value)}
            className="color-picker"
          />
        </div>
      ))}
      {numPlayers < 4 && (
        <button className="add-player-button" onClick={handleAddPlayer}>
          <img src={chairIcon} alt="Add Player" className="chair-icon" />
          Yeni Oyuncu Ekle
        </button>
      )}
      <label htmlFor="digit-length" className="digit-length-label">{messages[language].digitLength}</label>
      <select id="digit-length" value={digitLength} onChange={(e) => setDigitLength(Number(e.target.value))} className="digit-length-select">
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
      <button className="start-game-button" onClick={handleStartGame}>{messages[language].startButton}</button>
    </div>
  );
};

export default PlayerInput;