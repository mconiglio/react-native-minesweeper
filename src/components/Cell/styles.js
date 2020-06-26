import { StyleSheet } from 'react-native';
import Colors from '../../constants/colors';
import BoardConstants from '../../constants/board';

export default StyleSheet.create({
  container: {
    height: BoardConstants.cellSize,
    width: BoardConstants.cellSize,
    backgroundColor: Colors.lighter,
    textAlign: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
  containerVisible: {
    borderWidth: 1,
    borderColor: Colors.light,
  },
  containerHidden: {
    borderWidth: 3,
    borderTopColor: Colors.white,
    borderRightColor: Colors.light,
    borderBottomColor: Colors.light,
    borderLeftColor: Colors.white,
  },
  label: {
    textAlign: 'center',
    fontWeight: '800',
  },
});
