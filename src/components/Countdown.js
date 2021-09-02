import React, { useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { colors } from '../utils/colors';
import { fontSize, spacing } from '../utils/sizes';

const minutesToMilliseconds = (mins) => mins * 1000 * 60;
const formatTime = (time) => (time < 10 ? `0${time}` : time);

export const Countdown = ({ minutes = 1, isPaused, onProgress }) => {
  const interval = useRef(null);
  const [milliseconds, setMilliseconds] = useState(
    minutesToMilliseconds(minutes)
  );
  const minutesRevert = Math.floor(milliseconds / 1000 / 60) % 60;
  const seconds = Math.floor(milliseconds / 1000) % 60;

  const countDown = () => {
    setMilliseconds((time) => {
      if (time === 0) {
        //Do something more
        return time;
      } else {
        const timeLeft = time - 1000;
        return timeLeft;
      }
    });
  };

  useEffect(() => {
    if (isPaused) {
      return;
    }
    interval.current = setInterval(countDown, 1000);
    onProgress(milliseconds / minutesToMilliseconds(minutes));

    return () => clearInterval(interval.current);
  }, [isPaused, milliseconds]);
  return (
    <View>
      <Text style={styles.countdown}>
        {formatTime(minutesRevert)}:{formatTime(seconds)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  countdown: {
    fontSize: fontSize.xxxl,
    fontWeight: 'bold',
    color: colors.white,
    padding: spacing.lg,
    backgroundColor: 'rgba(94,132,226,0.3)',
  },
});
