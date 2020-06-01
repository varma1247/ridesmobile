import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import axios from "axios";
import {
  View,
  SafeAreaView,
  FlatList,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Keyboard,
  Text,
  Image,
} from "react-native";
import { Icon, Input, Avatar, Card } from "react-native-elements";
const ProfileScreen = ({ navigation }) => {
  const { token } = useContext(AuthContext);
  const [profile, setProfile] = useState({});
  const [newfirstname, setFirstname] = useState("");
  const [newlastname, setLastname] = useState("");
  const getProfile = async () => {
    try {
      const { data } = await axios.get("http://192.168.1.76:5000/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("fhdxdfxhgsfzghbffdvgdfbhbxvdzgfzgxfß√fes");
      setProfile({ ...data.profile });
    } catch (error) {
      console.log(error);
    }
  };
  const saveProfile = async (firstname, lastname) => {
    try {
      const { data } = await axios.post(
        "http://192.168.1.76:5000/profile",
        {
          firstname: firstname,
          lastname: lastname,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("fhdxdfxhgsfzghbffdvgdfbhbxvdzgfzgxfß√fes");
      setProfile({ ...data.profile });
    } catch (error) {
      console.log(error);
    }
  };

  const showHeaderButtons = () => {
    navigation.setOptions({
      headerLeft: () => {
        return (
          <TouchableOpacity>
            <Text
              onPress={() => {
                Keyboard.dismiss();
                navigation.setOptions({
                  headerLeft: () => null,
                  headerRight: () => null,
                });
              }}
              style={{ color: "white", fontSize: 15 }}
            >
              Cancel
            </Text>
          </TouchableOpacity>
        );
      },
      headerRight: () => {
        return (
          <TouchableOpacity>
            <Text
              style={{ color: "white", fontSize: 15 }}
              onPress={() => {
                // const { firstname, lastname } = profile;
                console.log(newfirstname, newlastname);

                // saveProfile(firstname, lastname);
                // Keyboard.dismiss();
                // navigation.setOptions({
                //   headerLeft: () => null,
                //   headerRight: () => null,
                // });
              }}
            >
              Done
            </Text>
          </TouchableOpacity>
        );
      },
      headerLeftContainerStyle: { marginLeft: 15 },
      headerRightContainerStyle: { marginRight: 15 },
    });
  };
  useEffect(() => {
    console.log("come here");

    getProfile();
  }, [token]);
  return (
    <>
      <Card containerStyle={styles.conatiner}>
        <View style={{ margin: 20 }}>
          <View style={{ alignSelf: "center" }}>
            <Avatar
              rounded
              source={require("../../assets/userAvatar.png")}
              showAccessory
              size="xlarge"
            />
          </View>
          {/* <View style={{ marginTop: 30 }}>
            <View
              style={{
                margin: 10,
                borderColor: "lightseagreen",
                borderBottomWidth: 1,
                padding: 5,
              }}
            >
              <TextInput
                placeholder="FirstName"
                defaultValue={newfirstname}
                onChangeText={(text) => {
                  setFirstname(text);
                  console.log(newfirstname);
                }}
                style={{ fontSize: 18, fontWeight: "600" }}
                onFocus={() => {
                  showHeaderButtons();
                }}
              ></TextInput>
            </View>
            <View
              style={{
                margin: 10,
                borderColor: "lightseagreen",
                borderBottomWidth: 1,
                padding: 5,
              }}
            >
              <TextInput
                placeholder="LastName"
                defaultValue={newlastname}
                onChangeText={(text) => {
                  setLastname(text);
                  console.log(newlastname);
                }}
                style={{ fontSize: 18, fontWeight: "600" }}
              ></TextInput>
            </View>
          </View> */}
        </View>
      </Card>
      <Text style={{ fontSize: 14, margin: 30, marginBottom: 5 }}>
        FIRSTNAME
      </Text>
      <Card containerStyle={styles.conatiner}>
        <Text
          style={{
            marginLeft: 30,
            marginTop: 15,
            marginBottom: 15,
            fontWeight: "600",
            fontSize: 18,
          }}
        >
          {profile.firstname}
        </Text>
      </Card>
      <Text style={{ fontSize: 14, margin: 30, marginBottom: 5 }}>
        LASTNAME
      </Text>
      <Card containerStyle={styles.conatiner}>
        <Text
          style={{
            marginLeft: 30,
            marginTop: 15,
            marginBottom: 15,
            fontWeight: "600",
            fontSize: 18,
          }}
        >
          {profile.lastname}
        </Text>
      </Card>
      <Text style={{ fontSize: 14, margin: 30, marginBottom: 5 }}>
        USERNAME
      </Text>
      <Card containerStyle={styles.conatiner}>
        <Text
          style={{
            marginLeft: 30,
            marginTop: 15,
            marginBottom: 15,
            fontWeight: "600",
            fontSize: 18,
          }}
        >
          {profile.username}
        </Text>
      </Card>
      <Text style={{ fontSize: 14, margin: 30, marginBottom: 5 }}>EMAIL</Text>
      <Card containerStyle={styles.conatiner}>
        <Text
          style={{
            marginLeft: 30,
            marginTop: 15,
            marginBottom: 15,
            fontWeight: "600",
            fontSize: 18,
          }}
        >
          {profile.email}
        </Text>
      </Card>
    </>
  );
};
const styles = StyleSheet.create({
  conatiner: {
    justifyContent: "center",
    margin: 0,
    padding: 0,
    borderWidth: 0,
  },
  postInput: {
    marginTop: 15,
    marginBottom: 15,
    fontSize: 20,
    padding: 10,
  },
});
export default ProfileScreen;
