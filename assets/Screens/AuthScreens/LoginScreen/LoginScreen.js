import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ImageBackground,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

const initialState = {
  email: "",
  password: "",
};

export const LoginScreen = ({ navigation }) => {
  const [openKeyboard, setOpenKeyboard] = useState(false);
  const [state, setState] = useState(initialState);
  const [isHidePassword, setIsHidePassword] = useState(true);

  const hideKeyboard = () => {
    setOpenKeyboard(false);
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={hideKeyboard}>
      <View style={styles.container}>
        <ImageBackground
          style={styles.image}
          source={require("../../../image/bg.jpg")}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <View
              style={{
                ...styles.login,
                marginTop: openKeyboard ? 260 : 325,
              }}
            >
              <Text style={styles.title}>Login</Text>
              <View style={styles.form}>
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  onFocus={() => setOpenKeyboard(true)}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, email: value }))
                  }
                />
                <View style={styles.password}>
                  <TextInput
                    secureTextEntry={isHidePassword}
                    style={{ ...styles.input, marginTop: 16, paddingRight: 60 }}
                    placeholder="Password"
                    onFocus={() => setOpenKeyboard(true)}
                    onChangeText={(value) =>
                      setState((prevState) => ({
                        ...prevState,
                        password: value,
                      }))
                    }
                  />
                  {isHidePassword ? (
                    <Text
                      onPress={() => setIsHidePassword(false)}
                      style={styles.showPassword}
                    >
                      Show
                    </Text>
                  ) : (
                    <Text
                      onPress={() => setIsHidePassword(true)}
                      style={styles.showPassword}
                    >
                      Hide
                    </Text>
                  )}
                </View>
                <TouchableOpacity
                  onPress={() => {
                    setOpenKeyboard(false);
                    console.log(state);
                  }}
                  activeOpacity={0.8}
                  style={styles.btn}
                >
                  <Text style={styles.btnText}>SIGN IN</Text>
                </TouchableOpacity>
              </View>
              <Text
                onPress={() => navigation.navigate("Register")}
                style={styles.loginLink}
              >
                Don't have an account? Sing Up
              </Text>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
        <StatusBar style="auto" />
      </View>
    </TouchableWithoutFeedback>
  );
};

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
  login: {
    paddingTop: 32,
    paddingBottom: 144,
    backgroundColor: "#fff",

    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  title: {
    textAlign: "center",
    fontWeight: "500",
    fontSize: 30,
    lineHeight: 35,
    letterSpacing: 0.01,
    color: "#212121",
  },
  form: {
    marginHorizontal: 16,
    marginTop: 35,
  },
  input: {
    backgroundColor: "#F6F6F6",
    height: 50,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    padding: 16,
  },
  password: {
    position: "relative",
  },
  showPassword: {
    position: "absolute",
    right: 16,
    bottom: 15,
    color: "#1B4371",
    fontSize: 16,
    lineHeight: 19,
  },
  btn: {
    marginTop: 45,
    paddingHorizontal: 32,
    paddingVertical: 16,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    color: "#fff",
    fontSize: 16,
    lineHeight: 19,
  },
  loginLink: {
    marginTop: 16,
    color: "#1B4371",
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
  },
});
