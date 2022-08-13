import React from "react";
import { View } from "react-native";
import { Button, Text, TextInput, Banner, Colors } from "react-native-paper";
import { auth } from "../../firebase";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "./styles";
export default function Login({ navigation }) {
  const [label, setLabel] = React.useState("");
  const [visible, setVisible] = React.useState(false);

  const [securedpassword, setSecuredpassword] = React.useState(true);
  const [Email, setEmail] = React.useState("");
  const [Password, setPassword] = React.useState("");
  const [color, setColor] = React.useState("#9d9d9d");
  const onSignin = () => {
    auth
      .signInWithEmailAndPassword(Email, Password)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
        setLabel(error.message);
        setVisible(true);
      });
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
          label="Email"
          style={styles.input}
          value={Email}
          onChangeText={(text) => setEmail(text)}
          type="email"
          keyboardType="email-address"
          mode="outlined"
        />

        <TextInput
          Password
          label="Password"
          style={styles.input}
          value={Password}
          onChangeText={(text) => setPassword(text)}
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

        <Button style={styles.button} mode="contained" onPress={onSignin}>
          Sign in
        </Button>
        <Button
          uppercase={false}
          style={styles.button}
          onPress={() => navigation.navigate("ForgotPW")}
        >
          Forgot password?
        </Button>
        <Button
          uppercase={false}
          style={styles.button}
          onPress={() => navigation.navigate("Signup")}
        >
          Don't have account? Signup here
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
