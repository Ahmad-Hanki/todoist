import Button from "@/components/shared/Button";
import TextInputFiled from "@/components/shared/TextInputFiled";
import { auth } from "@/config/firebaseConfig";
import Colors from "@/constants/Colors";
import axios from "axios";
import { useRouter } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Alert, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useContext } from "react";

import { AuthContext } from "@/context/AuthContext";
const SignIn = () => {
  const { setUser } = useContext(AuthContext);
  const router = useRouter();
  const [email, setEmail] = useState<undefined | string>();
  const [password, setPassword] = useState<undefined | string>();
  const [loading, setLoading] = useState(false);

  const onSignIn = async () => {
    if (!email || !password) {
      Alert.alert("Please fill all fields");
      return;
    }
    setLoading(true);

    try {
      const account = await signInWithEmailAndPassword(auth, email, password);
      const result = await axios.get(
        process.env.EXPO_PUBLIC_ENDPOINT + "/user?email=" + account.user.email
      );

      const userData = await result.data;
      setUser(userData);
    } catch (err) {
      Alert.alert("Incorrect Email or Password");
      console.log(err);
    }

    setLoading(false);
  };
  return (
    <View
      style={{
        padding: 20,
        paddingTop: 50,
      }}
    >
      <View style={{ alignItems: "center", marginTop: 25 }}>
        <Image
          style={{
            width: 250,
            height: 250,
          }}
          source={require("../../assets/images/logo.png")}
        />
        <Text
          style={{
            fontSize: 25,
            fontWeight: "bold",
          }}
        >
          Sign In to Collage Campus
        </Text>
      </View>
      <TextInputFiled
        label="Collage Email"
        onChangeText={(v) => {
          setEmail(v);
        }}
      />
      <TextInputFiled
        label="Password"
        typePassword
        onChangeText={(v) => {
          setPassword(v);
        }}
      />
      <Button
        text="Sign In"
        onPress={async () => {
          await onSignIn();
        }}
        loading={loading}
      />
      <Pressable
        onPress={() => {
          router.push("/(auth)/SignUp");
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
          Don't Have Account? Sign Up
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({});

export default SignIn;
