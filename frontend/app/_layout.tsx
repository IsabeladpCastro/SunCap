import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import StartScreen from "./(tabs)/start";
import Splash from "@/app/(tabs)/splash";
import App from "@/app/(tabs)";
import SignIn from "@/app/(tabs)/signin";
import SignUp from "@/app/(tabs)/signup";
import Perfil from "@/app/(tabs)/profile";
import BluetoothScreen from "@/app/(tabs)/explore";
import NotFoundScreen from "@/app/+not-found";
import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import SunLoading from "./(tabs)/first_loading_screen";

const AppStack = createStackNavigator();

const AppRoutes = () => (
      <AppStack.Navigator
    screenOptions={{
      cardStyle: {
        backgroundColor: 'white',
      },
      headerShown: false,
    }}
  >
    <AppStack.Screen name='LoadingScreen' component={SunLoading} />
    <AppStack.Screen name='SignIn' component={SignIn} />
    <AppStack.Screen name='SignUp' component={SignUp} />
    <AppStack.Screen name='Splash' component={Splash} />
    <AppStack.Screen name='Index' component={App} />
    <AppStack.Screen name='Profile' component={Perfil} />
    <AppStack.Screen name='BluetoothScreen' component={BluetoothScreen} />
    <AppStack.Screen name='not-found' component={NotFoundScreen} />
  </AppStack.Navigator>
);

export default AppRoutes;