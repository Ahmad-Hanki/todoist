import UserAvatar from "@/components/post/UserAvatar";
import WritePost from "@/components/post/WritePost";
import { AuthContext } from "@/context/AuthContext";
import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";

const Index = () => {
  const { user } = useContext(AuthContext);
  return (
    <View style={{ padding: 20 }}>
      <UserAvatar
        date="Now"
        name={user?.name ?? "Anonymous"}
        image={user?.image ?? ""}
      />
      <WritePost user={user!} />
    </View>
  );
};

const styles = StyleSheet.create({});

export default Index;
