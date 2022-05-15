import firebase from "firebase/compat/app";
import "firebase/compat/auth"
import "firebase/compat/firestore"

import firebaseConfig from "./firebaseConfig"

const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();


export default{

    addLikes: (tweetId, userId) => {
        const increment = firebase.firestore.FieldValue.increment(1)

        db.collection("likes").doc(tweetId).set({
            likes: increment,
            people: firebase.firestore.FieldValue.arrayUnion(userId)
        }, {merge:true})
    },

    removeLikes: (tweetId, userId) => {
        const decrement = firebase.firestore.FieldValue.increment(-1)

        db.collection("likes").doc(tweetId).set({
            likes: decrement,
            people: firebase.firestore.FieldValue.arrayRemove(userId)
        }, {merge:true})
    },

    addPost: (tweetId) => {
        db.collection("likes").doc(tweetId).set({
            likes: 0,
            people: []
        })
    },


    getLikes: (tweetId, setLikes) => {
        db.collection("likes").doc(tweetId).onSnapshot((doc) => {
            setLikes(doc.data().likes)
        })
    },

    checkLiked: (tweetId, userId, setLiked) => {

        db.collection("likes").doc(tweetId).onSnapshot((doc) => {
            if(doc.data().people){
                if(doc.data().people.includes(userId)){
                    setLiked(true)
                }
            } else{
                setLiked(false)
            }
        })
    }
}