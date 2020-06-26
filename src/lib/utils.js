import BoardConstants from '../constants/board';

export const adjacentPositions = (x, y) => {
  let positions = [];

  for (let i = x - 1; i <= x + 1; i++) {
    for (let j = y - 1; j <= y + 1; j++) {
      if (
        (i !== x || j !== y) &&
        i >= 0 &&
        j >= 0 &&
        i < BoardConstants.columns &&
        j < BoardConstants.rows
      ) {
        positions.push([i, j]);
      }
    }
  }

  return positions;
};
