import { Stack } from 'expo-router';
import { Provider as PaperProvider } from 'react-native-paper';

export default function RootLayout() {
  return (
    <PaperProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" options={{ title: 'Page non trouvée' }} />
      </Stack>
    </PaperProvider>
  );
}