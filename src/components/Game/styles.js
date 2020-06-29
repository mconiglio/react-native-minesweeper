import { StyleSheet } from 'react-native';
import Colors from '../../constants/colors';

export default StyleSheet.create({
  safeArea: {
    backgroundColor: Colors.lighter,
  },
  container: {
    height: '100%',
    width: '100%',
  },
  remainingBombsContainer: {
    alignItems: 'center',
    paddingVertical: 15,
  },
  remainingBombs: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.white,
  },
});
