import { StyleSheet, View } from "react-native";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";
import { useAuth } from "../store/auth-context";
import GoogleButton from "../components/ui/GoogleButton";

GoogleSignin.configure({
  webClientId:
    "570410649-n3n46vta4fht1l8hp0qllj4tfpos07ug.apps.googleusercontent.com",
});

const GoogleAuth = () => {
  const authCtx = useAuth();

  const onGoogleButtonPress = async () => {
    try {
      if (GoogleSignin.isSignedIn()) {
        GoogleSignin.signOut();
      }

      // Check if your device supports Google Play
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      // Get the users ID token
      const { idToken } = await GoogleSignin.signIn();
      authCtx.authenticate(idToken);

      // Create a Google credential with the tokenetUser(user)
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      return auth().signInWithCredential(googleCredential);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        console.log(error);
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
        console.log("operation (e.g. sign in) is in progress already");
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        console.log("play services not available or outdated");
      } else {
        // some other error happened
        console.log(error);
      }
    }
  };

  return (
    <View style={styles.buttons}>
      <GoogleButton
        icon="logo-google"
        size={15}
        color="white"
        onPress={() => onGoogleButtonPress()}
      >
        Sign In With Google
      </GoogleButton>
      {/* <GoogleSigninButton
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={() => onGoogleButtonPress()}
        // disabled={this.state.isSigninInProgress}
      /> */}
    </View>
  );
};

export default GoogleAuth;

const styles = StyleSheet.create({
  buttons: {
    marginTop: 20,
  },
});
