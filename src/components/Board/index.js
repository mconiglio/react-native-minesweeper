import React from 'react';
import { ScrollView, View } from 'react-native';

import Cell from '../Cell';

import styles from './styles';

const Board = ({ cells, onCellPress, onCellLongPress }) => {
  return (
    <ScrollView style={styles.container} horizontal>
      <ScrollView style={styles.container}>
        {cells.map((row, rowNumber) => (
          <View style={styles.row} key={rowNumber}>
            {row.map((cell) => (
              <Cell
                key={`cell-${cell.x}-${cell.y}`}
                cell={cell}
                onPress={onCellPress}
                onLongPress={onCellLongPress}
              />
            ))}
          </View>
        ))}
      </ScrollView>
    </ScrollView>
  );
};

export default Board;
