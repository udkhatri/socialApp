import React from "react";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import Constants from "expo-constants";
import Navigation from "./Navigation";
import { StyleSheet, LogBox } from "react-native";
import { StatusBar } from "expo-status-bar";

console.disableYellowBox = true;
const theme = {
  ...DefaultTheme,
  roundness: 9,
  version: 3,
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    primary: "#1f1f1f",
    accent: "#84a59d",
    light: "#fff",
  },
};
export default function App() {
  return (
    <PaperProvider theme={theme}>
      <Navigation style={styles.droidSafeArea} />
      <StatusBar style="dark" />
    </PaperProvider>
  );
}
const styles = StyleSheet.create({
  droidSafeArea: {
    paddingTop: Constants.statusBarHeight,
  },
});
