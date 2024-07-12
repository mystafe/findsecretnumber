import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import trashIcon from './trash-icon.png';
import styled from 'styled-components';



const NameInputsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
`;

const PlayerInputContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  width: 48%;
  min-width: 250px;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const PlayerNameColor = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  font-size: 1.2em;
`;

const Label = styled.label`
  margin-right: 10px;
  min-width: 80px;
`;

const NameInput = styled.input`
  margin-right: 10px;
  flex: 1;
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 5px;
  min-width: 150px;
`;

const ColorInput = styled.input`
  margin-left: 3px;
  width: 60px;
  height: 30px;
  border: none;
  cursor: pointer;
`;

const RemovePlayerButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  margin-left: 2px;
  padding: 0;
`;

const TrashIcon = styled.img`
  width: 16px;
  height: 16px;
`;

const PlayerList = ({ players, setPlayers, numPlayers, setNumPlayers, language, messages }) => {
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
    setPlayers(newPlayers);
  };

  const handleColorChange = (index, color) => {
    const newPlayers = [...players];
    newPlayers[index].color = color;
    setPlayers(newPlayers);
  };

  const handleRemovePlayer = (index) => {
    const newPlayers = [...players];
    newPlayers.splice(index, 1);
    setPlayers(newPlayers);
    setNumPlayers(newPlayers.length);
  };

  const handleKeyPress = (event, index) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  return (
    <NameInputsContainer>
      {players.map((player, index) => (
        <PlayerInputContainer key={index}>
          <PlayerNameColor>
            <Label htmlFor={`player${index + 1}-name`}>
              {`${messages[language].player1Name.split(' ')[0]} ${index + 1}`}
            </Label>
            <NameInput
              type="text"
              id={`player${index + 1}-name`}
              value={player.name}
              ref={(el) => (inputRefs.current[index] = el)}
              onChange={(e) => handleNameChange(index, e.target.value)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              placeholder={`${messages[language].player1Name.split(' ')[0]} ${index + 1}`}
            />
            <ColorInput
              type="color"
              value={player.color}
              onChange={(e) => handleColorChange(index, e.target.value)}
              className="color-picker"
            />
            <RemovePlayerButton onClick={() => handleRemovePlayer(index)}>
              <TrashIcon src={trashIcon} alt="Remove Player" />
            </RemovePlayerButton>
          </PlayerNameColor>
        </PlayerInputContainer>
      ))}
    </NameInputsContainer>
  );
};

PlayerList.propTypes = {
  players: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired
  })).isRequired,
  setPlayers: PropTypes.func.isRequired,
  numPlayers: PropTypes.number.isRequired,
  setNumPlayers: PropTypes.func.isRequired,
  language: PropTypes.string.isRequired,
  messages: PropTypes.object.isRequired,
};

export default PlayerList;