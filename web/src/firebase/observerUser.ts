import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase-init";

export function observerUser() {
  return onAuthStateChanged(auth, (user) => {
    console.log(user)
    if (user) {
      const userExists = user
      return userExists
    } else {
     return null
    }
  });
}
