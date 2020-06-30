import React, { useState, useEffect, useMemo } from 'react';
import { View } from 'react-native';

import Board from '../Board';
import Header from './Header';
import ResultModal from '../ResultModal';

import BoardConstants from '../../constants/board';
import { buildGame } from '../../lib/boardBuilder';
import { gameWon, positionsToRecursivelyReveal } from '../../lib/utils';

import styles from './styles';

const Game = ({ difficulty, onResetDifficulty }) => {
  const [gameStatus, setGameStatus] = useState({ ended: false, won: false });
  const [cells, setCells] = useState(buildGame(difficulty));
  const remainingBombs = useMemo(() => {
    const flaggedCells = cells.flat().filter((cell) => cell.flagged);
    const { bombsCount } = BoardConstants.gameModes[difficulty];

    return bombsCount - flaggedCells.length;
  }, [difficulty, cells]);

  useEffect(() => {
    if (gameWon(cells, difficulty)) {
      setGameStatus({ ended: true, won: true });
      revealAllCells();
    }
  }, [cells, difficulty]);

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
    setCells(buildGame(difficulty));
  };

  return (
    <View style={styles.container}>
      <Header
        remainingBombs={remainingBombs}
        onResetDifficulty={onResetDifficulty}
      />
      <Board
        cells={cells}
        onCellPress={handleCellPress}
        onCellLongPress={handleCellLongPress}
      />
      {gameStatus.ended && (
        <ResultModal gameWon={gameStatus.won} onRetryPress={handleRetryPress} />
      )}
    </View>
  );
};

export default Game;
