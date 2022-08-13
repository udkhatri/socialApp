import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 9,
    width: "90%",
    bottom: 100,
    position: "absolute",
    alignSelf: "center",
  },
  button: {
    marginVertical: 10,
    paddingVertical: 5,
  },
  input: {
    marginTop: 10,
  },
  logoContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    bottom: 100,
  },
  deviderContainer: {
    flexDirection: "row",
  },
  loginText: {
    fontWeight: "bold",
    marginTop: 10,
    textAlign: "center",
  },
  authContainer: {
    marginHorizontal: 12,
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: 50,
  },
});
export default styles;
