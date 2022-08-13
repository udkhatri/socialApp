import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Alert,
  FlatList,
  useWindowDimensions,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";

import {
  Button,
  Avatar,
  Divider,
  Appbar,
  TextInput,
  IconButton,
  Caption,
  Colors,
} from "react-native-paper";
import { Text } from "react-native-elements";
import styles from "./styles";
import { setUserData } from "../../components/UserFunctions";
import * as ImagePicker from "expo-image-picker";
import firebase from "firebase/app";
require("firebase/firebase-storage");
const EditProfile = (props) => {
  const { user } = props.route.params;
  const { navigation } = props;
  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [bio, setBio] = useState(user?.bio);
  const [image, setImage] = useState(user?.profilePicUrl);
  const [imageUrl, setImageUrl] = useState(null);
  const [userName, setUserName] = useState(user?.userName);
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);

  const updateProfile = () => {
    if (name == "") {
      Alert.alert("Name is required");
      return;
    } else if (email == "") {
      Alert.alert("Email is required");
      return;
    } else {
      var userData = {
        name: name,
        email: email,
        bio: bio ? (bio.length > 0 ? bio : null) : null,
        userName: userName ? (userName.length > 0 ? userName : null) : null,
        profilePicUrl: image ? image : null,
      };
      setUserData(user.id, userData);

      navigation.goBack();
    }
  };

  useEffect(() => {
    (async () => {
      const galleryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === "granted");
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      // to add videos as well just alter this line
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.1,
    });
    if (!result.cancelled) {
      console.log(result.uri);
      uploadImage(result.uri);
    }
  };

  const uploadImage = async (uri) => {
    console.log("uploading");
    const childPath = `${user.id + Math.random().toString(36) + "dp"}`;
    console.log(childPath);

    const responce = await fetch(uri);
    const blob = await responce.blob();

    const task = firebase.storage().ref().child(childPath).put(blob);

    const taskProgress = (snapshot) => {
      console.log("progress");
      console.log(`transferred: ${snapshot.bytesTransferred}`);
    };

    const taskCompleted = () => {
      task.snapshot.ref.getDownloadURL().then((snapshot) => {
        setImage(snapshot);
        console.log(snapshot);
      });
    };

    const taskError = (snapshot) => {
      console.log(snapshot);
    };

    task.on("state_changed", taskProgress, taskError, taskCompleted);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.userRaw}>
          <Avatar.Image
            size={150}
            source={
              image
                ? { uri: image }
                : require("../../assets/defaultProfilePic.png")
            }
          />
          <IconButton
            icon="pencil"
            animated={true}
            style={styles.iconButton}
            size={22}
            onPress={pickImage}
          />
        </View>
        <Text style={styles.subHeading}>Personal Information</Text>
        <TextInput
          label="Name"
          mode="outlined"
          type="text"
          keyboardType="default"
          value={name}
          onChangeText={(text) => {
            setName(text);
            console.log(name);
          }}
          style={styles.input}
        />

        <TextInput
          label="User Name"
          value={userName}
          onChangeText={(text) => setUserName(text)}
          type="text"
          keyboardType="default"
          style={styles.input}
          mode="outlined"
        />
        <TextInput
          label="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          type="email"
          keyboardType="email-address"
          style={styles.input}
          mode="outlined"
        />
        <TextInput
          label="Bio"
          value={bio}
          multiline={true}
          onChangeText={(text) => setBio(text)}
          type="email"
          keyboardType="email-address"
          style={styles.input}
          mode="outlined"
        />
        <Button mode="contained" style={styles.button} onPress={updateProfile}>
          Update
        </Button>
      </View>
    </ScrollView>
  );
};

export default EditProfile;
