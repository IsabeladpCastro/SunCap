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
import SunLoading from "./(tabs)/first_loading_screen";
import SecondLoading from "./(tabs)/second_loading_screen";
import { AuthProvider } from "@/contexts/authContext";

const AppStack = createStackNavigator();

const AppRoutes = () => (
    <AuthProvider>
           <AppStack.Navigator
              screenOptions={{
                cardStyle: {
                  backgroundColor: 'white',
                },
                headerShown: false,
              }}
            >
              <AppStack.Screen name='LoadingScreen' component={SunLoading} />
              <AppStack.Screen name='SecondLoadingScreen' component={SecondLoading} />
              <AppStack.Screen name='SignIn' component={SignIn} />
              <AppStack.Screen name='SignUp' component={SignUp} />
              <AppStack.Screen name='Splash' component={Splash} />
              <AppStack.Screen name='Index' component={App} />
              <AppStack.Screen name='Profile' component={Perfil} />
              <AppStack.Screen name='BluetoothScreen' component={BluetoothScreen} />
              <AppStack.Screen name='not-found' component={NotFoundScreen} />
            </AppStack.Navigator>
    </AuthProvider>
);

export default AppRoutes;