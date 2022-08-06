import React from "react";
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
} from "react-native-paper";
import { Image } from "react-native-elements";
import { Feather } from "@expo/vector-icons";
import {toDateTime} from './reusableComponets'
import dynamicStyles from "./styles";

const PostCard = (props) => {
  const {
    caption,
    url,
    userName,
    userProfilePic,
    date,
    likes,
  } = props;
  const styles = dynamicStyles();
  return (
    <Card
      style={[styles.cardContainer, styles.elevation]}
    >
    
      <Card.Title
        style={styles.cardTitle}
        titleStyle={styles.cardTitleText}
        title={userName} 
        left={(props) => (
          <Avatar.Image
            size={44}
            style={styles.elevation}
            source={userProfilePic ? {uri: userProfilePic} : require("../../assets/favicon.png")}
          />
        )}
        right={(props) => (
          <IconButton {...props} icon="dots-vertical" onPress={() => {}} />
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
          <IconButton
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
          />
        </View>

        <IconButton
          {...props}
          icon="bookmark-outline"
          onPress={() => {}}
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