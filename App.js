import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { useState } from "react";
import { Provider } from "react-redux";
import { getAuth, onAuthStateChanged } from "@firebase/auth";
import { useRoute } from "./router";
import { store } from "./redux/store";
import { app } from "./firebase/config";

export default function App() {
  const [user, setUser] = useState(null);
  const auth = getAuth(app);
  onAuthStateChanged(auth, (user) => setUser(user));
  const content = useRoute(user);
  return (
    <Provider store={store}>
      <NavigationContainer>{content}</NavigationContainer>
    </Provider>
  );
}
