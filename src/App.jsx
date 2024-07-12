import React from 'react';
import PlayerInput from './components/PlayerInput';
import GameContainer from './components/GameContainer';
import WinnerScreen from './components/WinnerScreen';
import LanguageToggle from './components/LanguageToggle';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(135deg, #f6d365 0%, #fda085 100%);
  color: #333;
`;

const Footer = styled.footer`
  margin-top: 20px;
  font-size: 14px;
  text-align: center;
  color: #fff;
`;

const App = ({
  language,
  setLanguage,
  gameStarted,
  gameEnded,
  players,
  winner,
  winnerScore,
  digitLength,
  setDigitLength,
  startGame,
  restartGame,
  messages,
}) => {
  return (
    <Container>
      <LanguageToggle language={language} setLanguage={setLanguage} />
      {!gameStarted ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          <PlayerInput
            language={language}
            messages={messages}
            startGame={startGame}
            digitLength={digitLength}
            setDigitLength={setDigitLength}
          />
        </motion.div>
      ) : gameEnded ? (
        <WinnerScreen
          language={language}
          messages={messages}
          winner={winner}
          winnerScore={winnerScore}
          players={players}
          restartGame={restartGame}
        />
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          <GameContainer
            language={language}
            messages={messages}
            players={players}
            digitLength={digitLength}
            restartGame={restartGame}
            endGame={restartGame} // 'endGame' yerine 'restartGame' yazıldı
          />
        </motion.div>
      )}
      <Footer>
        <p>{messages[language].footer}</p>
      </Footer>
    </Container>
  );
};

export default App;