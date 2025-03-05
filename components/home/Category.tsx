import Colors from "@/constants/Colors";
import { useRouter } from "expo-router";
import React from "react";
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
const categoryOptions = [
  {
    name: "UpComing Event",
    banner: require("../../assets/images/event.png"),
    path: "/(tabs)/Event",
  },
  {
    name: "Latest Posts",
    banner: require("../../assets/images/news.png"),
    path: "/(tabs)/Home",
  },
  {
    name: "Clubs",
    banner: require("../../assets/images/clubs.png"),
    path: "/(tabs)/Clubs",
  },
  {
    name: "Add New Post",
    banner: require("../../assets/images/add-post.png"),
    path: "/add-post",
  },
];
const Category = () => {
  const router = useRouter();
  return (
    <View style={{ marginTop: 15 }}>
      <FlatList
        data={categoryOptions}
        numColumns={2}
        keyExtractor={(item) => item.name}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              onPress={() => {
                // @ts-ignore
                router.push(item.path);
              }}
              style={styles.cardContainer}
            >
              <Image source={item.banner} style={styles.bannerImage} />
              <Text style={styles.text}>{item.name}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  bannerImage: {
    height: 80,
    objectFit: "cover",
    width: Dimensions.get("screen").width * 0.43,
    borderRadius: 10,
  },
  cardContainer: {
    margin: 5,
  },
  text: {
    fontSize: 17,
    fontWeight: 400,
    position: "absolute",
    padding: 10,
    color: Colors.WHITE,
  },
});

export default Category;
