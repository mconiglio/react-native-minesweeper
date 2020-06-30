import Types from '../actions/types';
import createReducer from './createReducer';
import BoardConstants from '../constants/board';
import { positionsAroundToReveal } from '../lib/utils';

const initialState = {
  difficulty: null,
  cells: null,
  completed: false,
  won: null,
};

const setBoard = (_state, payload) => {
  const { cells, difficulty } = payload;
  return { completed: false, won: null, cells, difficulty };
};

const revealCell = (state, payload) => {
  const { cells, difficulty } = state;
  const { x, y } = payload;
  const { rows, columns, bombsCount } = BoardConstants.gameModes[difficulty];

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
    return { ...state, cells: updatedCells, completed: true, won: true };
  }

  return { ...state, cells: updatedCells };
};

const revealCellsAround = (state, payload) => {
  const { cells, difficulty } = state;
  const { x, y } = payload;
  const { rows, columns, bombsCount } = BoardConstants.gameModes[difficulty];

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
    return { ...state, cells: updatedCells, completed: true, won: true };
  }

  return { ...state, cells: updatedCells };
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

const completeGame = (state, payload) => {
  const { won } = payload;
  return { ...state, completed: true, won };
};

const handlers = {
  [Types.SET_BOARD]: setBoard,
  [Types.REVEAL_CELL]: revealCell,
  [Types.REVEAL_CELLS_AROUND]: revealCellsAround,
  [Types.FLAG_CELL]: flagCell,
  [Types.SET_GAME_RESULT]: completeGame,
};

export default createReducer(initialState, handlers);
