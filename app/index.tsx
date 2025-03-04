import { auth } from "@/config/firebaseConfig";
import axios from "axios";
import { Redirect } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { Text, View } from "react-native";
import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";

export default function Index() {
  const { setUser } = useContext(AuthContext);
  onAuthStateChanged(auth, async (userData) => {
    if (userData && userData?.email) {
      const result = await axios.get(
        process.env.EXPO_PUBLIC_ENDPOINT + "/user?email=" + userData?.email
      );

      const data = await result.data;
      console.log(data);
      setUser(data);
    } else {
      console.log("User is signed out");
    }
  });
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Redirect href={"/landing"} />
    </View>
  );
}
