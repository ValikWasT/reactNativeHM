import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from "../../firebase/config";

const authSignInUser = () => async (dispatch, getSatte) => {};

export const authSignUpUser =
  ({ email, password, nickname }) =>
  async (dispatch, getSatte) => {
    try {
      const auth = getAuth(app);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
    } catch (error) {
      console.log("error", error);
      console.log("error.message", error.message);
    }
  };

const authSignOutUser = () => async (dispatch, getSatte) => {};
