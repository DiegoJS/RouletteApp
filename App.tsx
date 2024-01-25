/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useRef, useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
  Animated,
  Easing,
  Button,
} from 'react-native';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const [isSpinning, setIsSpinning] = useState(false);
  let rotateValue = useRef(new Animated.Value(0)).current;

  const handleStartRulette = () => {
    if (isSpinning) {return;}

    setIsSpinning(true);

    let grados_circulo 	=	360;
		let premio 	= 	grados_circulo / 8;

		let valor_aleatorio =	Math.floor(Math.random() * 8);
		let ruleta_result 	= 	premio * valor_aleatorio;
		let valor_premio 	= 	(grados_circulo	* 4) + ruleta_result;

    const premios = [100, 800, 700, 600, 500, 400, 300, 200];
    
    rotateValue.setValue(0);

    Animated.timing(rotateValue, {
      toValue: valor_aleatorio + 32,
      duration: 3500, // Duración de la rotación en milisegundos
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start(() => {
      setIsSpinning(false);
    });

  };

  const rotate = rotateValue.interpolate({
    inputRange: [0, 32, 33, 34, 35, 36, 37, 38, 39],
    outputRange: ['0deg', '1440deg', '1485deg', '1530deg', '1575deg', '1620deg', '1665deg', '1710deg','1755deg'],
  });

  return (
    <SafeAreaView style={{backgroundColor: '#031329', flex: 1,}}>
      <StatusBar barStyle={'dark-content'}/>
      <View style={styles.sectionContainer}>
        <View style={styles.heading}>
          <View style={{position:'absolute', zIndex: 20}}>
            <Button title="Voy a tener suerte" onPress={handleStartRulette}></Button>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'center', // Centra verticalmente
            alignItems: 'center',
            position: 'relative',
          }}>
          <Animated.Image
            source={require('./src/assets/ruleta.png')}
            style={[styles.image, { transform: [{ rotate }] }]}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 25,
  },
  image: {
    top: 0,
    width: 800,
    height: 800,
    resizeMode: 'cover',
    position: 'absolute',
  },
  heading: {
    flex: 1,
    minHeight: 300,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
});

export default App;
