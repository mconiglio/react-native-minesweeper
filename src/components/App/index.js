import React, { useState } from 'react';
import { SafeAreaView } from 'react-native';

import Game from '../Game';
import DifficultySelector from '../DifficultySelector';

import styles from './styles';

const App = () => {
  const [difficulty, setDifficulty] = useState(null);

  const handleResetDifficulty = () => {
    setDifficulty(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      {difficulty ? (
        <Game
          difficulty={difficulty}
          onResetDifficulty={handleResetDifficulty}
        />
      ) : (
        <DifficultySelector onSelect={setDifficulty} />
      )}
    </SafeAreaView>
  );
};

export default App;
