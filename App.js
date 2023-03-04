import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { useRoute } from "./router";
import { store } from "./redux/store";

export default function App() {
  const content = useRoute(false);
  return (
    <Provider store={store}>
      <NavigationContainer>{content}</NavigationContainer>
    </Provider>
  );
}
