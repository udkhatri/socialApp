import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Alert,
  FlatList,
  useWindowDimensions,
  TouchableOpacity,
  RefreshControl,
  Image,
} from "react-native";

import {
  Button,
  Avatar,
  Divider,
  Appbar,
  ActivityIndicator,
  IconButton,
  Caption,
} from "react-native-paper";
import { Text } from "react-native-elements";

import { auth, db, fs } from "../../firebase";
import { fetchUserById, fetchUserPosts, fetchUser } from "../UserFunctions";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import styles from "./styles";

const Tab = createMaterialTopTabNavigator();

const OtherProfile = (props) => {
  const { user } = props.route.params;

  const width = useWindowDimensions().width;
  const [post, setpost] = useState([]);
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState([]);
  useEffect(() => {
    fetchUserById(user.id, (user) => {
      console.log("user: ", user);
      props.navigation.setOptions({ title: user?.name });
      setUserData(user);
    });
    fetchUser("", (user) => {
      setCurrentUser(user);
    });

    fetchPosts(user.id);
  }, []);

  const fetchPosts = (userId) => {
    setLoading(true);
    fetchUserPosts(userId, (posts) => {
      console.log("posts are: ", posts);
      setpost(posts);
      setLoading(false);
    });
  };
  const renderItem = ({ item, index }) => {
    // <Text>{item.id} hello boys</Text>
    return (
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate("UserPosts", {
            post,
            index,
            userData,
            savedPost: currentUser?.savedPost,
          });
        }}
      >
        <Image
          PlaceholderContent={
            <ActivityIndicator animating={true} color={"gray"} size="small" />
          }
          source={{
            uri: item.downloadURL,
          }}
          style={{
            flex: 1,
            marginRight: 1.5,
            marginBottom: 1.5,
            width: width / 3,
            height: width / 3,
          }}
        />
      </TouchableOpacity>
    );
  };
  const PostsScreen = () => {
    return (
      <FlatList
        style={{ paddingTop: 2 }}
        numColumns={3}
        horizontal={false}
        data={post}
        ListEmptyComponent={() => {
          return (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                flex: 1,
                height: 400,
              }}
            >
              <Caption>{`${userData?.name} has not yet posted anything. `}</Caption>
            </View>
          );
        }}
        refreshControl={
          <RefreshControl
            onRefresh={() => fetchPosts(user.id)}
            refreshing={loading}
          />
        }
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.userRaw}>
          <Avatar.Image
            style={{ elevation: 10 }}
            size={100}
            source={
              userData?.profilePicUrl
                ? { uri: userData?.profilePicUrl }
                : require("../../assets/defaultProfilePic.png")
            }
          />
          <View style={{ flex: 1 }}>
            <View style={styles.userDataContaienr}>
              <View style={{ alignItems: "center" }}>
                <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                  {post?.length}
                </Text>
                <Caption style={{ marginTop: -5 }}>Posts</Caption>
              </View>
              <View style={{ alignItems: "center" }}>
                <Text style={{ fontWeight: "bold", fontSize: 18 }}>245</Text>
                <Caption style={{ marginTop: -5 }}>Followers</Caption>
              </View>
              <View style={{ alignItems: "center" }}>
                <Text style={{ fontWeight: "bold", fontSize: 18 }}>245</Text>
                <Caption style={{ marginTop: -5 }}>Following</Caption>
              </View>
            </View>
          </View>
        </View>
        {userData?.name && userData?.name != "" && (
          <Text style={styles.boldText}>{userData?.name}</Text>
        )}
        {userData?.bio && userData?.bio != "" && (
          <Caption style={styles.caption}>{userData?.bio}</Caption>
        )}
      </View>

      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: "#84a59d",
          tabBarInactiveTintColor: "gray",
          tabBarShowLabel: false,
          tabBarShowIcon: true,
          tabBarIndicatorStyle: {
            height: 2,
            backgroundColor: "#84a59d",
          },
        }}
      >
        <Tab.Screen
          name="Posts"
          options={{
            tabBarIcon: ({ color, size, focused }) => (
              <MaterialIcons name="grid-on" size={24} color={color} />
            ),
          }}
          component={PostsScreen}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default OtherProfile;
