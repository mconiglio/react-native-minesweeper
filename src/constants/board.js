import { Dimensions } from 'react-native';

const { width: screenWidth } = Dimensions.get('screen');

const columns = 10;
const cellSize = screenWidth / columns;

export default {
  cellSize,
  columns,
  rows: 10,
  bombsCount: 20,
};
