import Category from "@/components/home/Category";
import Header from "@/components/home/Header";
import Colors from "@/constants/Colors";
import React from "react";
import { StyleSheet, View } from "react-native";

const Home = () => {
  return (
    <View
      style={{
        padding: 20,
        paddingTop: 40,
        // backgroundColor: Colors.WHITE
      }}
    >
      {/* header */}
      <Header />

      {/* category */}
      <Category/>
      {/* latest posts */}
    </View>
  );
};

const styles = StyleSheet.create({});

export default Home;
