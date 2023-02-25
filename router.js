import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";

import { RegistrationScreen } from "./assets/Screens/AuthScreens/RegistrationScreen/RegistrationScreen";
import { LoginScreen } from "./assets/Screens/AuthScreens/LoginScreen/LoginScreen";
import { PostsScreen } from "./assets/Screens/MainScreens/PostsScreen/PostsScreen";
import { CreatePostsScreen } from "./assets/Screens/MainScreens/CreatePostsScreen/CreatePostsScreen";
import { ProfileScreen } from "./assets/Screens/MainScreens/ProfileScreen/ProfileScreen";

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
        name="Posts"
        component={PostsScreen}
        options={{
          tabBarIcon: () => <Feather name="grid" size={24} color="#212121CC" />,
          headerRightContainerStyle: { marginRight: 10 },
          headerRight: () => (
            <Feather name="log-out" size={24} color="#BDBDBD" />
          ),
          headerTitleAlign: "center",
          headerTitle: "Posts",
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
