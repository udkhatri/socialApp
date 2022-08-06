import React, { useEffect,useState } from "react";
import { View, Text, Image, ImageBackground } from "react-native";
import { Appbar} from "react-native-paper";
import { Ionicons,Feather } from '@expo/vector-icons'; 
import AllPosts from "./AllPosts";
import {fetchAllPosts} from '../../components/UserFunctions'

const HomeScreen = ({ navigation }) => {

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    await fetchAllPosts((posts) => {
      setPosts(posts);
      setLoading(false);
    });
   
  }
  return (
    <ImageBackground
      source={require("../../assets/backface.jpg")}
      style={{ flex: 1, resizeMode: "cover", justifyContent: "center" }}
    >
      <View style={{ flex: 1 }}>
        <Appbar.Header
          style={{
            backgroundColor: "#fff0",
            justifyContent: "space-between",
            borderRadius: 15,
            elevation: 0,
          }}
        >
          <Appbar.Action
            icon={()=>{ return <Feather name="camera" size={24} color="black" />}}
            onPress={() => navigation.navigate("StoryScreen")}
          />
          <Image
            source={require("../../assets/insta.png")}
            style={{ height: 39, width: 120 }}
          />
          <Appbar.Action
            icon={() =>{ return <Ionicons name="ios-chatbox-ellipses-outline" size={24} color="black" />}}
            onPress={() => navigation.navigate("ChatScreen")}
          />
        </Appbar.Header>
        <AllPosts navigation={navigation} posts={posts} fetchPosts={fetchPosts} loading={loading}/>
      </View>
    </ImageBackground>
  );
};

export default HomeScreen;
