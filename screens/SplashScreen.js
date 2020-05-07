import React from "react";
import {
  View,
  Text,
  Button,
  Dimensions,
  StyleSheet,
  Image,
} from "react-native";
import * as Animatable from "react-native-animatable";
const logo = require("../assets/rideslogo.png");
const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Animatable.Image
          source={logo}
          style={styles.logo}
          resizeMode="stretch"
          animation="fadeInLeftBig"
          duration={1000}
        />
      </View>
      {/* <View style={styles.footer}>
        <Text>Footer</Text>
      </View> */}
    </View>
  );
};
export default SplashScreen;

const { height } = Dimensions.get("screen");
const logo_height = height * 0.2;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#151515",
  },
  header: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: logo_height,
    height: logo_height,
  },
});
