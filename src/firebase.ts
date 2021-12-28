import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, set } from "firebase/database";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { IUser } from "./types/User";

const firebaseConfig = {
  apiKey: "AIzaSyB3lB5o1VdHO61r_H77F2Vd337FbB4LVMw",
  authDomain: "sitometer.firebaseapp.com",
  databaseURL:
    "https://sitometer-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "sitometer",
  storageBucket: "sitometer.appspot.com",
  messagingSenderId: "706433847577",
  appId: "1:706433847577:web:94f614d58e2c0c3b377588",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();
const auth = getAuth();

export async function signIn(email: string, password: string) {
  return await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log("Current User:", auth.currentUser);

      return userCredential;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
}

export async function signOutUser() {
  return await signOut(auth);
}

export function getCurrentUser() {
  return auth.currentUser;
}

export async function getUserList() {
  const userRef = ref(db, "/users");
  try {
    const data = await get(userRef).then((snapshot) => {
      const userList: IUser[] = [];
      snapshot.forEach((childSnap) => {
        userList.push({
          userId: childSnap.key ?? "",
          userVote: childSnap.val().vote,
        });
      });

      return userList;
    });
    return data;
  } catch (error) {
    console.log(error);
  }
  return [];
}

export async function updateUserState(userId: string, state: boolean) {
    const userRef = ref(db, `/users/${userId}`);

    return set(userRef, {
        vote: state,
    })
}