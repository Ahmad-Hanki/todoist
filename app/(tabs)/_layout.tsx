import { Tabs } from "expo-router";
import React, { useContext } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { AuthContext } from "@/context/AuthContext";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Colors from "@/constants/Colors";
const TabIcon = ({
  focused,
  text,
  icon,
}: {
  focused: boolean;
  text: string;
  icon: any;
}) => {
  return (
    <View
      style={{
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",

        flexDirection: "column",
      }}
    >
      {icon}
      <Text
        style={{
          color: focused ? Colors.PRIMARY : Colors.GARY,
          fontSize: 15,
          width: 100,
          textAlign: "center",
        }}
      >
        {text}
      </Text>
    </View>
  );
};

const TabsLayout = () => {
  const { user } = useContext(AuthContext);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.PRIMARY,
        tabBarStyle: {
          position: "absolute",
          flex: 1,
          height: 70,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingBottom: 20,
        },
      }}
    >
      <Tabs.Screen
        name="Home"
        options={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ color, focused, size }) => (
            <>
              <TabIcon
                text="Home"
                focused={focused}
                icon={
                  <Ionicons
                    name={focused ? "home" : "home-outline"}
                    size={24}
                    color={focused ? Colors.PRIMARY : Colors.GARY}
                  />
                }
              />
            </>
          ),
        }}
      />
      <Tabs.Screen
        name="Event"
        options={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ color, focused, size }) => (
            <>
              <TabIcon
                text="Event"
                focused={focused}
                icon={
                  <Ionicons
                    name={focused ? "calculator" : "calculator-outline"}
                    size={24}
                    color={focused ? Colors.PRIMARY : Colors.GARY}
                  />
                }
              />
            </>
          ),
        }}
      />
      <Tabs.Screen
        name="Clubs"
        options={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ color, focused, size }) => (
            <>
              <TabIcon
                text="Clubs"
                focused={focused}
                icon={
                  <Ionicons
                    name={focused ? "people" : "people-outline"}
                    size={24}
                    color={focused ? Colors.PRIMARY : Colors.GARY}
                  />
                }
              />
            </>
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ color, focused, size }) => (
            <>
              <TabIcon
                text="Profile"
                focused={focused}
                icon={
                  user?.image ? (
                    <>
                      <Image
                        source={{ uri: user.image }}
                        style={{ width: 24, height: 24, borderRadius: 99 }}
                      />
                    </>
                  ) : (
                    <>
                      <MaterialCommunityIcons
                        name={focused ? "account" : "account-outline"}
                        size={24}
                        color="black"
                      />
                    </>
                  )
                }
              />
            </>
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
