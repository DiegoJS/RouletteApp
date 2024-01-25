import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
      backgroundColor: '#031329',
      flex: 1,
    },
    sectionContainer: {
      marginTop: 32,
      paddingHorizontal: 25,
    },
    rouletteContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
    },
    rouletteVector: {
      position: 'absolute',
      top: 0,
      zIndex: 3,
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