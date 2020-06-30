import BoardConstants from '../constants/board';

export const adjacentPositions = (x, y, rowsCount, columnsCount) => {
  let positions = [];

  for (let i = x - 1; i <= x + 1; i++) {
    for (let j = y - 1; j <= y + 1; j++) {
      if (
        (i !== x || j !== y) &&
        i >= 0 &&
        j >= 0 &&
        i < columnsCount &&
        j < rowsCount
      ) {
        positions.push([i, j]);
      }
    }
  }

  return positions;
};

export const gameWon = (board, difficulty) => {
  let revealedCells = 0;
  const { rows, columns, bombsCount } = BoardConstants.gameModes[difficulty];

  board.forEach((row) =>
    row.forEach((cell) => {
      if (cell.revealed) {
        revealedCells++;
      }
    })
  );

  return revealedCells === rows * columns - bombsCount;
};

export const positionsToRecursivelyReveal = (x, y, board) => {
  const rowsCount = board.length;
  const columnsCount = board[0].length;
  let positionsToVisit = [[x, y]];
  let positionsToReveal = [];

  while (positionsToVisit.length !== 0) {
    const [posX, posY] = positionsToVisit.shift();
    let currentPosition = board[posY][posX];

    if (currentPosition.visited) {
      continue;
    }

    currentPosition.visited = true;
    positionsToReveal.push([currentPosition.x, currentPosition.y]);

    if (currentPosition.bombsAround > 0) {
      continue;
    }

    const neighbors = adjacentPositions(posX, posY, rowsCount, columnsCount);
    positionsToVisit.push(
      ...neighbors.filter(
        ([adjX, adjY]) =>
          !board[adjY][adjX].visited &&
          !board[adjY][adjX].revealed &&
          !board[adjY][adjX].hasBomb
      )
    );
  }

  return positionsToReveal;
};
