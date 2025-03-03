import Colors from "@/constants/Colors";
import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

interface TextInputFiledProps {
  label: string;
  onChangeText: (text: string) => void;
  typePassword?: boolean;
  value?: string;
}

const TextInputFiled = ({
  label,
  onChangeText,
  typePassword,
}: TextInputFiledProps) => {
  return (
    <View style={{ marginTop: 15 }}>
      <Text style={{ color: Colors.GARY }}>{label}</Text>

      <TextInput
        style={styles.textInput}
        placeholder={label}
        secureTextEntry={typePassword}
        onChangeText={onChangeText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    padding: 15,
    borderWidth: 0.3,
    borderRadius: 5,
    marginTop: 5,
    fontSize: 18,
  },
});
export default TextInputFiled;
