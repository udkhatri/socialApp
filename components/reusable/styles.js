import { StyleSheet } from "react-native";
import { useWindowDimensions } from "react-native";

export const iosShadow = {};
export const androidShadow = {
  elevation: 5,
};
const dynamicStyles = () => {
  return StyleSheet.create({
    elevation:{
        elevation: 5,
        shadowOffset: {
          width: 0,
          height:2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    cardContainer: {
      borderRadius: 15,
      backgroundColor: "#ffffff",
      margin: 5,
    },
    cardTitle: { marginVertical: -5, backgroundcolor: "white" },
    cardTextTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 0 },
    cardCover: {
      height: useWindowDimensions().width + 160,
      aspectRatio: 4/6,
      width: "100%",
      top:0,
      justifyContent: "space-around",
      borderRadius: 15,
    },
    cardView: { alignItems: "center", justifyContent: "center" },
    cardContainerDefauld: {
      height: useWindowDimensions().width,
      width: useWindowDimensions().width - 20,
      justifyContent: "space-around",
      borderRadius: 15,
    },
    cardActionContainer: {
      justifyContent: "space-between",
      paddingHorizontal: 15,
    },
    cardActionButton: {
    //   elevation: 5,
      backgroundColor: "white",
    //   shadowColor: "#000",
    //   shadowOffset: {
    //     width: 2,
    //     height: -4,
    //   },
    //   shadowOpacity: 0.5,
    //   shadowRadius: 6,
    },
    cardContent:{ marginVertical: -10, marginBottom: -10 },
    timeStyle:{
        fontSize: 13,
        paddingLeft:5,
        fontWeight: "bold",
    }
  });
};
export default dynamicStyles;
