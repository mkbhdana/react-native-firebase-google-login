import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "../screens/WelcomeScreen";
import IconButton from "../components/ui/IconButton";
import { useAuth } from "../store/auth-context";
import { Colors } from "../constants/styles";

const Stack = createNativeStackNavigator();

export const AppStack = () => {
  const authCtx = useAuth();
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: "white",
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{
          headerRight: ({ tintColor }) => (
            <IconButton
              icon="exit"
              color={tintColor}
              size={24}
              onPress={authCtx.logoutUser}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
};
