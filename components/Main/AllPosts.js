import React, { useEffect } from "react";
import { View, Text, FlatList, RefreshControl } from "react-native";
import PostCard from "../reusable/PostCard";
const AllPosts = (props) => {
  const { navigation, posts, fetchPosts, loading, user, header } = props;
  return (
    <View>
      <FlatList
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        ListHeaderComponent={header && header}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={() => fetchPosts()} />
        }
        data={posts}
        renderItem={({ item, index }) => (
          <PostCard
            url={item.downloadURL}
            index={index}
            post={item}
            userId={item.userId}
            caption={item.caption}
            userName={item.postBy?.name}
            userProfilePic={item.postBy?.profilePicUrl}
            savedPost={user?.savedPost}
            date={item.creation.seconds}
            likes={item.likes}
            user={user}
            navigation={navigation}
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

export default AllPosts;
