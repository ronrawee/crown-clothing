import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBh80Cn71kHFZSdtLW_vtikVWoYXA5NSp4",
  authDomain: "crwn-db-3e906.firebaseapp.com",
  databaseURL: "https://crwn-db-3e906.firebaseio.com",
  projectId: "crwn-db-3e906",
  storageBucket: "crwn-db-3e906.appspot.com",
  messagingSenderId: "216763801076",
  appId: "1:216763801076:web:c629736d0289bbc65bada1",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
