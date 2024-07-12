import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaPlus, FaTrash } from 'react-icons/fa';

const Container = styled(motion.div)`
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 600px;
  width: 100%;
`;

const InputGroup = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const Label = styled.label`
  margin-right: 10px;
  min-width: 80px;
`;

const Input = styled.input`
  flex: 1;
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 5px;
  min-width: 150px;
`;

const ColorInput = styled.input`
  margin-left: 3px;
  width: 30px;
  height: 30px;
  border: none;
  cursor: pointer;
`;

const Button = styled(motion.button)`
  background-color: #28a745;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 20px;
  &:hover {
    background-color: #218838;
  }
`;

const IconButton = styled(motion.button)`
  background-color: #007bff;
  color: #fff;
  padding: 10px;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: #0056b3;
  }
`;

const PlayerInput = ({ language, messages, setPlayers, startGame, digitLength, setDigitLength }) => {
  const [numPlayers, setNumPlayers] = useState(1); // Default olarak 1 oyuncu
  const [players, updatePlayers] = useState([
    { name: `${messages[language].player1Name.split(' ')[0]} 1`, color: '#FFB6C1' }
  ]);
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
      updatePlayers([...players, { name: `${messages[language].player1Name.split(' ')[0]} ${newNumPlayers}`, color: '#E6E6FA' }]);
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
      event.preventDefault();
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
    <Container initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }}>
      {players.map((player, index) => (
        <InputGroup key={index}>
          <Label htmlFor={`player${index + 1}-name`}>{`${messages[language].player1Name.split(' ')[0]} ${index + 1}`}</Label>
          <Input
            type="text"
            id={`player${index + 1}-name`}
            value={player.name}
            ref={el => inputRefs.current[index] = el}
            onChange={(e) => handleNameChange(index, e.target.value)}
            onKeyPress={(e) => handleKeyPress(e, index)}
            placeholder={`${messages[language].player1Name.split(' ')[0]} ${index + 1}`}
          />
          <ColorInput
            type="color"
            value={player.color}
            onChange={(e) => handleColorChange(index, e.target.value)}
          />
          {numPlayers > 1 && (
            <IconButton onClick={() => handleRemovePlayer(index)}>
              <FaTrash />
            </IconButton>
          )}
        </InputGroup>
      ))}
      <InputGroup>
        <IconButton onClick={handleAddPlayer} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <FaPlus />
        </IconButton>
        <div>
          <Label htmlFor="digit-length">{messages[language].digitLength}</Label>
          <select id="digit-length" value={digitLength} onChange={(e) => setDigitLength(Number(e.target.value))} style={{ padding: '5px', borderRadius: '5px', border: '1px solid #ddd' }}>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
      </InputGroup>
      <Button onClick={handleStartGame} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
        {messages[language].startButton}
      </Button>
    </Container>
  );
};

export default PlayerInput;