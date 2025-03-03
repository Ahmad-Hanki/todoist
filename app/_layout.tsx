import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="landing" />
      <Stack.Screen
        name="(auth)/SignUp"
        options={{
          headerTransparent: true,
        }}
      />
    </Stack>
  );
}
