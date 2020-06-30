import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import styles from './styles';

const Header = ({ remainingBombs, onResetDifficulty }) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={onResetDifficulty}>
        <Text style={styles.headerText}>{'< Back'}</Text>
      </TouchableOpacity>
      <Text style={styles.headerText}>💣 remaining: {remainingBombs}</Text>
    </View>
  );
};

export default Header;
