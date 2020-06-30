import Types from './types';

export const setBoard = (cells, difficulty) => ({
  type: Types.SET_BOARD,
  payload: { cells, difficulty },
});

export const revealCell = (x, y) => ({
  type: Types.REVEAL_CELL,
  payload: { x, y },
});

export const revealCellsAround = (x, y) => ({
  type: Types.REVEAL_CELLS_AROUND,
  payload: { x, y },
});

export const flagCell = (x, y, flagged) => ({
  type: Types.FLAG_CELL,
  payload: { x, y, flagged },
});
