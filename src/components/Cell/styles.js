import { StyleSheet } from 'react-native';
import Colors from '../../constants/colors';
import BoardConstants from '../../constants/board';

export default StyleSheet.create({
  container: {
    height: BoardConstants.cellSize,
    width: BoardConstants.cellSize,
    backgroundColor: Colors.light,
    justifyContent: 'center',
  },
  containerVisible: {
    borderWidth: 1,
    borderColor: Colors.grey,
  },
  containerHidden: {
    borderWidth: 3,
    borderTopColor: Colors.white,
    borderRightColor: Colors.grey,
    borderBottomColor: Colors.grey,
    borderLeftColor: Colors.white,
  },
  label: {
    textAlign: 'center',
    fontWeight: '800',
  },
});
