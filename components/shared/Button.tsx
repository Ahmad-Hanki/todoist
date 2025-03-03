import Colors from "@/constants/Colors";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface ButtonProps {
  text: string;
  onPress: () => void;
}

const Button = ({ text, onPress }: ButtonProps) => {
  return (
    <TouchableOpacity
    onPress={onPress}
      style={{
        padding: 15,
        backgroundColor: Colors.PRIMARY,
        borderRadius: 10,
        marginTop: 15,
      }}
    >
      <Text style={{ color: Colors.WHITE, textAlign: "center", fontSize: 20 }}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({});

export default Button;
