import { View, TouchableOpacity, Image, Text, FlatList } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import React from "react";
import { Colors, IconButton } from "react-native-paper";
import dynamicStyles from "./styles";

const Stories = (props) => {
  const { stories, user } = props;
  const styles = dynamicStyles();
  const renderItem = ({ item }) => {
    return (
      <View>
        <TouchableOpacity>
          <LinearGradient
            colors={["#DE0046", "#F7A34B"]}
            style={styles.storyAvatarBG}
          >
            <Image
              source={{ uri: item.image }}
              style={[
                styles.storyAvatar,
                { borderColor: "white", borderWidth: 2 },
              ]}
            />
          </LinearGradient>
        </TouchableOpacity>
        <Text
          style={{
            marginTop: 5,
            textAlign: "center",
          }}
        >
          {item.name}
        </Text>
      </View>
    );
  };
  const headerComponent = () => {
    return (
      <View>
        <TouchableOpacity>
          <LinearGradient
            colors={["#fffff", "#fffff"]}
            style={styles.storyAvatarBG}
          >
            <Image
              source={{ uri: user.profilePicUrl }}
              style={styles.storyAvatar}
            />
          </LinearGradient>
          <IconButton
            {...props}
            style={styles.storyPlusIcon}
            size={15}
            color={Colors.white}
            icon="plus"
          />
        </TouchableOpacity>
        <Text
          style={{
            marginTop: 5,
            textAlign: "center",
          }}
        >
          Your story
        </Text>
      </View>
    );
  };
  return (
    <View>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={stories}
        ListHeaderComponent={headerComponent}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default Stories;
