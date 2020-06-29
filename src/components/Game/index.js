import React, { useState } from 'react';
import { View } from 'react-native';

import Board from '../Board';
import ResultModal from '../ResultModal';

import styles from './styles';

const Game = () => {
  const [gameStatus, setGameStatus] = useState({ ended: false, won: false });

  const handleGameEnd = (gameWon) => {
    setGameStatus({ ended: true, won: gameWon });
  };

  const handleOnModalClose = () => {
    setGameStatus({ ended: false, won: false });
  };

  return (
    <View style={styles.container}>
      <Board onGameEnd={handleGameEnd} />
      {gameStatus.ended && (
        <ResultModal gameWon={gameStatus.won} onClose={handleOnModalClose} />
      )}
    </View>
  );
};

export default Game;
