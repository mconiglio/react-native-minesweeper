import React, { useState, useEffect } from 'react';
import { ScrollView, View, Alert } from 'react-native';

import BoardConstants from '../../constants/board';
import { buildGame } from '../../lib/boardBuilder';
import { positionsToRecursivelyReveal } from '../../lib/utils';
import Cell from '../Cell';

import styles from './styles';

const Board = () => {
  const [cells, setCells] = useState(buildGame());

  useEffect(() => {
    let revealedCells = 0;

    cells.forEach((row) =>
      row.forEach((cell) => {
        if (cell.revealed) {
          revealedCells++;
        }
      })
    );

    if (
      revealedCells ===
      BoardConstants.columns * BoardConstants.rows - BoardConstants.bombsCount
    ) {
      revealAllCells();
      Alert.alert('You win!');
    }
  }, [cells]);

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

  const revealAllCells = () => {
    setCells((prevCells) =>
      prevCells.map((row) => row.map((cell) => ({ ...cell, revealed: true })))
    );
  };

  const revealCell = (x, y) => {
    const positionsToReveal =
      cells[y][x].bombsAround === 0
        ? positionsToRecursivelyReveal(
            x,
            y,
            cells.map((row) => row.map((cell) => ({ ...cell })))
          )
        : [[x, y]];

    setCells((prevCells) => {
      const cellsCopy = prevCells.map((row) =>
        row.map((cell) => ({ ...cell }))
      );
      positionsToReveal.map(
        ([posX, posY]) => (cellsCopy[posY][posX].revealed = true)
      );
      return cellsCopy;
    });
  };

  return (
    <ScrollView style={styles.container} horizontal>
      <ScrollView style={styles.container}>
        {cells.map((row, rowNumber) => (
          <View style={styles.row} key={rowNumber}>
            {row.map((cell) => (
              <Cell
                key={`cell-${cell.x}-${cell.y}`}
                cell={cell}
                onPress={handleCellPress}
              />
            ))}
          </View>
        ))}
      </ScrollView>
    </ScrollView>
  );
};

export default Board;
