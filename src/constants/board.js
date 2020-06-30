const gameModes = {
  beginner: {
    columns: 9,
    rows: 9,
    bombsCount: 10,
  },
  intermediate: {
    columns: 16,
    rows: 16,
    bombsCount: 40,
  },
  expert: {
    columns: 30,
    rows: 16,
    bombsCount: 99,
  },
};

export default {
  cellSize: 30,
  gameModes,
};
