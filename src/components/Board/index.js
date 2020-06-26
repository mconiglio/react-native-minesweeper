import React, { useState } from 'react';
import { View, Alert } from 'react-native';

import { buildGame } from '../../lib/boardBuilder';
import Cell from '../Cell';

import styles from './styles';

const Board = () => {
  const [cells, setCells] = useState(buildGame());

  const handleCellPress = (x, y) => {
    const pressedCell = cells[y][x];
    if (pressedCell.revealed) {
      return;
    }

    if (pressedCell.hasBomb) {
      revealAllCells();
      Alert.alert('Oops!');
    } else {
      revealCell(x, y);
    }
  };

  const handleCellLongPress = (x, y) => {
    const pressedCell = cells[y][x];
    if (pressedCell.revealed) {
      return;
    }

    setCells((prevCells) =>
      prevCells.map((row, j) =>
        row.map((cell, i) =>
          i === x && j === y ? { ...cell, flagged: true } : cell
        )
      )
    );
  };

  const revealAllCells = () => {
    setCells((prevCells) =>
      prevCells.map((row) => row.map((cell) => ({ ...cell, revealed: true })))
    );
  };

  const revealCell = (x, y) => {
    setCells((prevCells) =>
      prevCells.map((row, j) =>
        row.map((cell, i) =>
          i === x && j === y ? { ...cell, revealed: true } : cell
        )
      )
    );
  };

  return (
    <View style={styles.container}>
      {cells.map((row, rowNumber) => (
        <View style={styles.row} key={rowNumber}>
          {row.map((cell) => (
            <Cell
              key={`cell-${cell.x}-${cell.y}`}
              cell={cell}
              onPress={handleCellPress}
              onLongPress={handleCellLongPress}
            />
          ))}
        </View>
      ))}
    </View>
  );
};

export default Board;
