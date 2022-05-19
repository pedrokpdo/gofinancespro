import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ThemeProvider } from 'styled-components';
import theme from './src/global/styles/theme'
import {useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_700Bold } from '@expo-google-fonts/poppins'
import { Register } from './src/screens/Register';
import AppLoading from 'expo-app-loading'

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold
  })
  if(!fontsLoaded) {
    return <AppLoading/>
  }
  return (
    <ThemeProvider theme={theme}>
      <Register/>
    </ThemeProvider>
  );
}

