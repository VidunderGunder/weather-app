import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { TRPCProvider } from "./utils/trpc";
import { ClerkProvider } from "@clerk/clerk-expo";
import { CLERK_FRONTEND_API } from "@env";

import { HomeScreen } from "./screens/home";

const _App = () => {
  return (
    <TRPCProvider>
      <SafeAreaProvider>
        <HomeScreen />
        <StatusBar />
      </SafeAreaProvider>
    </TRPCProvider>
  );
};

export function App() {
  if (typeof CLERK_FRONTEND_API === "undefined") return <_App />;
  return (
    <ClerkProvider frontendApi={CLERK_FRONTEND_API}>
      <_App />
    </ClerkProvider>
  );
}
