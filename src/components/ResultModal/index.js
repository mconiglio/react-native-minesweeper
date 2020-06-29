import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, Easing, Modal, Text } from 'react-native';

import styles from './styles';

const { height: screenHeight } = Dimensions.get('screen');

const ResultModal = ({ gameWon, onClose }) => {
  const translateY = useRef(new Animated.Value(screenHeight));
  const scaleValue = useRef(new Animated.Value(0));

  const scale = scaleValue.current.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 1.4, 1],
  });

  useEffect(() => {
    Animated.sequence([
      Animated.timing(translateY.current, {
        toValue: 0,
        duration: 1000,
        easing: Easing.bezier(0.0, 0.0, 0.2, 1),
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue.current, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Modal onRequestClose={onClose} transparent visible>
      <Animated.View
        style={[
          styles.container,
          { transform: [{ translateY: translateY.current }] },
        ]}
      >
        <Animated.View style={[styles.messageBox, { transform: [{ scale }] }]}>
          <Text>{gameWon ? 'You Win' : 'You Lose'}</Text>
          <Text>Retry</Text>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
};

export default ResultModal;
