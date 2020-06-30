import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import {
  flagCell,
  revealCell,
  revealCellsAround,
  setGameResult,
} from '../../actions/board';

import styles from './styles';

const Cell = ({ x, y }) => {
  const dispatch = useDispatch();
  const { revealed, flagged, hasBomb, bombsAround } = useSelector(
    ({ board: { cells, completed } }) => ({
      ...cells[y][x],
      revealed: completed || cells[y][x].revealed,
    }),
    shallowEqual
  );

  const handlePress = () => {
    if (flagged || revealed) {
      return;
    }
    if (hasBomb) {
      dispatch(setGameResult(false));
    } else {
      if (bombsAround === 0) {
        dispatch(revealCellsAround(x, y));
      } else {
        dispatch(revealCell(x, y));
      }
    }
  };

  const handleLongPress = () => {
    if (revealed) {
      return;
    }
    dispatch(flagCell(x, y, !flagged));
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      onLongPress={handleLongPress}
      activeOpacity={1}
      style={[
        styles.container,
        revealed ? styles.containerVisible : styles.containerHidden,
      ]}
    >
      {revealed ? (
        <Text style={styles.label}>{hasBomb ? '💣' : bombsAround || null}</Text>
      ) : (
        flagged && <Text style={styles.label}>🚩</Text>
      )}
    </TouchableOpacity>
  );
};

export default Cell;
