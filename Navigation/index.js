import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";

//navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//Screens
import Landing from "../components/Auth/Landing";
import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";
import ForgotPW from "../components/Auth/ForgotPW";
const Stack = createNativeStackNavigator();
export default function NavigationStack() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Landing"
            component={Landing}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen options={{headerLargeTitle: true}} name="Login" component={Login} />
          <Stack.Screen options={{headerLargeTitle: true}}  name="Sign Up" component={Register} />
          <Stack.Screen 
            name="ForgotPW"
            component={ForgotPW}
            options={{ headerShown: true, title: "Forgot password" ,headerLargeTitle: true}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }