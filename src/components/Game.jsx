import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import PlayerArea from './PlayerArea';
import PlayerBox from './PlayerBox';

const Container = styled(motion.div)`
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 800px;
  width: 100%;
  margin-top: 20px; /* Tepe ile oyun alanı arasında boşluk */

  @media (max-width: 768px) {
    padding: 10px;
    margin-top: 10px;
  }
`;

const RestartButton = styled(motion.button)`
  background-color: #28a745;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
  margin-top: 20px;
  font-size: 16px;
  &:hover {
    background-color: #218838;
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    padding: 5px 10px;
    font-size: 14px;
  }
`;

const Game = ({ language, messages, players, digitLength, guesses, results, currentPlayerIndex, inputRefs, handleGuessChange, handleGuessSubmit, handleKeyPress, restartGame }) => {
  return (
    <Container initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }}>
      {players.map((player, index) => (
        <PlayerArea key={index}>
          <PlayerBox
            player={player}
            guess={guesses[index]}
            result={results[index]}
            onGuessChange={handleGuessChange}
            onGuessSubmit={handleGuessSubmit}
            onKeyPress={handleKeyPress}
            currentPlayerIndex={currentPlayerIndex}
            index={index}
            messages={messages}
            language={language}
          />
        </PlayerArea>
      ))}
      <RestartButton onClick={restartGame} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
        {messages[language].restartButton}
      </RestartButton>
    </Container>
  );
};

export default Game;