import React, { useEffect, useState } from "react";
import { View, Text, Image, ImageBackground } from "react-native";
import { Appbar, Colors } from "react-native-paper";
import { Ionicons, Feather } from "@expo/vector-icons";
import AllPosts from "./AllPosts";
import { fetchAllPosts, fetchUser } from "../../components/UserFunctions";
import Stories from "../reusable/Stories";

const HomeScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  useEffect(() => {
    fetchPosts();
  }, []);
  useEffect(() => {
    fetchUser("", (user) => {
      console.log("user: ", user);
      setUser(user);
    });
  }, []);
  const fetchPosts = async () => {
    setLoading(true);
    await fetchAllPosts((posts) => {
      setPosts(posts);
      setLoading(false);
    });
  };

  const stories = [
    {
      id: "1",
      name: "John",
      image: "https://i.pravatar.cc/150?img=5",
      seen: false,
    },
    {
      id: "2",
      name: "Vicky",
      image: "https://i.pravatar.cc/150?img=3",
      seen: false,
    },
    {
      id: "3",
      name: "Rich",
      image: "https://i.pravatar.cc/150?img=2",
      seen: false,
    },
    {
      id: "4",
      name: "Bret",
      image: "https://i.pravatar.cc/150?img=6",
      seen: false,
    },
    {
      id: "5",
      name: "Clementine",
      image: "https://i.pravatar.cc/150?img=19",
      seen: false,
    },
    {
      id: "6",
      name: "Vicky",
      image: "https://i.pravatar.cc/150?img=13",
      seen: false,
    },
    {
      id: "7",
      name: "Patricia",
      image: "https://i.pravatar.cc/150?img=12",
      seen: false,
    },
    {
      id: "8",
      name: "Kamren",
      image: "https://i.pravatar.cc/150?img=16",
      seen: false,
    },
    {
      id: "9",
      name: "kale",
      image: "https://i.pravatar.cc/150?img=19",
      seen: false,
    },
  ];
  return (
    <View style={{ flex: 1, backgroundColor: Colors.grey200 }}>
      <Appbar.Header
        style={{
          backgroundColor: "#fff0",
          justifyContent: "space-between",
          borderRadius: 15,
          elevation: 0,
        }}
      >
        <Appbar.Action
          icon={() => {
            return <Feather name="camera" size={24} color="black" />;
          }}
          onPress={() => navigation.navigate("StoryScreen")}
        />
        <Image
          source={require("../../assets/headTitle.png")}
          style={{ height: 25, width: 160 }}
        />
        <Appbar.Action
          icon={() => {
            return (
              <Ionicons
                name="ios-chatbox-ellipses-outline"
                size={24}
                color="black"
              />
            );
          }}
          onPress={() => navigation.navigate("ChatScreen")}
        />
      </Appbar.Header>

      <AllPosts
        header={
          <View>
            <Stories navigation={navigation} stories={stories} user={user} />
          </View>
        }
        navigation={navigation}
        posts={posts}
        fetchPosts={fetchPosts}
        user={user}
        loading={loading}
      />
    </View>
  );
};

export default HomeScreen;
