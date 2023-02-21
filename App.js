import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  View,
  ImageBackground,
  Dimensions,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { RegistrationScreen } from "./assets/Screens/RegistrationScreen/RegistrationScreen";

export default function App() {
  const [openKeyboard, setOpenKeyboard] = useState(false);
  const [isLoginScreen, setIsLoginScreen] = useState(false);

  const hideKeyboard = () => {
    setOpenKeyboard(false);
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={hideKeyboard}>
      <View style={styles.container}>
        <ImageBackground
          style={styles.image}
          source={require("./assets/image/bg.jpg")}
        >
          {isLoginScreen ? (
            <Text
              style={styles.testText}
              onPress={() => setIsLoginScreen(false)}
            >
              LOGIN PAGE
            </Text>
          ) : (
            <RegistrationScreen
              openKeyboard={openKeyboard}
              setOpenKeyboard={setOpenKeyboard}
              setIsLoginScreen={setIsLoginScreen}
            />
          )}
        </ImageBackground>
        <StatusBar style="auto" />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    position: "absolute",
    left: 0,
    top: 0,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  testText: {
    alignItems: "center",
    marginTop: 200,
  },
});
