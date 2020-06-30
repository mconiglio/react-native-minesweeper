import React from 'react';
import { SafeAreaView } from 'react-native';
import { useSelector } from 'react-redux';

import Game from '../Game';
import DifficultySelector from '../DifficultySelector';

import styles from './styles';

const App = () => {
  const boardInitialized = useSelector(
    ({ board: { cells } }) => cells !== null
  );

  return (
    <SafeAreaView style={styles.container}>
      {boardInitialized ? <Game /> : <DifficultySelector />}
    </SafeAreaView>
  );
};

export default App;
