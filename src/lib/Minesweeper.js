import BoardConstants from '../constants/board';
import { randomPosition, adjacentPositions } from './utils';

class Minesweeper {
  constructor() {
    this.board = [];
  }

  static relocateBomb(board, ignoredX, ignoredY) {
    const boardCopy = board.map((row) => row.map((cell) => ({ ...cell })));
    const rowsCount = boardCopy.length;
    const columnsCount = boardCopy[0].length;

    let bombPlanted = false;
    while (!bombPlanted) {
      const [xPos, yPos] = randomPosition(rowsCount, columnsCount);
      if (!boardCopy[yPos][xPos].hasBomb) {
        boardCopy[yPos][xPos].hasBomb = true;
        adjacentPositions(xPos, yPos, rowsCount, columnsCount).forEach(
          ([adjX, adjY]) => {
            boardCopy[adjY][adjX].bombsAround++;
          }
        );
        bombPlanted = true;
      }
    }

    boardCopy[ignoredY][ignoredX].hasBomb = false;
    adjacentPositions(ignoredX, ignoredY, rowsCount, columnsCount).forEach(
      ([adjX, adjY]) => {
        boardCopy[adjY][adjX].bombsAround--;
      }
    );

    return boardCopy;
  }

  buildGame(difficulty) {
    const { rows, columns, bombsCount } = BoardConstants.gameModes[difficulty];
    this.buildBoard(rows, columns);
    this.plantBombs(bombsCount);
    this.setAdjacentBombsCount();

    return this.board;
  }

  buildBoard(rows, columns) {
    for (let i = 0; i < rows; i++) {
      this.board.push([]);
      for (let j = 0; j < columns; j++) {
        this.board[i][j] = {
          x: j,
          y: i,
          hasBomb: false,
          bombsAround: 0,
          revealed: false,
          flagged: false,
        };
      }
    }
  }

  plantBombs(bombsCount) {
    const rowsCount = this.board.length;
    const columnsCount = this.board[0].length;

    const invalidBombCount =
      bombsCount < 1 || rowsCount * columnsCount <= bombsCount;
    if (invalidBombCount) {
      throw new Error(
        'Bombs count should be a positive number lower than the available cells count'
      );
    }

    let bombsPlanted = 0;

    while (bombsPlanted < bombsCount) {
      const [xPos, yPos] = randomPosition(rowsCount, columnsCount);
      if (!this.board[yPos][xPos].hasBomb) {
        this.board[yPos][xPos].hasBomb = true;
        bombsPlanted++;
      }
    }
  }

  setAdjacentBombsCount() {
    const rowsCount = this.board.length;
    const columnsCount = this.board[0].length;

    let bombPositions = [];
    this.board.forEach((rows) =>
      rows.forEach((cell) => {
        if (cell.hasBomb) {
          bombPositions.push([cell.x, cell.y]);
        }
      })
    );

    bombPositions.forEach(([x, y]) => {
      adjacentPositions(x, y, rowsCount, columnsCount).forEach(
        ([adjX, adjY]) => {
          this.board[adjY][adjX].bombsAround++;
        }
      );
    });
  }
}

export default Minesweeper;
