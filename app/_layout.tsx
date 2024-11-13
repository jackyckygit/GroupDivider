import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen name="index" options={{ title: 'Welcome'}}/>
      <Stack.Screen name="usernameInputPage" options={{ title: 'Username'}}/>
      <Stack.Screen name="groupInputPage" options={{ title: 'Group name'}}/>
    </Stack>
  );
}
