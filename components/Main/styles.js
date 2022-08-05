import { StyleSheet } from "react-native";
import Constants from "expo-constants";
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#fff',
    },
    button: {
      marginVertical: 10,
      paddingVertical: 5,
      color: "#fff",
      tintColor: "#fff",
    },
    boldText:{
        fontWeight: 'bold',
        fontSize: 18,
    },
    contentContainer:{
        paddingHorizontal:20
    },
    caption:{
        color: '#5f5f5f',
      },
    droidSafeArea: {
        paddingTop: Constants.statusBarHeight,
      },
      topContainer: {
        backgroundColor: "transparent",
        paddingTop: "30%",
      },
      userRaw: {
        justifyContent: "center",
        alignItems: "flex-end",
        flexDirection: "row",
        paddingTop: 10,
        marginBottom: 10,
      },
      userDataContaienr:{
        flexDirection: "row",
        flex: 1,
        alignItems: "center",
        justifyContent: "space-around",
      },
      userNameRaw: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginHorizontal: 20,
        marginBottom: 10,
        alignItems: "center",
      },
      editProfile: {
        marginHorizontal: 10,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
      },
      images: {
        flex: 1,
        marginLeft: 10,
        // width: useWindowDimensions().width / 3,
      },
      centerContent: { 
        justifyContent: "center", alignItems: "center", flex: 1 
      },
      iconButton: {
        backgroundColor: "white",
        elevation: 10,
        borderColor: "black",
        borderWidth: 0.5,
        marginLeft: -40,
      },
      subHeading:{
        fontSize: 20,
        marginVertical: 10,
      },
      input:{
        marginVertical: 10,
      },
      shadowProp: {
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
      },
})

export default styles;