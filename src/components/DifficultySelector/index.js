import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';

import BoardConstants from '../../constants/board';

import styles from './styles';

const DifficultySelector = ({ onSelect }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select difficulty</Text>
      {Object.keys(BoardConstants.gameModes).map((mode) => (
        <TouchableOpacity
          style={styles.button}
          key={mode}
          onPress={() => onSelect(mode)}
        >
          <Text style={styles.buttonLabel}>{`${mode} >`}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default DifficultySelector;
