//react redux
import { Image } from "react-native";
import React from "react";
//screens
import HomeScreen from "./Main/Feed";
import profileScreen from "./Main/Profile";
import searchScreen from "./Main/Search";
import notifiationScreen from "./Main/Notification";

//bottom tab navigation
import {
  createBottomTabNavigator,
  createStackNavigator,
} from "@react-navigation/bottom-tabs";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { Colors } from "react-native-paper";

const Tab = createBottomTabNavigator();
const EmptyScreen = () => {
  return null;
};

const Main = () => {
  return (
    <Tab.Navigator
      shifting={true}
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 20,
          left: 20,
          right: 20,
          elevation: 2,
          shadowColor: "#171717",
          shadowOffset: { width: -2, height: 4 },
          shadowOpacity: 0.2,
          shadowRadius: 3,
          backgroundColor: Colors.white,
          paddingBottom: -8,
          height: 70,
          borderRadius: 35,
        },
        headerShown: false,
        tabBarIcon: ({ focused, color, size, el, activeColor }) => {
          let iconName;
          //let size;
          if (route.name === "Home") {
            iconName = focused ? "home" : "ios-home-outline";
            size = focused ? 30 : 28;
            color = "#a2d2ff";
          } else if (route.name === "Profile") {
            iconName = focused ? "ios-person" : "ios-person-outline";
            size = focused ? 30 : 28;
            color = "#84a59d";
          } else if (route.name === "Notification") {
            iconName = focused ? "heart-sharp" : "heart-outline";
            size = focused ? 32 : 30;
            color = "#ffb5a7";
          } else if (route.name === "Search") {
            iconName = focused ? "md-search" : "md-search-outline";
            size = focused ? 30 : 28;
            color = "#9a8c98";
          }

          return (
            <Ionicons
              name={iconName}
              size={size}
              color={color}
              style={{
                // borderRadius: 50,
                borderBottomWidth: 2,
                borderBottomColor: focused ? color : "#fff",
                padding: 10,
                elevation: el,
                shadowOffset: {
                  height: 0,
                  width: 0,
                },
              }}
            />
          );
        },
      })}
    >
      <Tab.Screen
        name="Home"
        options={{ title: "instagram" }}
        component={HomeScreen}
      />
      <Tab.Screen name="Search" component={searchScreen} />
      {/* to redirect to different screen on pressing add button */}
      <Tab.Screen
        name="AddContainer"
        component={EmptyScreen}
        listeners={({ navigation }) => ({
          tabPress: (event) => {
            event.preventDefault();
            navigation.navigate("Add");
          },
        })}
        options={{
          tabBarIcon: () => (
            <Image
              source={require("../assets/plus3Dg.png")}
              resizeMode="contain"
              style={{ height: 120, width: 120 }}
            />
          ),
        }}
      />
      <Tab.Screen name="Notification" component={notifiationScreen} />
      <Tab.Screen name="Profile" component={profileScreen} />
    </Tab.Navigator>
  );
};

export default Main;
