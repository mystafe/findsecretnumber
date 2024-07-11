import React, { useEffect, useRef, useState } from 'react';
import chairIcon from './chair-icon.png'; // Koltuk ikonunun yolu
import trashIcon from './trash-icon.png'; // Çöp ikonunun yolu
import './PlayerInput.css'; // CSS dosyasını import edelim

const lightColors = [
  '#FFB6C1', '#FFDAB9', '#E6E6FA', '#FFFACD', '#E0FFFF', '#F0FFF0', '#F5FFFA', '#F8F8FF', '#FFF0F5', '#FFFFE0'
];

const PlayerInput = ({ language, messages, setPlayers, startGame, digitLength, setDigitLength }) => {
  const [numPlayers, setNumPlayers] = useState(1); // Default olarak 1 oyuncu
  const [players, updatePlayers] = useState([{ name: `${messages[language].player1Name.split(' ')[0]} 1`, color: lightColors[0] || `#${Math.floor(Math.random() * 16777215).toString(16)}` }]);
  const inputRefs = useRef([]);

  useEffect(() => {
    inputRefs.current.forEach((inputRef, index) => {
      if (index === numPlayers - 1 && inputRef) {
        inputRef.focus();
      }
    });
  }, [numPlayers]);

  const handleNameChange = (index, value) => {
    const newPlayers = [...players];
    newPlayers[index].name = value;
    updatePlayers(newPlayers);
  };

  const handleColorChange = (index, color) => {
    const newPlayers = [...players];
    newPlayers[index].color = color;
    updatePlayers(newPlayers);
  };

  const handleAddPlayer = () => {
    if (numPlayers < 4) {
      const newNumPlayers = numPlayers + 1;
      setNumPlayers(newNumPlayers);
      updatePlayers([...players, { name: `${messages[language].player1Name.split(' ')[0]} ${newNumPlayers}`, color: lightColors[newNumPlayers - 1] || `#${Math.floor(Math.random() * 16777215).toString(16)}` }]);
      setTimeout(() => {
        if (inputRefs.current[newNumPlayers - 1]) {
          inputRefs.current[newNumPlayers - 1].focus();
        }
      }, 100);
    }
  };

  const handleRemovePlayer = (index) => {
    if (numPlayers > 1) {
      const newPlayers = players.filter((_, i) => i !== index);
      setNumPlayers(numPlayers - 1);
      updatePlayers(newPlayers);
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
          <div className="player-name-color">
            <label htmlFor={`player${index + 1}-name`}>{`${messages[language].player1Name.split(' ')[0]} ${index + 1}`}</label>
            <input
              type="text"
              id={`player${index + 1}-name`}
              value={player.name}
              ref={el => inputRefs.current[index] = el}
              onChange={(e) => handleNameChange(index, e.target.value)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              placeholder={`${messages[language].player1Name.split(' ')[0]} ${index + 1}`}
              style={{ flex: '1' }} // Esneklik için stil eklendi
            />
            <input
              type="color"
              value={player.color}
              onChange={(e) => handleColorChange(index, e.target.value)}
              className="color-picker"
            />
            {numPlayers > 1 && (
              <button className="remove-player-button" onClick={() => handleRemovePlayer(index)}>
                <img src={trashIcon} alt="Remove Player" className="trash-icon" />
              </button>
            )}
          </div>
        </div>
      ))}
      <div className="additional-settings">
        {numPlayers < 4 && (
          <button className="add-player-button" onClick={handleAddPlayer}>
            <img src={chairIcon} alt="Add Player" className="chair-icon" />
            Yeni Oyuncu Ekle
          </button>
        )}
        <div className="digit-length-container">
          <label htmlFor="digit-length" className="digit-length-label">{messages[language].digitLength}</label>
          <select id="digit-length" value={digitLength} onChange={(e) => setDigitLength(Number(e.target.value))} className="digit-length-select">
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
      </div>
      <button className="start-game-button" onClick={handleStartGame}>{messages[language].startButton}</button>
    </div>
  );
};

export default PlayerInput;