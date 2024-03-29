import React, {useState,useRef} from 'react';
import {SafeAreaView, StatusBar, Animated, Easing, ImageBackground} from 'react-native';
import {View, Button, Text, VStack, Center, Modal, Image} from 'native-base';
import styles from './styles';

function Roulette(): JSX.Element {

    const [isSpinning, setIsSpinning] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [awardItem, setAwardItem] = useState(0);
    const [attemps, setAttemps] = useState(5);
    const [pointsEarned, setPointsEarned] = useState(0);

    const rotateValue = useRef(new Animated.Value(0)).current;

    const handleStartRulette = () => {
        if (isSpinning) return;
        if (attemps == 0) return;

        setIsSpinning(true);
        setAttemps(attemps - 1);

        const randomValue =	Math.floor(Math.random() * 8);

        const awards = [100, 800, 700, 600, 500, 400, 300, 200];

        setAwardItem(awards[randomValue]);
        
        rotateValue.setValue(0);

        Animated.timing(rotateValue, {
            toValue: randomValue + 32,
            duration: 3500,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
        }).start(() => {
            setIsSpinning(false);
            setShowModal(true);
            setPointsEarned(pointsEarned + awards[randomValue]);
        });

    };

    const rotate = rotateValue.interpolate({
        inputRange: [0, 32, 33, 34, 35, 36, 37, 38, 39],
        outputRange: ['0deg', '1440deg', '1485deg', '1530deg', '1575deg', '1620deg', '1665deg', '1710deg','1755deg'],
    });

    const handleCloseGame = () => {
      if (attemps == 0) {
        setAttemps(5);
        setPointsEarned(0);
        rotateValue.setValue(0);
      }
      setShowModal(false);
    };

    const modalGame = () => (
      <Center>
        <Modal isOpen={showModal} onClose={handleCloseGame}>
          <Modal.Content maxWidth="400px" borderRadius="2xl">
            <Modal.CloseButton _icon={{color: "#fff"}}/>
              <ImageBackground source={require('./assets/img/modalsheet.png')} resizeMode='cover'>
              <Modal.Body>
                <Center>
                  {attemps == 0 ? (
                    <Image source={require('./assets/img/gift.png')} alt="premio" w={240} resizeMode='contain'/>
                  ) : (
                    <Image source={require('./assets/img/illustration.png')} alt="premio" w={240} resizeMode='contain'/>
                  )}
                </Center>
                <View pb="4">
                {attemps == 0 ? (
                  <>
                    <Text color="white" textAlign="center" fontWeight="bold" fontSize="xl">FELICIDADES GANÓ</Text>
                    <Text color="white" textAlign="center" fontWeight="bold" fontSize="2xl">$ {pointsEarned}</Text>
                  </>
                ) : (
                  <>
                    <Text color="white" textAlign="center" fontWeight="bold" fontSize="xl">PREMIO</Text>
                    <Text color="white" textAlign="center" fontWeight="bold" fontSize="2xl">$ {awardItem}</Text>
                  </>
                )}  
                </View>
                {attemps == 0 ? (
                  <Button onPress={handleCloseGame} colorScheme="orange" borderRadius="full"  _text={{fontSize: 16}} py="3" px="6">Volver jugar</Button>
                ) : (
                  <Button onPress={handleCloseGame} colorScheme="success" borderRadius="full"  _text={{fontSize: 16}} py="3" px="6">Recibir mi premio</Button>
                )}
              </Modal.Body>
            </ImageBackground>
          </Modal.Content>
        </Modal>
      </Center>
    )

    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle={'light-content'} backgroundColor="black"/>
        <View style={styles.sectionContainer}>
          <View style={styles.heading}>
            <View style={{position: 'absolute', zIndex: 20}}>
              <VStack py="5">
                <Text color="white" textAlign="center" fontWeight="bold" fontSize="2xl">Gira la ruleta</Text>
                <Text color="white" textAlign="center" fontWeight="regular" fontSize="md">Te quedan {attemps} intentos.</Text>
              </VStack>
              <Button onPress={handleStartRulette} colorScheme="success" borderRadius="full" _text={{fontSize: 16}} py="3" px="6">¡Quiero probar suerte!</Button>
              <VStack py="4">
                <Text color="white" textAlign="center" fontWeight="bold" fontSize="md">Ganado: $ {pointsEarned}</Text>
              </VStack>
            </View>
          </View>
          <View style={styles.rouletteContainer}>
            <View style={styles.rouletteVector}>
              <Image source={require('./assets/img/vector.png')} resizeMode='contain' alt="arrow" w={60} h={110}/>
            </View>
            <Animated.Image
              source={require('./assets/img/ruleta.png')}
              style={[styles.image, { transform: [{ rotate }] }]}
            />
          </View>
          {modalGame()}
        </View>
      </SafeAreaView>
    );
}

export default Roulette;