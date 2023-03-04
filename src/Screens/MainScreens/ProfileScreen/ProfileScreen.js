import { Text, Button } from "react-native";
import { useDispatch } from "react-redux";
import { authSignOutUser } from "../../../../redux/auth/authOperations";
export const ProfileScreen = () => {
  const dispatch = useDispatch();
  return <Button onPress={() => dispatch(authSignOutUser())} title="log out" />;
};
