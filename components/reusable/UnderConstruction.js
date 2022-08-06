import { View, Text,Image, TouchableOpacity } from 'react-native'
import React from 'react'
import dynamicStyles from './styles'
import { Appbar} from "react-native-paper";
import { Ionicons } from '@expo/vector-icons'; 
const UnderConstruction = (props) => {
    const {screenName, backgroundColor, navigation, showHeader} = props
    const styles = dynamicStyles();
  return (
    <>
   {showHeader&& <Appbar.Header
    style={{
      backgroundColor: backgroundColor,
      justifyContent: "space-between",
      borderRadius: 15,
      elevation: 0,
    }}
  >
    <Appbar.Action
      icon={()=>{ return <Ionicons name="arrow-back-outline" size={24} color="black" />}}
      onPress={() => navigation.navigate("HomeScreen")}
    />
   
  </Appbar.Header>}
    <View style={[styles.container,{backgroundColor: backgroundColor}]}>  
    <Text style={styles.pageTitle}>{screenName}</Text>
    <Image
             source={require("../../assets/wait.png")}
             resizeMode="contain"
             style={{ height: 350, width: 350 }}
           />
    <Text style={styles.pageSubTitle}>Page under construction</Text>
 </View>
 </>
  )
}

export default UnderConstruction