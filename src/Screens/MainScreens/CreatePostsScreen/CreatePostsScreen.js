import "react-native-get-random-values";
import { Feather } from "@expo/vector-icons";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  uploadBytes,
} from "firebase/storage";
import * as Location from "expo-location";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { nanoid } from "nanoid";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { Camera } from "expo-camera";
import { TextInput } from "react-native-gesture-handler";
import { storage } from "../../../../firebase/config";

const initialState = {
  uri: "",
  title: "",
  location: { latitude: "", longitude: "" },
  locationTitle: "",
};

export const CreatePostsScreen = ({ navigation }) => {
  const [state, setState] = useState(initialState);
  const [camera, setCamera] = useState(null);
  const [postReady, setPostReady] = useState(false);

  const { userId, nickName } = useSelector((state) => state.auth);

  console.log(userId, nickName);

  useEffect(() => {
    (async () => {
      let cameraStatus = await Camera.requestCameraPermissionsAsync();
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted" || !cameraStatus.granted) {
        console.log("Permission to access location was denied");
        return;
      }
    })();
  }, []);

  useEffect(() => {
    const { uri, title, locationTitle } = state;
    if (uri !== "" && title !== "" && locationTitle !== "") {
      setPostReady(true);
      return;
    }
    setPostReady(false);
  }, [state]);

  const takePhoto = async () => {
    const photo = await camera.takePictureAsync();
    setState((prevState) => ({ ...prevState, uri: photo.uri }));
  };

  const sendPhoto = async () => {
    const location = (await Location.getCurrentPositionAsync()).coords;
    const readyState = {
      ...state,
      location: { latitude: location.latitude, longitude: location.longitude },
    };
    await uploadPhotoToServer();
    navigation.navigate("Posts", { readyState });
  };

  // const uploadPhotoToServer = async () => {
  //   const storage = getStorage(app);
  //   const response = await fetch(state.uri);
  //   const file = await response.blob();

  //   const uniquePostId = uuidv4();
  //   const storageRef = await ref(storage, `posts/${uniquePostId}`);
  //   await uploadBytes(storageRef, file);

  //   const processedPhoto = await getDownloadURL(
  //     ref(storage, `postImage/${uniquePostId}`)
  //   );

  //   return processedPhoto;
  // };

  const uploadPhotoToServer = async () => {
    const uniquePostId = nanoid();
    const storageRef = ref(storage, `images/qwerty`);
    fetch(state.uri)
      .then((r) => r.blob())
      .then((res) => uploadBytes(storageRef, res));
    // console.log(state.uri);
    // const firebaseApp = getStorage(app);
    // const storage = getStorage(firebaseApp, "gs://reactnativehm.appspot.com/");
    // const response = await (await fetch(state.uri)).blob();
    // // const file = await response.blob();
    // console.log(response);

    // const result = await uploadBytesResumable(storageRef, response);
    // await getDownloadURL(result.ref);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.cameraBox}>
        <Camera style={styles.camera} ref={setCamera}>
          <TouchableOpacity
            style={{
              ...styles.snapBox,
              backgroundColor: state.uri !== "" ? "#FFFFFF4D" : "#fff",
            }}
            onPress={takePhoto}
          >
            <Feather
              name="camera"
              size={24}
              color={state.uri !== "" ? "#FFFFFF" : "#BDBDBD"}
            />
          </TouchableOpacity>
        </Camera>
      </View>
      <Text style={styles.description}>
        {state.uri === "" ? "Please load photo" : "Edit photo"}
      </Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Title"
          placeholderTextColor="#BDBDBD"
          onChangeText={(value) =>
            setState((prevState) => ({ ...prevState, title: value }))
          }
        />
        <View style={styles.location}>
          <Feather
            style={styles.locationIcon}
            name="map-pin"
            size={18}
            color="#BDBDBD"
          />
          <TextInput
            style={{ ...styles.input, paddingLeft: 28 }}
            placeholder="Location"
            placeholderTextColor="#BDBDBD"
            onChangeText={(value) =>
              setState((prevState) => ({ ...prevState, locationTitle: value }))
            }
          />
        </View>
        <TouchableOpacity
          disabled={!postReady}
          activeOpacity={0.8}
          style={{
            ...styles.btn,
            backgroundColor: postReady ? "#FF6C00" : "#F6F6F6",
          }}
          onPress={sendPhoto}
        >
          <Text
            style={{ ...styles.btnText, color: postReady ? "#fff" : "#BDBDBD" }}
          >
            Load
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 32,
    backgroundColor: "#E5E5E5",
  },
  cameraBox: {
    marginHorizontal: 16,
  },
  camera: {
    justifyContent: "center",
    alignItems: "center",
    height: 240,
  },
  snapBox: {
    width: 60,
    height: 60,
    borderRadius: 50,

    justifyContent: "center",
    alignItems: "center",
  },
  description: {
    color: "#BDBDBD",
    fontSize: 16,
    lineHeight: 19,
    marginTop: 8,
    marginLeft: 16,
  },
  form: {
    marginTop: 40,
    marginHorizontal: 16,
  },
  input: {
    height: 30,
    color: "#212121",
    paddingBottom: 15,
    fontSize: 16,
    lineHeight: 19,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
  },
  location: {
    marginTop: 30,
    position: "relative",
  },
  locationIcon: {
    position: "absolute",
    top: -3,
  },
  btn: {
    marginTop: 32,
    height: 50,
    width: "100%",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    fontSize: 16,
    lineHeight: 19,
  },
});
