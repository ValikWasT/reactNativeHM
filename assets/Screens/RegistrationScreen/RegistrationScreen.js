import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";

const initialState = {
  login: "",
  email: "",
  password: "",
};

export const RegistrationScreen = ({
  setIsLoginScreen,
  openKeyboard,
  setOpenKeyboard,
}) => {
  const [state, setState] = useState(initialState);
  const [isHidePassword, setIsHidePassword] = useState(true);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View
        style={{ ...styles.container, marginTop: openKeyboard ? 150 : 270 }}
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
                setState((prevState) => ({ ...prevState, password: value }))
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
        <Text onPress={() => setIsLoginScreen(true)} style={styles.loginLink}>
          Already have an account? Log In
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 90,
    paddingBottom: 80,
    backgroundColor: "#fff",
    // alignItems: "center",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    // marginTop: 250,
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
