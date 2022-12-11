import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { TRPCProvider } from "./utils/trpc";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./utils/tanstack-query";
import { GestureHandlerRootView } from "react-native-gesture-handler";
// import { ClerkProvider } from "@clerk/clerk-expo";
// import { CLERK_FRONTEND_API } from "@env";

import { HomeScreen } from "./screens/home";

const _App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TRPCProvider>
        <SafeAreaProvider>
          <GestureHandlerRootView>
            <HomeScreen />
            <StatusBar />
          </GestureHandlerRootView>
        </SafeAreaProvider>
      </TRPCProvider>
    </QueryClientProvider>
  );
};

export function App() {
  return <_App />;
  // if (typeof CLERK_FRONTEND_API === "undefined") return <_App />;
  // return (
  //   <ClerkProvider frontendApi={CLERK_FRONTEND_API}>
  //     <_App />
  //   </ClerkProvider>
  // );
}
