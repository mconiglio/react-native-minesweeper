import { Dimensions } from 'react-native';

const { width: screenWidth } = Dimensions.get('screen');

const columns = 9;
const cellSize = Math.max(screenWidth / columns, 30);

export default {
  cellSize,
  columns,
  rows: 9,
  bombsCount: 10,
};
