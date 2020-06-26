import React from 'react';
import { View } from 'react-native';

import Board from '../Board';

import styles from './styles';

const Game = () => {
  return (
    <View style={styles.container}>
      <Board />
    </View>
  );
};

export default Game;
