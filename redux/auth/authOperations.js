import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { app } from "../../firebase/config";
import { authSlice } from "./authSlice";

export const authSignInUser =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      const auth = getAuth(app);
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      dispatch(authSlice.actions.updateUserProfile({ userId: user.uid }));
    } catch (error) {
      console.log("error", error);
      console.log("error.message", error.message);
    }
  };

export const authSignUpUser =
  ({ email, password, login }) =>
  async (dispatch, getState) => {
    try {
      const auth = getAuth(app);

      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(user, { displayName: login });

      const { displayName, uid } = await auth.currentUser;

      const userUpdateProfile = {
        nickName: displayName,
        userId: uid,
      };

      dispatch(authSlice.actions.updateUserProfile(userUpdateProfile));
    } catch (error) {
      console.log("error", error);
      console.log("error.message", error.message);
    }
  };

const authSignOutUser = () => async (dispatch, getState) => {};
