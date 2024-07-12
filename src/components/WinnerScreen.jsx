import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaTrophy } from 'react-icons/fa';

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const WinnerContainer = styled(motion.div)`
  background: #fff;
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  text-align: center;
  width: 60%;
`;

const TrophyIcon = styled(FaTrophy)`
  color: #ffc107;
  font-size: 50px;
  margin-bottom: 20px;
`;

const WinnerTitle = styled.h2`
  margin-bottom: 20px;
  font-size: 2em;
`;

const SecretNumbersTitle = styled.p`
  font-size: 1.2em;
  font-weight: bold;
`;

const SecretNumbersList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const SecretNumberItem = styled.li`
  background-color: #f1f1f1;
  margin: 5px 0;
  padding: 10px;
  border-radius: 10px;
  font-size: 1.2em;
`;

const RestartButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 1.2em;
  background-color: #28a745;
  color: #fff;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: #218838;
  }
`;

const WinnerScreen = ({ language, messages, winner, winnerScore, players, scores, restartGame }) => {
  return (
    <Overlay initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
      <WinnerContainer initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }}>
        <TrophyIcon />
        <WinnerTitle>{`${winner.name} ${messages[language].winMessage} (${messages[language].score}: ${winnerScore})`}</WinnerTitle>
        <SecretNumbersTitle>{messages[language].secretNumbersTitle}</SecretNumbersTitle>
        <SecretNumbersList>
          {players.map((player, index) => (
            <SecretNumberItem key={index}>{player.name}: {player.secretNumber}, {messages[language].score}: {scores[index]}</SecretNumberItem>
          ))}
        </SecretNumbersList>
        <RestartButton onClick={restartGame}>{messages[language].restartButton}</RestartButton>
      </WinnerContainer>
    </Overlay>
  );
};

export default WinnerScreen;