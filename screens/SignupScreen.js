import { useState } from "react";
import AuthContent from "../components/Auth/AuthContent";
import { createUser } from "../util/auth";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { useAuth } from "../store/auth-context";

const SignupScreen = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const authCtx = useAuth();
  const signupHandler = async ({ email, password }) => {
    setIsAuthenticated(true);
    try {
      const token = await createUser(email, password);
      authCtx.authenticate(token);
    } catch (error) {
      Alert.alert(
        "Authentication Failed!",
        "Could not create user. Please check your inputs and try again."
      );
      setIsAuthenticated(false);
    }
  };

  if (isAuthenticated) {
    return <LoadingOverlay message="Creating User..." />;
  }
  return <AuthContent onAuthenticate={signupHandler} />;
};

export default SignupScreen;
