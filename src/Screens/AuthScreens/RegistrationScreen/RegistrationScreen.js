import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { useDispatch } from "react-redux";
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

import { authSignUpUser } from "../../../../redux/auth/authOperations";

const initialState = {
  login: "",
  email: "",
  password: "",
};

export const RegistrationScreen = ({ navigation }) => {
  const [openKeyboard, setOpenKeyboard] = useState(false);
  const [state, setState] = useState(initialState);
  const [isHidePassword, setIsHidePassword] = useState(true);
  const dispatch = useDispatch();

  const hideKeyboard = () => {
    setOpenKeyboard(false);
    Keyboard.dismiss();
  };

  const handleSubmit = () => {
    setOpenKeyboard(false);
    Keyboard.dismiss();
    dispatch(authSignUpUser(state));
    // console.log("click");
    // setState(initialState);
  };

  return (
    <TouchableWithoutFeedback onPress={hideKeyboard}>
      <View style={styles.container}>
        <ImageBackground
          style={styles.image}
          source={require("../../../../assets/image/bg.jpg")}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <View
              style={{
                ...styles.register,
                marginTop: openKeyboard ? 150 : 270,
              }}
            >
              <View style={styles.avatar}></View>
              <Text style={styles.title}>Registration</Text>
              <View style={styles.form}>
                <TextInput
                  style={styles.input}
                  placeholder="Name"
                  onFocus={() => setOpenKeyboard(true)}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, login: value }))
                  }
                />
                <TextInput
                  style={{ ...styles.input, marginTop: 16 }}
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
                  onPress={() => handleSubmit()}
                  activeOpacity={0.8}
                  style={styles.btn}
                >
                  <Text style={styles.btnText}>SIGN UP</Text>
                </TouchableOpacity>
              </View>
              <Text
                onPress={() => navigation.navigate("Login")}
                style={styles.loginLink}
              >
                Already have an account? Sing In
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
  register: {
    paddingTop: 90,
    paddingBottom: 80,
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  avatar: {
    position: "absolute",
    left: 136,
    top: -60,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
    width: 120,
    height: 120,
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
