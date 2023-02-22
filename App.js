import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
// import { useState } from "react";
import { useRoute } from "./router";

export default function App() {
  return <NavigationContainer>{useRoute(true)}</NavigationContainer>;
}
