import React from 'react';
import { View } from 'react-native';

import Board from '../Board';
import Header from './Header';
import ResultModal from '../ResultModal';

import styles from './styles';

const Game = () => {
  return (
    <View style={styles.container}>
      <Header />
      <Board />
      <ResultModal />
    </View>
  );
};

export default Game;
