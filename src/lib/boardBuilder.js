import BoardConstants from '../constants/board';
import { adjacentPositions } from './utils';

export const buildGame = (difficulty) => {
  const { rows, columns, bombsCount } = BoardConstants.gameModes[difficulty];

  const emptyBoard = buildBoard(rows, columns);
  const boardWithBombs = plantBombs(emptyBoard, bombsCount);
  const gameBoard = setBombsAround(boardWithBombs);

  return gameBoard;
};

const buildBoard = (rows, columns) => {
  // TODO: refactor
  let board = [];

  for (let i = 0; i < rows; i++) {
    board.push([]);
    for (let j = 0; j < columns; j++) {
      board[i][j] = {
        x: j,
        y: i,
        hasBomb: false,
        bombsAround: 0,
        revealed: false,
        flagged: false,
      };
    }
  }

  return board;
};

const plantBombs = (board, bombsCount) => {
  const rowsCount = board.length;
  const columnsCount = board[0].length;

  if (bombsCount < 1 || rowsCount * columnsCount <= bombsCount) {
    throw new Error(
      'Bombs count should be a positive number lower than the available cells count'
    );
  }

  let bombsPlanted = 0;

  while (bombsPlanted < bombsCount) {
    const yPos = Math.floor(Math.random() * rowsCount);
    const xPos = Math.floor(Math.random() * columnsCount);
    if (!board[yPos][xPos].hasBomb) {
      board[yPos][xPos].hasBomb = true;
      bombsPlanted++;
    }
  }

  return board;
};

const setBombsAround = (board) => {
  const rowsCount = board.length;
  const columnsCount = board[0].length;

  for (let i = 0; i < rowsCount; i++) {
    for (let j = 0; j < columnsCount; j++) {
      if (!board[i][j].hasBomb) {
        const bombCount = getBombCountFromCell(
          board[i][j].x,
          board[i][j].y,
          board
        );
        board[i][j].bombsAround = bombCount;
      }
    }
  }

  return board;
};

const getBombCountFromCell = (x, y, board) => {
  const rowsCount = board.length;
  const columnsCount = board[0].length;

  return adjacentPositions(x, y, rowsCount, columnsCount).reduce(
    (bombCount, [i, j]) => (board[j][i].hasBomb ? bombCount + 1 : bombCount),
    0
  );
};
