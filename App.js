import React from "react";
import {
  DefaultTheme,
  Provider as PaperProvider,
} from "react-native-paper";
import Constants from "expo-constants";
import Navigation from "./Navigation";
import { StyleSheet, LogBox } from "react-native";
const theme = {
  ...DefaultTheme,
  roundness: 9,
  colors: {
    ...DefaultTheme.colors,
    primary: "#1f1f1f",
    accent: "#f1c40f",
    light: "#fff",
  },
};
export default function App() {
  return (
    <PaperProvider theme={theme}>
      <Navigation style={styles.droidSafeArea} />
    </PaperProvider>
   
  );
}
const styles = StyleSheet.create({
  droidSafeArea: {
    paddingTop: Constants.statusBarHeight,
  },
});
