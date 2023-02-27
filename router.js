import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";

import { RegistrationScreen } from "./src/Screens/AuthScreens/RegistrationScreen/RegistrationScreen";
import { LoginScreen } from "./src/Screens/AuthScreens/LoginScreen/LoginScreen";
import { CreatePostsScreen } from "./src/Screens/MainScreens/CreatePostsScreen/CreatePostsScreen";
import { ProfileScreen } from "./src/Screens/MainScreens/ProfileScreen/ProfileScreen";
import { HomeScreen } from "./src/Screens/MainScreens/HomeScreen/HomeScreen";

const AuthStack = createStackNavigator();
const MainTab = createBottomTabNavigator();

export const useRoute = (isAuth) => {
  if (!isAuth) {
    return (
      <AuthStack.Navigator>
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        />
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Register"
          component={RegistrationScreen}
        />
      </AuthStack.Navigator>
    );
  }
  return (
    <MainTab.Navigator
      screenOptions={{
        tabBarStyle: { paddingHorizontal: 60 },
        tabBarShowLabel: false,
      }}
    >
      <MainTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: () => <Feather name="grid" size={24} color="#212121CC" />,
        }}
      />
      <MainTab.Screen
        name="CreatePosts"
        component={CreatePostsScreen}
        options={{
          headerLeft: () => (
            <Feather name="arrow-left" size={24} color="#212121CC" />
          ),
          headerLeftContainerStyle: { marginLeft: 16 },
          tabBarIcon: () => <Feather name="plus" size={24} color="#fff" />,
          tabBarItemStyle: {
            height: 40,
            width: 70,
            backgroundColor: "#FF6C00",
            borderRadius: 20,
            marginTop: 5,
          },
          headerTitleAlign: "center",
          headerTitle: "Create post",
          tabBarHideOnKeyboard: true,
        }}
      />
      <MainTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: () => <Feather name="user" size={24} color="#212121CC" />,
          headerTitleAlign: "center",
          headerTitle: "Profile",
        }}
      />
    </MainTab.Navigator>
  );
};
