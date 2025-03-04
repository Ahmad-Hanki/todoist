import React, { useContext, useState } from "react";
import {
  Alert,
  Image,
  Platform,
  Pressable,
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
import axios from "axios";
import { useRouter } from "expo-router";
import { AuthContext } from "@/context/AuthContext";
const SignUp = () => {
  const { setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [profileImage, setProfileImage] = useState<string | undefined>();
  const [fullName, setFullName] = useState<string | undefined>();
  const [email, setEmail] = useState<string | undefined>();
  const [password, setPassword] = useState<string | undefined>();
  const router = useRouter();
  const onBtnPress = async () => {
    if (!email || !password || !fullName || !profileImage) {
      if (Platform.OS === "android") {
        ToastAndroid.show("Please fill all fields", ToastAndroid.BOTTOM);
      } else {
        Alert.alert("Error", "Please fill all fields"); // iOS fallback
      }
      return;
    }

    try {
      useState(true);
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

          if (res) {
            // console.log(res);
            try {
              console.log(process.env.EXPO_PUBLIC_ENDPOINT);
              const result = await axios.post(
                process.env.EXPO_PUBLIC_ENDPOINT + "/user",
                {
                  name: fullName,
                  email: account.user.email,
                  image: res?.url,
                }
              );

              const data = await result.data;

              setUser({
                name: fullName,
                email,
                image: res?.url,
                id: data.id ?? undefined,
              });

              router.push("/landing");
            } catch (error) {
              console.log(error);
            }
          }
        },
      });
    } catch (error) {
      console.log((error as Error)?.message || "An unknown error occurred");
    }
    setLoading(false);
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
    <View style={{ paddingTop: 60, padding: 20, marginTop: 25 }}>
      <Text
        style={{
          fontSize: 25,
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 20,
        }}
      >
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
          onPress={async () => {
            await onBtnPress();
          }}
          loading={loading}
        />
        <Pressable
          onPress={() => {
            router.push("/(auth)/SignIn");
          }}
        >
          <Text
            style={{
              textAlign: "center",
              marginTop: 10,
              fontSize: 16,
              color: Colors.GARY,
            }}
          >
            Already Have an Account? Sign in here
          </Text>
        </Pressable>
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
