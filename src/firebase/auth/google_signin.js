import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../firebase";

const provider = new GoogleAuthProvider();

const signInWithGoogle = async (navigate) => {
  try{
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)

    // Redirect to home page after successful sign in
    navigate("/"); //navigate param from react-router

  } catch (error) {
      // Handle Errors here.
      const errorMessage = error.message;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
  };
};

const signUpWithGoogle = async(navigate) => {
  try {
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)

    // Redirect to home page after successful sign in
    navigate("/onboarding"); //navigate param from react-router
    } catch (error){
      // Handle Errors here.
      const errorMessage = error.message;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    };
};

// Should we export the sign-in user info so firestore-related files can get this info?

export { auth, provider, signInWithGoogle, signUpWithGoogle };
