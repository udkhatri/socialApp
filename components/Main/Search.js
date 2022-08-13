import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  useWindowDimensions,
} from "react-native";
import {
  Appbar,
  Card,
  Avatar,
  IconButton,
  Caption,
  Colors,
} from "react-native-paper";
import { SearchBar } from "react-native-elements";
import styles from "./styles";
import { db, fs, auth } from "../../firebase";
const Search = (props) => {
  const [user, setUser] = useState([]);
  const [userName, setUserName] = useState("");
  const fetchUser = async (search) => {
    search == ""
      ? setUser([])
      : await db
          .collection("users")
          .where("name", "==", search)
          .get()
          .then((snapshot) => {
            let users = [];
            snapshot.forEach((doc) => {
              const data = doc.data();
              //console.log(data.downloadURL);
              const id = doc.id;
              users.push({ id, ...data });
            });
            setUser(users);
          });
  };

  return (
    <View>
      <Appbar.Header style={{ backgroundColor: "#9a8c98" }}>
        <View
          style={{
            flex: 1,
          }}
        >
          <SearchBar
            round={true}
            containerStyle={styles.searchBarStyle}
            inputContainerStyle={styles.searchBarInput}
            //loadingProps={<ActivityIndicator />}
            inputStyle={{ color: "black" }}
            placeholder="Type Here..."
            onChangeText={(text) => {
              fetchUser(text);
              setUserName(text);
            }}
            value={userName}
          />
        </View>
      </Appbar.Header>
      <View
        style={{
          height: useWindowDimensions().height,
          backgroundColor: "#fff",
        }}
      >
        {user.length > 0 ? (
          <FlatList
            style={{ paddingTop: 5, backgroundColor: "#fff" }}
            numColumns={1}
            horizontal={false}
            data={user}
            extraData={user}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                style={[styles.userItem]}
                onPress={() => {
                  auth.currentUser.uid == item.id
                    ? props.navigation.navigate("Profile")
                    : props.navigation.navigate("OtherProfile", {
                        user: item,
                      });
                }}
              >
                <Card.Title
                  style={{ marginVertical: -5, backgroundcolor: "white" }}
                  titleStyle={{
                    fontSize: 15,
                    marginBottom: 0,
                    marginTop: -5,
                  }}
                  subtitle={<Caption>{item.email}</Caption>}
                  subtitleStyle={{ marginTop: -10 }}
                  title={item.name} //pass username from inharited page
                  left={(props) => (
                    <Avatar.Image
                      size={50}
                      source={
                        item.profilePicUrl
                          ? { uri: item.profilePicUrl }
                          : require("../../assets/defaultProfilePic.png")
                      }
                    />
                  )}
                  right={(props) => (
                    <IconButton
                      {...props}
                      color={Colors.grey500}
                      icon="chevron-right"
                    />
                  )}
                />
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id}
          />
        ) : (
          <View style={[styles.centerContent, { flex: 0.6 }]}>
            <Text style={styles.pageSubTitle}>Search for users</Text>
            <Image
              style={{ height: 200, width: 300 }}
              source={require("../../assets/search.png")}
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default Search;
