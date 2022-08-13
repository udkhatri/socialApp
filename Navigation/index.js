import React, { useState, useEffect } from "react";

//navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//Screens
import Landing from "../components/Auth/Landing";
import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";
import ForgotPW from "../components/Auth/ForgotPW";

import MainScreen from "../components/Main";
import AddScreen from "../components/Main/Add";
import SavePost from "../components/Main/Save";
import UserPosts from "../components/Main/UserPosts";
import EditProfile from "../components/Main/EditProfile";
import OtherProfile from "../components/Main/OtherProfile";

import { auth, db } from "../firebase";
import { Text, View } from "react-native";
import { ActivityIndicator, Colors } from "react-native-paper";
import Signup from "../components/Auth/Register";

const Stack = createNativeStackNavigator();

export default function NavigationStack({ navigation }) {
  const [loaded, setLoaded] = useState(false);
  const [login, setLogin] = useState(false);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        setLogin(false);
        console.log(user + " !user");
        setLoaded(true);
      } else {
        setLoaded(true);
        setLogin(true);
      }
    });
  }, []);

  if (!loaded) {
    console.log("load: ", loaded);
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator
          animating={true}
          color={Colors.blue400}
          size="large"
        />
      </View>
    );
  } else if (!login) {
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
          <Stack.Screen
            options={{ headerLargeTitle: true }}
            name="Login"
            component={Login}
          />
          <Stack.Screen
            options={{ headerLargeTitle: true }}
            name="Signup"
            component={Signup}
          />
          <Stack.Screen
            options={{ headerLargeTitle: true }}
            name="Register"
            component={Register}
          />
          <Stack.Screen
            name="ForgotPW"
            component={ForgotPW}
            options={{
              headerShown: true,
              title: "Forgot password",
              headerLargeTitle: true,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="main"
          component={MainScreen}
          options={{
            headerShown: false,
            headerTitle: "",
          }}
        />
        <Stack.Screen
          name="Add"
          component={AddScreen}
          navigation={navigation}
        />
        <Stack.Screen
          name="SavePost"
          component={SavePost}
          navigation={navigation}
        />
        <Stack.Screen
          name="UserPosts"
          options={{
            headerTitle: "Posts",
            title: "Posts",
          }}
          component={UserPosts}
          navigation={navigation}
        />
        <Stack.Screen
          name="EditProfile"
          component={EditProfile}
          navigation={navigation}
          options={({ navigation, route }) => ({
            headerTitle: "Edit Profile",
            title: "Edit Profile",
          })}
        />
        <Stack.Screen
          name="OtherProfile"
          component={OtherProfile}
          navigation={navigation}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
