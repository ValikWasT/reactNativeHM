import { createStackNavigator } from "@react-navigation/stack";
import { PostsScreen } from "../PostsScreen/PostsScreen";
import { CommentsScreen } from "../CommentsScreen/CommentsScreen";
import { MapScreen } from "../MapScreen/MapScreen";

const HomeStack = createStackNavigator();

export const HomeScreen = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Posts" component={PostsScreen} />
      <HomeStack.Screen name="Comments" component={CommentsScreen} />
      <HomeStack.Screen name="Map" component={MapScreen} />
    </HomeStack.Navigator>
  );
};
