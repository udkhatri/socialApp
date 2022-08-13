import React, { useEffect, useState } from "react";
import { View, Alert, TouchableOpacity } from "react-native";
import {
  Avatar,
  Text,
  Card,
  Title,
  IconButton,
  Paragraph,
  ActivityIndicator,
  Caption,
  Menu,
  Provider,
} from "react-native-paper";
import { Image } from "react-native-elements";
import { Feather } from "@expo/vector-icons";
import { toDateTime } from "./reusableComponets";
import { db, auth, fs } from "../../firebase";
import {
  savePost,
  removeSavedPost,
  deletePost,
  likePost,
  unlikePost,
} from "../UserFunctions";
import dynamicStyles from "./styles";

const PostCard = (props) => {
  const {
    caption,
    url,
    userName,
    userProfilePic,
    date,
    userId,
    likes,
    post,
    user,
    savedPosts,
    navigation,
  } = props;
  const styles = dynamicStyles();
  const [savedPost, setSavedPost] = useState(false);
  const [isLiked, setLiked] = useState(false);
  const [visible, setVisible] = useState(false);
  const [totalLikes, setTotalLikes] = useState(0);
  const [menuAnchor, setMenuAnchor] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (post.likes) {
      post.likes.includes(auth.currentUser.uid)
        ? setLiked(true)
        : setLiked(false);
    }
    setTotalLikes(post.likes?.length);
    if (savedPosts) {
      if (savedPosts.includes(post.id)) {
        setSavedPost(true);
      } else {
        setSavedPost(false);
      }
    }
  }, []);
  const onIconPress = (event) => {
    const { nativeEvent } = event;
    const anchor = {
      x: nativeEvent.pageX,
      y: nativeEvent.pageY,
    };

    setMenuAnchor(anchor);
    openMenu();
  };
  const openMenu = () => {
    setVisible(true);
  };
  const closeMenu = () => {
    setVisible(false);
  };
  return (
    <Card style={[styles.cardContainer, styles.elevation]}>
      <Menu visible={visible} onDismiss={closeMenu} anchor={menuAnchor}>
        <Menu.Item
          onPress={() => {
            Alert.alert("Delete", "Are you sure to want to delete this post?", [
              {
                text: "No",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel",
              },
              {
                text: "Yes",
                onPress: () => {
                  deletePost(post.id);
                },
              },
            ]);
            setVisible(false);
          }}
          title="Delete"
        />
      </Menu>
      <Card.Title
        style={styles.cardTitle}
        titleStyle={styles.cardTitleText}
        title={userName}
        left={(props) => (
          <TouchableOpacity
            onPress={() => {
              auth.currentUser.uid == userId
                ? navigation.navigate("Profile")
                : navigation.navigate("OtherProfile", {
                    user: user,
                  });
            }}
          >
            <Avatar.Image
              size={44}
              style={styles.elevation}
              source={
                userProfilePic
                  ? { uri: userProfilePic }
                  : require("../../assets/defaultProfilePic.png")
              }
            />
          </TouchableOpacity>
        )}
        right={(props) =>
          auth.currentUser.uid == userId && (
            <IconButton {...props} icon="dots-vertical" onPress={onIconPress} />
          )
        }
      />
      <View style={styles.cardView}>
        {url ? (
          <Card.Cover
            source={{
              uri: url,
            }}
            style={styles.cardCover}
          />
        ) : (
          <Image
            style={styles.cardContainerDefauld}
            PlaceholderContent={<ActivityIndicator size="large" />}
          />
        )}
      </View>

      <Card.Actions style={styles.cardActionContainer}>
        <View style={{ flexDirection: "row" }}>
          <IconButton
            {...props}
            icon={isLiked ? "heart" : "heart-outline"}
            onPress={() => {
              isLiked
                ? (unlikePost(post.id),
                  totalLikes > 0
                    ? setTotalLikes(totalLikes - 1)
                    : setTotalLikes(0))
                : (likePost(post.id), setTotalLikes(totalLikes + 1));
              setLiked(!isLiked);
            }}
            style={[styles.cardActionButton, styles.elevation]}
          />
          {/* Will implement this features in future */}
          {/* <IconButton
            {...props}
            icon="message-outline"
            onPress={() => {}}
            style={[styles.cardActionButton, styles.elevation]}
          />
         <IconButton
            {...props}
            icon={({ color }) => (
              <Feather name="send" size={22} color={color} />
            )}
            onPress={() => {}}
            style={[styles.cardActionButton, styles.elevation]}
          /> */}
        </View>

        <IconButton
          {...props}
          icon={savedPost ? "bookmark" : "bookmark-outline"}
          onPress={() => {
            savedPost ? removeSavedPost(post.id) : savePost(post.id);
            setSavedPost(!savedPost);
          }}
          style={[styles.cardActionButton, styles.elevation]}
        />
      </Card.Actions>
      <Card.Content style={styles.cardContent}>
        <Title>
          <Text style={{ fontWeight: "bold" }}>{totalLikes}</Text> Likes
        </Title>
        {caption?.length > 0 && <Paragraph>{caption}</Paragraph>}
        <Caption style={styles.timeStyle}>{toDateTime(date)}</Caption>
      </Card.Content>
    </Card>
  );
};

export default PostCard;
