import React from 'react';
import PlayerBox from './PlayerBox';
import styled from 'styled-components';

const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const PlayerArea = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  width: 100%;
`;

const RestartButton = styled.button`
  background-color: #dc3545;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 20px;

  &:hover {
    background-color: #c82333;
  }
`;

const Game = ({
  language,
  messages,
  players,
  guesses,
  results,
  currentPlayerIndex,
  inputRefs,
  handleGuessChange,
  handleGuessSubmit,
  handleKeyPress,
  attempts, // Deneme hakları
  restartGame, // Restart game fonksiyonu
}) => {
  return (
    <GameContainer>
      <h2>{messages[language].currentPlayer} {players[currentPlayerIndex].name}</h2>
      <PlayerArea>
        {players.map((player, index) => (
          <PlayerBox
            key={index}
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
            attempts={attempts} // Deneme haklarını geçiyoruz
            inputRefs={inputRefs} // inputRefs'i geçiriyoruz
          />
        ))}
      </PlayerArea>
      <RestartButton onClick={restartGame}>
        {messages[language].restartButton}
      </RestartButton>
    </GameContainer>
  );
};

export default Game;