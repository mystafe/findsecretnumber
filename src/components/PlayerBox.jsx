import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const PlayerBoxContainer = styled.div`
  background: ${(props) => props.color || '#f1f1f1'};
  padding: 10px;
  border-radius: 10px;
  width: 100%;
  margin: 10px 0;
  text-align: center;
  color: #fff;
  
  @media (max-width: 768px) {
    padding: 5px;
  }
`;

const Input = styled.input`
  flex: 1;
  padding: 5px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 5px;
  min-width: 150px;

  @media (max-width: 768px) {
    padding: 3px;
    margin: 5px 0;
  }
`;

const Button = styled(motion.button)`
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  padding-left: 30px; /* Sola padding eklendi */
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 10px; /* Tahmin inputu ile buton arasında boşluk */

  @media (max-width: 768px) {
    padding: 5px 10px;
    margin-top: 5px;
  }

  &:hover {
    background-color: #0056b3;
  }
`;

const PlayerBox = ({ player, guess, result, onGuessChange, onGuessSubmit, onKeyPress, currentPlayerIndex, index, messages, language }) => {
  return (
    <PlayerBoxContainer color={player.color}>
      <h3>{player.name}</h3>
      <p>{messages[language].attempts}: {player.attempts}</p>
      <Input
        type="text"
        value={guess}
        onChange={(e) => onGuessChange(index, e.target.value)}
        onKeyPress={(e) => onKeyPress(e, index)}
        placeholder={messages[language].guessPlaceholder}
        disabled={index !== currentPlayerIndex} // Sadece sıradaki oyuncu tahmin yapabilir
      />
      <Button
        onClick={() => onGuessSubmit(index)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        disabled={index !== currentPlayerIndex} // Sadece sıradaki oyuncu tahmin yapabilir
      >
        {messages[language].guessButton}
      </Button>
      <div>
        <p>{messages[language].green}: {result.correct}</p>
        <p>{messages[language].yellow}: {result.partial}</p>
        <p>{messages[language].red}: {result.incorrect}</p>
      </div>
    </PlayerBoxContainer>
  );
};

export default PlayerBox;