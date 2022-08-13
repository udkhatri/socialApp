import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Button } from "react-native-paper";
import styles from "./styles";
const Landing = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require("../../assets/welcome.png")}
          resizeMode="contain"
          style={{ height: 250 }}
        />
        <Text style={{ fontSize: 40 }}>Welcome</Text>
      </View>
      <Text style={styles.loginText}>Already have an account?</Text>
      <Button
        style={styles.button}
        mode="contained"
        onPress={() => navigation.navigate("Login")}
      >
        Log in
      </Button>
      <Text style={styles.loginText}>Or</Text>
      <Button
        style={styles.button}
        mode="contained"
        onPress={() => navigation.navigate("Signup")}
      >
        Sign up
      </Button>
    </View>
  );
};

export default Landing;
