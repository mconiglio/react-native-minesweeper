import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';

import BoardConstants from '../../constants/board';
import { buildGame } from '../../lib/boardBuilder';
import { setBoard } from '../../actions/board';

import styles from './styles';

const DifficultySelector = () => {
  const dispatch = useDispatch();

  const handleSelect = (difficulty) => {
    dispatch(setBoard(buildGame(difficulty), difficulty));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select difficulty</Text>
      {Object.keys(BoardConstants.gameModes).map((difficulty) => (
        <TouchableOpacity
          style={styles.button}
          key={difficulty}
          onPress={() => handleSelect(difficulty)}
        >
          <Text style={styles.buttonLabel}>{`${difficulty} >`}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default DifficultySelector;
