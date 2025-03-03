import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import Colors from "@/constants/Colors";
import TextInputFiled from "@/components/shared/TextInputFiled";
const SignUp = () => {

  return (
    <View style={{ paddingTop: 60, padding: 20 }}>
      <Text style={{ fontSize: 25, fontWeight: "bold" }}>
        Create New Account
      </Text>
      <View style={{ display: "flex", alignItems: "center" }}>
        <View>
          <Image
            source={require("../../assets/images/profile.png")}
            style={{
              width: 100,
              height: 100,
              borderRadius: 99,

              marginTop: 0,
            }}
          />
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
      <TextInputFiled label="Full Name" onChangeText={() => {}} />
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    padding: 10,
    
  }
});

export default SignUp;
