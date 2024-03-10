import { useState } from "react";
import AuthContent from "../components/Auth/AuthContent";
import { loginUser } from "../util/auth";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { Alert, ToastAndroid } from "react-native";
import { useAuth } from "../store/auth-context";

function LoginScreen() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const authCtx = useAuth();
  const loginHandler = async ({ email, password }) => {
    setIsAuthenticated(true);
    try {
      const token = await loginUser(email, password);
      authCtx.authenticate(token);
    } catch (error) {
      // Alert.alert(
      //   "Authentication Failed!",
      //   "Could not log you in. Please check your inputs and try again."
      // );
      ToastAndroid.show("Authentication Failed!", ToastAndroid.SHORT);
      setIsAuthenticated(false);
    }
  };

  if (isAuthenticated) {
    return <LoadingOverlay message="Logging you in..." />;
  }
  return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;
