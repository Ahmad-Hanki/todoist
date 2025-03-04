import { auth } from "@/config/firebaseConfig";
import axios from "axios";
import { useRouter } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { ActivityIndicator, Text, View } from "react-native";
import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";

export default function Index() {
  const { setUser } = useContext(AuthContext);
  const router = useRouter();

  
  onAuthStateChanged(auth, async (userData) => {
    if (userData && userData?.email) {
      const result = await axios.get(
        process.env.EXPO_PUBLIC_ENDPOINT + "/user?email=" + userData?.email
      );

      const data = await result.data;
      console.log(data);
      setUser(data);
      router.replace("/(tabs)/Home");
    } else {
      console.log("no user");
      router.replace("/landing");
    }
  });

  return (
    <View
      style={{
        flex: 1,
        alignContent: "center",
        justifyContent: "center",
      }}
    >
      <ActivityIndicator size="large" />
    </View>
  );
}
