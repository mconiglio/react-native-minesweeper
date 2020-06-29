import { StyleSheet } from 'react-native';
import Colors from '../../constants/colors';

export default StyleSheet.create({
  horizontalContainer: {
    marginHorizontal: 20,
  },
  horizontalContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  verticalContainer: {
    flexGrow: 0,
  },
  grid: {
    borderWidth: 6,
    borderTopColor: Colors.grey,
    borderRightColor: Colors.white,
    borderBottomColor: Colors.white,
    borderLeftColor: Colors.grey,
  },
  row: {
    flexDirection: 'row',
  },
});
