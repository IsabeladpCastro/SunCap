import { useNavigation } from "expo-router";
import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Image } from 'react-native';

export default function SecondLoading() {
  const rotateAnimation = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotateAnimation, {
        toValue: 0.05,
        duration: 2500,
        useNativeDriver: true,
      })
    ).start();

    const timer = setTimeout(() => {
      navigation.navigate('SignIn' as never);
    }, 2500);

    return () => clearTimeout(timer);
  }, [rotateAnimation, navigation]);

  const rotateInterpolate = rotateAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '330deg'],
  });

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('../../assets/images/sun.png')}
        style={[
          styles.sun,
          {
            transform: [{ rotate: rotateInterpolate }],
          },
        ]}
        resizeMode="contain"
      />
      <Image
        source={require('../../assets/images/suncap-logo-text.png')}
        style={styles.text}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFA500',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sun: {
    width: 130,
    height: 130,
    marginBottom: 10,
  },
  text: {
    width: 180,
    height: 40,
  },
});