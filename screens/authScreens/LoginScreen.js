import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { loginValidator } from "../../validators/loginValidator";
import success_anim from "../../assets/success_anim.json";
import LottieView from "lottie-react-native";
import axios from "axios";
import {
  View,
  KeyboardAvoidingView,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
  StatusBar,
  TextInput,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
const LoginScreen = ({ navigation }) => {
  const { signIn } = useContext(AuthContext);
  const [loginDetails, setLoginDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  useEffect(() => {
    setLoginDetails({
      username: "",
      password: "",
    });
  }, []);

  const onChangeUsername = (text) => {
    setLoginDetails({ ...loginDetails, username: text });
  };
  const onChangePassword = (text) => {
    setLoginDetails({ ...loginDetails, password: text });
  };
  const onPressSignin = async () => {
    const { error } = loginValidator.validate(loginDetails);
    if (error) {
      console.log(error.details[0].message);
      setError(error.details[0].message);
    } else {
      console.log("yes");
      try {
        setError("");
        setLoading(true);
        const { data } = await axios.post(
          "http://192.168.1.76:5000/login",
          loginDetails
        );
        setLoading(false);
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          signIn(data.token);
          console.log(data.token);
        }, 500);
      } catch (error) {
        setLoading(false);
        setError(error.response.data);
        // console.log(error.response);
      }
    }
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
        keyboardVerticalOffset={Platform.OS === "android" && -500}
      >
        <StatusBar barStyle="light-content"></StatusBar>
        <View style={styles.header}>
          <Text style={styles.text_header}>Sign in to continue</Text>
        </View>
        <View style={styles.footer}>
          <View style={styles.action}>
            <FontAwesome name="user-o" color="#05375a" size={25} />
            <TextInput
              style={styles.textInput}
              placeholder="username"
              keyboardType="email-address"
              onChangeText={(text) => onChangeUsername(text)}
              defaultValue={loginDetails.username}
            />
          </View>
          <View style={[styles.action, { marginTop: 25 }]}>
            <FontAwesome name="lock" color="#05375a" size={25} />
            <TextInput
              style={styles.textInput}
              placeholder="password"
              secureTextEntry={true}
              onChangeText={(text) => onChangePassword(text)}
              defaultValue={loginDetails.password}
            />
          </View>
          {error ? (
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Text style={styles.error}>{error}</Text>
            </View>
          ) : null}
          {loading && (
            <ActivityIndicator
              size="small"
              color="#0000ff"
              style={{ marginTop: 5 }}
            />
          )}
          {success && (
            <View style={{ alignItems: "center", margin: 0 }}>
              <LottieView
                source={success_anim}
                autoPlay
                loop
                style={{ width: 75, height: 75 }}
              />
            </View>
          )}
          <TouchableOpacity>
            <View style={styles.button} onTouchEnd={() => onPressSignin()}>
              <View style={styles.signIn}>
                <Text style={[styles.textSign, { color: "#fff" }]}>
                  Sign In
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View
              style={[styles.signIn, { fontSize: 25 }]}
              onTouchEnd={() => navigation.navigate("SignupScreen")}
            >
              <Text>
                New to rides ?<Text style={{ color: "red" }}> Sign up</Text>
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};
export default LoginScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 2,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 50,
    backgroundColor: "#242424",
  },
  footer: {
    flex: 2,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  text_header: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 30,
  },
  text_footer: {
    color: "#05375a",
    fontSize: 20,
  },
  action: {
    flexDirection: "row",
    marginTop: 25,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  error: {
    marginTop: 15,
    color: "red",
    fontSize: 15,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#05375a",
    fontSize: 18,
  },
  button: {
    alignItems: "center",
    marginTop: 10,
    backgroundColor: "#018786",
    borderColor: "#009387",
    borderWidth: 1,
  },
  signIn: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
