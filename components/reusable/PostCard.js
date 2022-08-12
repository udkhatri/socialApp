import React,{useEffect, useState} from "react";
import { View, Platform } from "react-native";
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
  Provider
} from "react-native-paper";
import { Image } from "react-native-elements";
import { Feather } from "@expo/vector-icons";
import {toDateTime} from './reusableComponets'
import { db, auth, fs} from "../../firebase";
import {savePost,removeSavedPost,deletePost} from '../UserFunctions'
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
    savedPosts
  } = props;
  const styles = dynamicStyles();
const [savedPost, setSavedPost] = useState(false)
const [visible, setVisible] = useState(false)
const [menuAnchor, setMenuAnchor] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (savedPosts) {
      if (savedPosts.includes(post.id)) {
        setSavedPost(true);
      }
      else{
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
  }
  const openMenu = () => {
    setVisible(true);
  }
  const closeMenu = () => {
    setVisible(false);
  }
  return (
    <Card
      style={[styles.cardContainer, styles.elevation]}
    >
     <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={menuAnchor}
      >
        <Menu.Item onPress={() => {
          setVisible(false);
          deletePost(post.id);
        }} title="Delete" />
      </Menu>
      <Card.Title
        style={styles.cardTitle}
        titleStyle={styles.cardTitleText}
        title={userName} 
        left={(props) => (
          <Avatar.Image
            size={44}
            style={styles.elevation}
            source={userProfilePic ? {uri: userProfilePic} : require("../../assets/defaultProfilePic.png")}
          />
        )}
        right={(props) => (
          auth.currentUser.uid == userId && <IconButton {...props} icon="dots-vertical" onPress={onIconPress} />
        )}
       
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

      <Card.Actions
        style={styles.cardActionContainer}
      >
        <View style={{ flexDirection: "row" }}>
          <IconButton
            {...props}
            icon="heart-outline"
            onPress={() => {}}
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
          icon= {savedPost ? "bookmark" :"bookmark-outline"}
          onPress={() => {
            savedPost ? (removeSavedPost(post.id)):(savePost(post.id))
            setSavedPost(!savedPost)
            }}
          style={[styles.cardActionButton, styles.elevation]}
        />
      </Card.Actions>
      <Card.Content style={styles.cardContent}>
        <Title>
          <Text style={{ fontWeight: "bold" }}>{likes}</Text> Likes
        </Title>
        {caption?.length > 0 && <Paragraph>{caption}</Paragraph>}
        <Caption style={styles.timeStyle}>{toDateTime(date)}</Caption>
      </Card.Content>
    </Card>
  );
};

export default PostCard;
