import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Home } from "@/app/Home";

export function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <Home />
    </SafeAreaProvider>
  );
}
