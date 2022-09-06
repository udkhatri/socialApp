import React from "react";
import { View, Text, Image } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import HomeScreen from "./HomeScreen";
import UnderConstruction from "../reusable/UnderConstruction";
const Tab = createMaterialTopTabNavigator();

const Feed = ({ navigation }) => {
  const ChatScreen = () => {
    return (
      <UnderConstruction
        screenName="Direct Message"
        navigation={navigation}
        showHeader={true}
        backgroundColor="#F5FCFF"
      />
    );
  };
  const StoryScreen = () => {
    return (
      <UnderConstruction
        screenName="Upload Story"
        navigation={navigation}
        showHeader={true}
        backgroundColor="#fffafb"
      />
    );
  };
  return (
    <View style={{ backgroundColor: "#fff", flex: 1 }}>
      {/* header complete */}
      <Tab.Navigator tabBar={() => {}} initialRouteName="HomeScreen">
        <Tab.Screen name="StoryScreen" component={StoryScreen} />
        <Tab.Screen name="HomeScreen" component={HomeScreen} />
        <Tab.Screen name="ChatScreen" component={ChatScreen} />
      </Tab.Navigator>
    </View>
  );
};

export default Feed;
