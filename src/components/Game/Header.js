import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import BoardConstants from '../../constants/board';
import { setBoard } from '../../actions/board';

import styles from './styles';

const Header = () => {
  const dispatch = useDispatch();
  const remainingBombs = useSelector(({ board: { difficulty, cells } }) => {
    const { bombsCount } = BoardConstants.gameModes[difficulty];
    let flaggedCells = 0;

    cells.forEach((row) =>
      row.forEach((cell) => {
        if (cell.flagged && !cell.revealed) {
          flaggedCells++;
        }
      })
    );

    return bombsCount - flaggedCells;
  });

  const handleGoBack = () => {
    dispatch(setBoard(null, null));
  };

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={handleGoBack}>
        <Text style={styles.headerText}>{'< Back'}</Text>
      </TouchableOpacity>
      <Text style={styles.headerText}>💣 remaining: {remainingBombs}</Text>
    </View>
  );
};

export default Header;
