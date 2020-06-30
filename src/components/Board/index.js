import React from 'react';
import { ScrollView, View } from 'react-native';

import Cell from '../Cell';

import BoardConstants from '../../constants/board';

import styles from './styles';

const Board = ({ cells, onCellPress, onCellLongPress }) => {
  const flattenedCells = cells.reduce((rows, row) => {
    return rows.concat(row);
  });

  return (
    <ScrollView
      style={styles.horizontalContainer}
      contentContainerStyle={styles.horizontalContent}
      bounces={false}
      horizontal
    >
      <ScrollView
        style={styles.verticalContainer}
        contentContainerStyle={styles.grid}
        bounces={false}
      >
        <View
          style={[
            styles.rows,
            { width: cells[0].length * BoardConstants.cellSize },
          ]}
        >
          {flattenedCells.map((cell) => (
            <Cell
              key={`cell-${cell.x}-${cell.y}`}
              cell={cell}
              onPress={onCellPress}
              onLongPress={onCellLongPress}
            />
          ))}
        </View>
      </ScrollView>
    </ScrollView>
  );
};

export default Board;
