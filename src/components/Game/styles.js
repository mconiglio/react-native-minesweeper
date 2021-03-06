import { StyleSheet } from 'react-native';
import Colors from '../../constants/colors';

export default StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  headerText: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.white,
  },
});
