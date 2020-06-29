import React, { useState, useEffect, useMemo } from 'react';
import { SafeAreaView, View, Text } from 'react-native';

import Board from '../Board';
import ResultModal from '../ResultModal';

import BoardConstants from '../../constants/board';
import { buildGame } from '../../lib/boardBuilder';
import { positionsToRecursivelyReveal } from '../../lib/utils';

import styles from './styles';

const Game = () => {
  const [gameStatus, setGameStatus] = useState({ ended: false, won: false });
  const [cells, setCells] = useState(buildGame());
  const remainingBombs = useMemo(() => {
    const flaggedCells = cells.flat().filter((cell) => cell.flagged);
    return BoardConstants.bombsCount - flaggedCells.length;
  }, [cells]);

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
      setGameStatus({ ended: true, won: true });
      revealAllCells();
    }
  }, [cells]);

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

  const handleCellPress = (x, y) => {
    const pressedCell = cells[y][x];
    if (pressedCell.revealed) {
      return;
    }

    if (pressedCell.hasBomb) {
      setGameStatus({ ended: true, won: false });
      revealAllCells();
    } else {
      revealCell(x, y);
    }
  };

  const handleCellLongPress = (x, y) => {
    setCells((prevCells) =>
      prevCells.map((row) =>
        row.map((cell) =>
          cell.x === x && cell.y === y ? { ...cell, flagged: true } : cell
        )
      )
    );
  };

  const handleRetryPress = () => {
    setGameStatus({ ended: false, won: false });
    setCells(buildGame());
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.remainingBombsContainer}>
          <Text style={styles.remainingBombs}>
            💣 remaining: {remainingBombs}
          </Text>
        </View>
        <Board
          cells={cells}
          onCellPress={handleCellPress}
          onCellLongPress={handleCellLongPress}
        />
        {gameStatus.ended && (
          <ResultModal
            gameWon={gameStatus.won}
            onRetryPress={handleRetryPress}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default Game;
