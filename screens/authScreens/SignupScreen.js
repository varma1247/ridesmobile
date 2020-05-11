import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { registrationValidator } from "../../validators/registrationValidator";
import success_anim from "../../assets/success_anim.json";
import LottieView from "lottie-react-native";
import axios from "axios";
import {
  View,
  KeyboardAvoidingView,
  Text,
  Button,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
  StatusBar,
  TextInput,
  ActivityIndicator,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
const SignupScreen = ({ navigation }) => {
  const { signIn } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  useEffect(() => {
    setUserDetails({
      username: "",
      email: "",
      password: "",
      firstname: "",
      lastname: "",
    });
  }, []);
  const onChangeUsername = (text) => {
    setUserDetails({ ...userDetails, username: text });
  };
  const onChangeEmail = (text) => {
    setUserDetails({ ...userDetails, email: text });
  };
  const onChangePassword = (text) => {
    setUserDetails({ ...userDetails, password: text });
  };
  const onChangeFirstname = (text) => {
    setUserDetails({ ...userDetails, firstname: text });
  };
  const onChangeLastname = (text) => {
    setUserDetails({ ...userDetails, lastname: text });
  };
  const onPressSignup = async () => {
    const { error } = registrationValidator.validate(userDetails);
    if (error) {
      console.log(error.details[0].message);
      setError(error.details[0].message);
    } else {
      // console.log(userDetails);
      // axios.post("http://192.168.1.76:5000/register",userDetails).then(data=>console.log(data.user)
      // ).catch(error=>{console.log(error.response);
      // })
      try {
        setError("");
        setLoading(true);
        const { data } = await axios.post(
          "http://192.168.1.76:5000/register",
          userDetails
        );
        setLoading(false);
        // console.log(data.user);
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          navigation.navigate("LoginScreen");
        }, 500);
      } catch (error) {
        setLoading(false);
        setError(error.response.data);
        console.log(error.response.data);
      }

      // fetch("http://192.168.1.76:5000/register",{
      //   method:"POST",
      //   body:userDetails,
      //   headers:{"Content-Type":"application/json"}
      // }).then(user=>{

      // }).catch(error=>{

      // })
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
          <Text style={styles.text_header}>Register !!</Text>
        </View>
        <View style={styles.footer}>
          <View style={styles.action}>
            <FontAwesome name="user-o" color="#05375a" size={25} />
            <TextInput
              style={styles.textInput}
              placeholder="username"
              name="username"
              keyboardType="email-address"
              onChangeText={(text) => onChangeUsername(text)}
              defaultValue={userDetails.username}
            />
          </View>
          <View style={styles.action}>
            <FontAwesome name="at" color="#05375a" size={25} />
            <TextInput
              style={styles.textInput}
              placeholder="email"
              name="email"
              keyboardType="email-address"
              onChangeText={(text) => onChangeEmail(text)}
              defaultValue={userDetails.email}
            />
          </View>
          <View style={styles.action}>
            <FontAwesome name="user-o" color="#05375a" size={25} />
            <TextInput
              style={styles.textInput}
              placeholder="firstname"
              name="firstname"
              keyboardType="default"
              onChangeText={(text) => onChangeFirstname(text)}
              defaultValue={userDetails.firstname}
            />
          </View>
          <View style={styles.action}>
            <FontAwesome name="user-o" color="#05375a" size={25} />
            <TextInput
              style={styles.textInput}
              placeholder="lastname"
              keyboardType="default"
              name="lastname"
              onChangeText={(text) => onChangeLastname(text)}
              defaultValue={userDetails.lastname}
            />
          </View>
          <View style={styles.action}>
            <FontAwesome name="lock" color="#05375a" size={25} />
            <TextInput
              style={styles.textInput}
              placeholder="password"
              secureTextEntry={true}
              name="password"
              onChangeText={(text) => onChangePassword(text)}
              defaultValue={userDetails.password}
            />
          </View>
          {error ? (
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Text style={styles.error}>{error}</Text>
            </View>
          ) : null}
          {loading && <ActivityIndicator size="small" color="#0000ff" style={{marginTop:5}}/>}
          {success && (
            <View style={{ alignItems: "center" }}>
              <LottieView
                source={success_anim}
                autoPlay
                loop
                style={{ width: 75, height: 75 }}
              />
            </View>
          )}
          <TouchableOpacity>
            <View style={styles.button} onTouchEnd={() => onPressSignup()}>
              <View style={styles.signIn}>
                <Text style={[styles.textSign, { color: "#00000f" }]}>
                  Sign Up
                </Text>
              </View>
            </View>
            <TouchableOpacity>
              <View
                style={[styles.signIn, { fontSize: 25 }]}
                onTouchEnd={() => navigation.navigate("LoginScreen")}
              >
                <Text>
                  Already have an account ?
                  <Text style={{ color: "red" }}> Login</Text>
                </Text>
              </View>
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};
export default SignupScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 1,
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
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#05375a",
    fontSize: 18,
  },
  button: {
    alignItems: "center",
    backgroundColor: "white",
    borderColor: "#009387",
    marginTop: 10,
    borderWidth: 1,
  },
  signIn: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  error: {
    marginTop: 15,
    color: "red",
    fontSize: 15,
    marginBottom: 15,
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
