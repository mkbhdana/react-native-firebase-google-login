import { NavigationContainer } from "@react-navigation/native";
import { AppStack } from "./AppStack";
import { AuthStack } from "./AuthStack";
import { useAuth } from "../store/auth-context";

export const Router = () => {
  const { isAuthenticated } = useAuth();

  return (
    <NavigationContainer>
      {!isAuthenticated ? <AuthStack /> : <AppStack />}
    </NavigationContainer>
  );
};
