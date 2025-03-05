import Colors from "@/constants/Colors";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
interface UserAvatarProps {
  name: string;
  image: string;
  date: string;
}

const UserAvatar = ({ name, image, date }: UserAvatarProps) => {
  return (
    <View style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        // padding: 10,
        // borderBottomWidth: 1,
        // borderBottomColor: Colors.GARY,
    }}>
      <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
        <Image
          source={{ uri: image }}
          style={{ width: 50, height: 50, borderRadius: 99 }}
        />

        <View style={{ marginLeft: 10 }}>
          <Text style={{ fontWeight: "bold", fontSize: 20 }}>{name}</Text>
          <Text style={{ color: Colors.GARY }}>{date}</Text>
        </View>
      </View>
      <Entypo name="dots-three-vertical" size={24} color="black" />
    </View>
  );
};

const styles = StyleSheet.create({});

export default UserAvatar;
