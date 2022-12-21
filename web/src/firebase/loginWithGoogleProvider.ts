import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "./firebase-init";

const provider = new GoogleAuthProvider();

export async function createAccountWithGoogle() {
  try {
    const userCredential = await signInWithPopup(auth, provider)
    const credential = GoogleAuthProvider.credentialFromResult(userCredential);
    const token = credential?.accessToken;
    const user = userCredential.user;
    console.log({token, user})
  } catch(err) {
    throw err
  }
}
signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential?.accessToken;
    // The signed-in user info.
    const user = result.user;
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
