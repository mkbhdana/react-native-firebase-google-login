import { StatusBar } from "expo-status-bar";
import { AuthContextProvider, useAuth } from "./store/auth-context";
import { useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SplashScreen from "expo-splash-screen";
import { View } from "react-native";
import { Router } from "./routes/Router";

SplashScreen.preventAutoHideAsync();

const Root = () => {
  const [appIsReady, setAppIsReady] = useState(false);
  const authCtx = useAuth();
  useEffect(() => {
    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem("token");
      if (storedToken) {
        authCtx.authenticate(storedToken);
      }

      setAppIsReady(true);
    }

    fetchToken();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      const splash = await SplashScreen.hideAsync();
      return splash;
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <Router />
    </View>
  );
};

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <AuthContextProvider>
        <Root />
      </AuthContextProvider>
    </>
  );
}
