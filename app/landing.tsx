import Button from "@/components/shared/Button";
import Colors from "@/constants/Colors";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

const Landing = () => {
  const router = useRouter();
  

  return (
    <View>
      <Image
        source={require("../assets/images/login.png")}
        style={{
          width: "100%",
          height: 450,
          alignSelf: "center",
        }}
      />

      <View
        style={{
          padding: 20,
        }}
      >
        <Text
          style={{
            fontSize: 35,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Welcome to college Campus Guru
        </Text>

        <Text
          style={{
            fontSize: 20,
            textAlign: "center",
            marginTop: 10,
            color: Colors.GARY,
          }}
        >
          Your collage news updates in your pocket. Join the club, Register for
          nre events and many more.
        </Text>

        <Button
          text="Get Started"
          onPress={() => {
            router.push("/(auth)/SignUp");
          }}
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

const styles = StyleSheet.create({});

export default Landing;
