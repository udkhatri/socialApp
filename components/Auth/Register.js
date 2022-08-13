import React, { useEffect } from "react";
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Image,
  Alert,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  Button,
  Text,
  TextInput,
  Snackbar,
  Banner,
  Colors,
} from "react-native-paper";
import { auth, db } from "../../firebase";
import styles from "./styles";

export default function Signup({ navigation }) {
  const [Name, setName] = React.useState("");
  const [securedpassword, setSecuredpassword] = React.useState(true);
  const [Email, setEmail] = React.useState("");
  const [Password, setPassword] = React.useState("");
  const [color, setColor] = React.useState("#9d9d9d");

  //SnackBar manage
  const [label, setLabel] = React.useState("");
  const [visible, setVisible] = React.useState(false);

  const onSignUp = () => {
    if (Name == "" || Email == "" || Password == "") {
      setLabel("Please fill all the fields");
      setVisible(true);
    } else {
      console.log("signup");
      auth
        .createUserWithEmailAndPassword(Email, Password)
        .then((result) => {
          auth.currentUser.sendEmailVerification();
          console.log("New user is: ", auth.currentUser.uid);
          db.collection("users")
            .doc(auth.currentUser.uid)
            .set({
              name: Name,
              email: Email,
              id: auth.currentUser.uid,
              profilePicUrl: null,
              userName: "",
            })
            .then(() => {
              console.log("Document successfully written!");
            })
            .catch((error) => {
              console.log("Error writing document: ", error);
            });
        })
        .catch((error) => {
          console.log(error);
          setLabel(error.message);
          setVisible(true);
        });
    }
  };

  const eyeColor = () => {
    if (!securedpassword) {
      setColor("#9d9d9d");
    } else {
      setColor("#3d3d3d");
    }
  };
  return (
    <View style={{ backgroundColor: "#fff", flex: 1 }}>
      <KeyboardAwareScrollView
        resetScrollToCoords={{ x: 30, y: 0 }}
        contentContainerStyle={styles.authContainer}
        scrollEnabled={true}
      >
        <TextInput
          label="Name"
          value={Name}
          onChangeText={(text) => setName(text)}
          style={styles.input}
          mode="outlined"
        />

        <TextInput
          label="Email"
          value={Email}
          onChangeText={(text) => setEmail(text)}
          type="email"
          keyboardType="email-address"
          style={styles.input}
          mode="outlined"
        />

        <TextInput
          Password
          label="Password"
          value={Password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          mode="outlined"
          secureTextEntry={securedpassword}
          right={
            <TextInput.Icon
              icon={"eye"}
              size={30}
              color={color}
              onPress={() => {
                setSecuredpassword(!securedpassword);
                eyeColor();
              }}
            />
          }
        />

        <Button style={styles.button} mode="contained" onPress={onSignUp}>
          Sign up
        </Button>
        <Button
          uppercase={false}
          style={styles.button}
          onPress={() => navigation.navigate("Login")}
        >
          already have an account? Login here
        </Button>
        <Banner
          visible={visible}
          actions={[
            {
              label: "Ok",
              onPress: () => setVisible(false),
            },
          ]}
          contentStyle={{
            backgroundColor: Colors.red100,
            borderRadius: 9,
          }}
          style={{
            margin: 10,
            borderRadius: 9,
            marginBottom: 20,
          }}
        >
          <Text style={{ fontSize: 15, color: "#000" }}>{label}</Text>
        </Banner>
      </KeyboardAwareScrollView>
    </View>
  );
}
