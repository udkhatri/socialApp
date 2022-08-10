import React,{useEffect} from "react";
import { View, Text, FlatList } from "react-native";
import PostCard from "../reusable/PostCard";
const UserPosts = (props) => {
  const { navigation, post, index , user, savedPost} = props.route.params;
  useEffect(() => {
    console.log("post are: ",post);
  }, []);
  return (
    <View>
      <FlatList
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        data={post}
        initialScrollIndex={index}
        renderItem={({ item, index }) => (
          <PostCard
            url={item.downloadURL}
            index={index}
            post={item}
            userId={item.userId}
            caption={item.caption}
            userName={item.postBy?.name}
            userProfilePic={item.postBy?.profilePicUrl}
            date={item.creation.seconds}
            likes={item.likes}
            user={user}
            savedPosts={savedPost}
          />
        )}
        ListFooterComponent={() => (
          <View style={{ height: 1000 }}>
            <Text></Text>
          </View>
        )}
        ListFooterComponentStyle={{
          height: 200,
        }}
        // initialScrollIndex={props.route.params.index}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default UserPosts;
