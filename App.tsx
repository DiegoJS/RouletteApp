/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { NativeBaseProvider, extendTheme } from "native-base";
import Roulette from './src/index';

const theme = extendTheme({
  fontConfig: {
    Poppins: {
      100: {
        normal: "Poppins-Light",
        italic: "Poppins-LightItalic",
      },
      200: {
        normal: "Poppins-Light",
        italic: "Poppins-LightItalic",
      },
      300: {
        normal: "Poppins-Light",
        italic: "Poppins-LightItalic",
      },
      400: {
        normal: "Poppins-Regular",
        italic: "Poppins-Italic",
      },
      500: {
        normal: "Poppins-Medium",
      },
      600: {
        normal: "Poppins-Medium",
        italic: "Poppins-MediumItalic",
      },
      // Add more variants
      700: {
        normal: 'Poppins-Bold',
      },
      800: {
        normal: 'Poppins-Black',
        italic: 'Poppins-BlackItalic',
      },
      900: {
        normal: 'Poppins-Black',
        italic: 'Poppins-BlackItalic',
      },
    },
  },
  fonts: {
    heading: "Poppins",
    body: "Poppins",
    mono: "Poppins",
  },
});

function App(): JSX.Element {
  return (
    <NativeBaseProvider theme={theme}>
      <Roulette />
    </NativeBaseProvider>
  );
}

export default App;
