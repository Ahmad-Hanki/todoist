import React, { useState } from "react";
import {
  Alert,
  Image,
  Platform,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import Colors from "@/constants/Colors";
import TextInputFiled from "@/components/shared/TextInputFiled";
import Button from "@/components/shared/Button";
import * as ImagePicker from "expo-image-picker";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/config/firebaseConfig";
import { upload } from "cloudinary-react-native";
import { cld, options } from "@/config/cloudinaryConfig";

const SignUp = () => {
  const [profileImage, setProfileImage] = useState<string | undefined>();
  const [fullName, setFullName] = useState<string | undefined>();
  const [email, setEmail] = useState<string | undefined>();
  const [password, setPassword] = useState<string | undefined>();
  const onBtnPress = async () => {
    console.log(fullName, email, password);

    if (!email || !password || !fullName) {
      if (Platform.OS === "android") {
        ToastAndroid.show(
          "Please fill all fields Android",
          ToastAndroid.BOTTOM
        );
      } else {
        Alert.alert("Error", "Please fill all fields"); // iOS fallback
      }
      return;
    }

    try {
      const account = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      // Todo: Upload the profile Image, Save user data to Database
      await upload(cld, {
        file: profileImage,
        options,
        callback: async (err, res) => {
          if (err) {
            console.log(err);
            return;
          }
         
        },
      });
    } catch (error) {
      console.log((error as Error)?.message || "An unknown error occurred");
    }
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true, // crop image
      aspect: [4, 4],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  return (
    <View style={{ paddingTop: 60, padding: 20 }}>
      <Text style={{ fontSize: 25, fontWeight: "bold" }}>
        Create New Account
      </Text>
      <View style={{ display: "flex", alignItems: "center" }}>
        <View>
          <TouchableOpacity onPress={pickImage}>
            {profileImage ? (
              <>
                <Image
                  style={styles.profileImage}
                  source={{ uri: profileImage }}
                />
              </>
            ) : (
              <>
                <Image
                  style={styles.profileImage}
                  source={require("../../assets/images/profile.png")}
                />
              </>
            )}
          </TouchableOpacity>
          <AntDesign
            style={{
              position: "absolute",
              bottom: 0,
              right: 0,
            }}
            name="camera"
            size={24}
            color={Colors.PRIMARY}
          />
        </View>
      </View>
      <View>
        <TextInputFiled
          label="Full Name "
          onChangeText={(v) => {
            setFullName(v);
          }}
        />

        <TextInputFiled
          onChangeText={(v) => {
            setEmail(v);
          }}
          label="Collage Email "
        />
        <TextInputFiled
          label="Password "
          onChangeText={(v) => {
            setPassword(v);
          }}
          typePassword
        />

        <Button
          text="Create Account"
          onPress={() => {
            onBtnPress();
          }}
        />
      </View>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 99,

    marginTop: 0,
  },
});
