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

export const positionsToRecursivelyReveal = (x, y, board) => {
  if (board[y][x].visited) {
    return [];
  }

  board[y][x].visited = true;

  if (board[y][x].bombsAround > 0) {
    return [[x, y]];
  }

  const neighbors = adjacentPositions(x, y);
  const positionsToVisit = neighbors.filter(
    ([adjX, adjY]) =>
      !board[adjY][adjX].visited &&
      !board[adjY][adjX].revealed &&
      !board[adjY][adjX].hasBomb
  );

  return positionsToVisit.reduce(
    (positionsToReveal, [adjX, adjY]) =>
      positionsToReveal.concat(positionsToRecursivelyReveal(adjX, adjY, board)),
    [[x, y]]
  );
};
