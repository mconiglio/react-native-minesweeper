import React from 'react';
import { ScrollView, View } from 'react-native';
import { useSelector } from 'react-redux';

import Cell from '../Cell';

import BoardConstants from '../../constants/board';

import styles from './styles';

const Board = () => {
  const difficulty = useSelector(({ board }) => board.difficulty);
  const { columns, rows } = BoardConstants.gameModes[difficulty];
  let cells = [];

  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      cells.push(<Cell key={`cell-${i}-${j}`} x={i} y={j} />);
    }
  }

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
          style={[styles.rows, { width: columns * BoardConstants.cellSize }]}
        >
          {cells}
        </View>
      </ScrollView>
    </ScrollView>
  );
};

export default Board;
