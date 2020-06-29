import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

import styles from './styles';

const Cell = React.memo(
  function Cell({
    cell: { x, y, revealed, flagged, hasBomb, bombsAround },
    onPress,
    onLongPress,
  }) {
    return (
      <TouchableOpacity
        onPress={() => onPress(x, y)}
        onLongPress={() => onLongPress(x, y)}
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
  (prevProps, nextProps) =>
    prevProps.cell.revealed === nextProps.cell.revealed &&
    prevProps.cell.flagged === nextProps.cell.flagged
);

export default Cell;
