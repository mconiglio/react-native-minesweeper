import BoardConstants from '../constants/board';
import { adjacentPositions } from './utils';

export const buildGame = () => {
  const emptyBoard = buildBoard();
  const boardWithBombs = plantBombs(emptyBoard);
  const gameBoard = setBombsAround(boardWithBombs);

  return gameBoard;
};

const buildBoard = () => {
  // TODO: refactor
  let board = [];

  for (let i = 0; i < BoardConstants.rows; i++) {
    board.push([]);
    for (let j = 0; j < BoardConstants.columns; j++) {
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

const plantBombs = (board) => {
  // TODO: make pure function
  if (
    BoardConstants.bombsCount < 1 ||
    BoardConstants.rows * BoardConstants.columns <= BoardConstants.bombsCount
  ) {
    throw new Error(
      'Bombs count should be a positive number lower than the available cells count'
    );
  }

  let bombsPlanted = 0;

  while (bombsPlanted < BoardConstants.bombsCount) {
    const yPos = Math.floor(Math.random() * BoardConstants.rows);
    const xPos = Math.floor(Math.random() * BoardConstants.columns);
    if (!board[yPos][xPos].hasBomb) {
      board[yPos][xPos].hasBomb = true;
      bombsPlanted++;
    }
  }

  return board;
};

const setBombsAround = (board) => {
  // TODO: make pure function
  for (let i = 0; i < BoardConstants.rows; i++) {
    for (let j = 0; j < BoardConstants.columns; j++) {
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
  return adjacentPositions(x, y).reduce(
    (bombCount, [i, j]) => (board[j][i].hasBomb ? bombCount + 1 : bombCount),
    0
  );
};
