import React, { memo, useState } from 'react';
import { TouchableOpacity, Text } from 'react-native';

import styles from './styles';

const Cell = memo(
  function Cell({ cell: { x, y, revealed, hasBomb, bombsAround }, onPress }) {
    const [flagged, setFlagged] = useState(false);

    const handleLongPress = () => {
      setFlagged((wasFlagged) => !wasFlagged);
    };

    return (
      <TouchableOpacity
        onPress={() => onPress(x, y)}
        onLongPress={handleLongPress}
        activeOpacity={1}
        style={[
          styles.container,
          revealed ? styles.containerVisible : styles.containerHidden,
        ]}
      >
        {revealed ? (
          <Text style={styles.label}>
            {hasBomb ? '💣' : bombsAround || null}
          </Text>
        ) : (
          flagged && <Text style={styles.label}>🚩</Text>
        )}
      </TouchableOpacity>
    );
  },
  (prevProps, nextProps) => prevProps.cell.revealed === nextProps.cell.revealed
);

export default Cell;
