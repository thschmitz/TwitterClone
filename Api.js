import firebase from "firebase/compat/app";
import "firebase/compat/auth"
import "firebase/compat/firestore"

import firebaseConfig from "./firebaseConfig"

const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();


export default{

    addLikes: (tweetId, userId) => {
        console.log("addLikes: ", tweetId, userId)
        db.collection("likes").doc("teste").post({
            likes: firebase.firestore.FieldValue.arrayUnion(userId)
        })
    }
}