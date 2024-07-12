import React from 'react';
import PropTypes from 'prop-types';
import chairIcon from './chair-icon.png';
import styled from 'styled-components';

const AdditionalSettings = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 20px;
`;

const AddPlayerButton = styled.button`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 5px 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  transition: background 0.3s;
  margin-bottom: 10px;
`;

const ChairIcon = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 5px;
`;

const DigitLengthContainer = styled.div`
  display: flex;
  align-items: center;
`;

const DigitLengthLabel = styled.label`
  margin-right: 10px;
`;

const DigitLengthSelect = styled.select`
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #ddd;
`;

const StartGameButton = styled.button`
  background-color: #28a745;
  color: #fff;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 10px;
`;
const lightColors = [
  '#FFB6C1', '#FFDAB9', '#E6E6FA', '#FFFACD', '#E0FFFF', '#F0FFF0', '#F5FFFA', '#F8F8FF', '#FFF0F5', '#FFFFE0'
];

const PlayerSettings = ({ numPlayers, setNumPlayers, players, setPlayers, digitLength, setDigitLength, startGame, language, messages }) => {

  const handleAddPlayer = () => {
    if (numPlayers < 4) {
      const newNumPlayers = numPlayers + 1;
      setNumPlayers(newNumPlayers);
      setPlayers([
        ...players,
        {
          name: `${messages[language].player1Name.split(' ')[0]} ${newNumPlayers}`,
          color: lightColors[newNumPlayers - 1] || `#${Math.floor(Math.random() * 16777215).toString(16)}`,
        },
      ]);
    }
  };

  const handleStartGame = () => {
    if (players.some((player) => player.name === '')) {
      alert(messages[language].invalidLength);
      return;
    }
    startGame(players);
  };

  return (
    <AdditionalSettings>
      {numPlayers < 4 && (
        <AddPlayerButton className="add-player-button" onClick={handleAddPlayer}>
          <ChairIcon src={chairIcon} alt="Add Player" />
          {messages[language].addPlayer}
        </AddPlayerButton>
      )}
      <DigitLengthContainer>
        <DigitLengthLabel htmlFor="digit-length" className="digit-length-label">
          {messages[language].digitLength}
        </DigitLengthLabel>
        <DigitLengthSelect
          id="digit-length"
          value={digitLength}
          onChange={(e) => setDigitLength(Number(e.target.value))}
          className="digit-length-select"
        >
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </DigitLengthSelect>
      </DigitLengthContainer>
      <StartGameButton onClick={handleStartGame}>{messages[language].startButton}</StartGameButton>
    </AdditionalSettings>
  );
};

PlayerSettings.propTypes = {
  numPlayers: PropTypes.number.isRequired,
  setNumPlayers: PropTypes.func.isRequired,
  players: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired
  })).isRequired,
  setPlayers: PropTypes.func.isRequired,
  digitLength: PropTypes.number.isRequired,
  setDigitLength: PropTypes.func.isRequired,
  startGame: PropTypes.func.isRequired,
  language: PropTypes.string.isRequired,
  messages: PropTypes.object.isRequired,
};

export default PlayerSettings;