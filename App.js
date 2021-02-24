import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper'
import Home from './screens/Home';
import Product from './screens/Product';
import Barcode from './screens/Barcode';
import axios from 'axios';

const Stack = createStackNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#4caf50",
    primaryDark: "#388e3c"
  }
}

axios.defaults.baseURL = "http://186.225.45.254:8082/webmin"

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <StatusBar style="light" backgroundColor={theme.colors.primaryDark} />
        <Stack.Navigator screenOptions={{
          headerStyle: {
            backgroundColor: theme.colors.primary
          },
          headerTintColor: "white"
        }}>
          <Stack.Screen options={{
            headerShown: false
          }} name="Home" component={Home} />
          <Stack.Screen options={{
            title:"CÓDIGO DE BARRAS"
          }} name="Barcode" component={Barcode} />
          <Stack.Screen options={{
            title: "CADASTRAR PRODUTO"
          }} name="Product" component={Product} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
