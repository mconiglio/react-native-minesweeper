import Types from '../actions/types';
import createReducer from './createReducer';
import BoardConstants from '../constants/board';
import Minesweeper from '../lib/Minesweeper';
import { positionsAroundToReveal } from '../lib/utils';

const initialState = {
  difficulty: null,
  cells: null,
  completed: false,
  won: null,
  gameStarted: false,
};

const setBoard = (_state, payload) => {
  const { cells, difficulty } = payload;
  return { completed: false, won: null, gameStarted: false, cells, difficulty };
};

const revealCell = (state, payload) => {
  let { cells, difficulty, gameStarted } = state;
  const { x, y } = payload;
  const { rows, columns, bombsCount } = BoardConstants.gameModes[difficulty];

  if (!gameStarted) {
    cells = swapIfBombOnFirstClick(cells, x, y);
  }

  if (cells[y][x].hasBomb) {
    return { ...state, completed: true, won: false };
  }

  let revealedCells = 0;
  const updatedCells = cells.map((row) =>
    row.map((cell) => {
      if (cell.x === x && cell.y === y) {
        revealedCells++;
        return { ...cell, revealed: true };
      }
      if (cell.revealed) {
        revealedCells++;
      }
      return cell;
    })
  );

  if (revealedCells === rows * columns - bombsCount) {
    return {
      ...state,
      cells: updatedCells,
      completed: true,
      won: true,
      gameStarted: true,
    };
  }

  return { ...state, cells: updatedCells, gameStarted: true };
};

const revealCellsAround = (state, payload) => {
  let { cells, difficulty, gameStarted } = state;
  const { x, y } = payload;
  const { rows, columns, bombsCount } = BoardConstants.gameModes[difficulty];

  if (!gameStarted) {
    cells = swapIfBombOnFirstClick(cells, x, y);
  }

  if (cells[y][x].hasBomb) {
    return { ...state, completed: true, won: false };
  }

  const positionsToReveal = positionsAroundToReveal(x, y, cells);
  const updatedCells = cells.map((row) => row.map((cell) => ({ ...cell })));
  positionsToReveal.map(
    ([posX, posY]) => (updatedCells[posY][posX].revealed = true)
  );

  let revealedCells = 0;
  updatedCells.forEach((row) =>
    row.forEach((cell) => {
      if (cell.revealed) {
        revealedCells++;
      }
    })
  );

  if (revealedCells === rows * columns - bombsCount) {
    return {
      ...state,
      cells: updatedCells,
      completed: true,
      won: true,
      gameStarted: true,
    };
  }

  return { ...state, cells: updatedCells, gameStarted: true };
};

const flagCell = (state, payload) => {
  const { cells } = state;
  const { x, y, flagged } = payload;

  return {
    ...state,
    cells: cells.map((row) =>
      row.map((cell) =>
        cell.x === x && cell.y === y ? { ...cell, flagged } : cell
      )
    ),
  };
};

const swapIfBombOnFirstClick = (board, clickedX, clickedY) => {
  const clickedPosition = board[clickedY][clickedX];
  if (!clickedPosition.hasBomb) {
    return board;
  }
  return Minesweeper.relocateBomb(board, clickedX, clickedY);
};

const handlers = {
  [Types.SET_BOARD]: setBoard,
  [Types.REVEAL_CELL]: revealCell,
  [Types.REVEAL_CELLS_AROUND]: revealCellsAround,
  [Types.FLAG_CELL]: flagCell,
};

export default createReducer(initialState, handlers);
