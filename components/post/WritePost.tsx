import Colors from "@/constants/Colors";
import React, { useState } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import Button from "../shared/Button";
import * as ImagePicker from "expo-image-picker";
import { upload } from "cloudinary-react-native";
import { cld, options } from "@/config/cloudinaryConfig";
import axios from "axios";
import { UserProps } from "@/context/AuthContext";

interface WritePostProps {
  user: UserProps;
}

const WritePost = ({ user }: WritePostProps) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [content, setContent] = useState<string | null>(null);
  const [item, setItem] = useState([
    {
      label: "Public",
      value: "public",
    },
    {
      label: "ABC Club",
      value: "ABC Club",
    },
  ]);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const onBtnPress = async () => {
    if (!content) {
      Alert.alert("Please enter some content");
      return;
    }

    //Upload image to Cloudinary storage

    try {
      let uploadImageUrl = "";
      if (image) {
        const response = await new Promise<any>(async (resolve, reject) => {
          await upload(cld, {
            file: image,
            options,
            callback: (error: any, response: any) => {
              if (error) {
                reject(error); // Reject promise if there's an error
              } else {
                resolve(response); // Resolve promise with the response
              }
            },
          });
        });

        uploadImageUrl = response?.url;
      }

      const result = await axios.post(
        process.env.EXPO_PUBLIC_ENDPOINT + "/post",
        {
          content,
          imageUrl: uploadImageUrl,
          visibleIn: value,
          email: user.email,
        }
      );

      console.log(await result.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View>
      <TextInput
        placeholder="What's on your mind?"
        style={styles.textInputField}
        multiline={true}
        maxLength={1000}
        onChangeText={(text) => setContent(text)}
      />
      <TouchableOpacity onPress={pickImage}>
        <Image
          source={
            image ? { uri: image } : require("../../assets/images/image.png")
          }
          style={styles.image}
        />
      </TouchableOpacity>
      <View
        style={{
          marginTop: 15,
        }}
      >
        <DropDownPicker
          items={item}
          setOpen={setOpen}
          open={open}
          setValue={setValue}
          value={value}
          setItems={setItem}
          style={{
            backgroundColor: Colors.WHITE,

            borderWidth: 0,
            elevation: 3,
          }}
        />
      </View>

      <Button
        loading={loading}
        text="Post"
        onPress={async () => {
          setLoading(true);
          await onBtnPress();
          setLoading(false);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textInputField: {
    padding: 15,
    backgroundColor: Colors.WHITE,
    height: 140,
    marginTop: 10,
    borderRadius: 15,
    textAlignVertical: "top",
    elevation: 7,
  },
  image: {
    width: 100,
    height: 100,
    marginTop: 15,
    borderRadius: 15,
    borderWidth: 0.4,
  },
});

export default WritePost;
