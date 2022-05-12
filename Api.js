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


    getLikes: (tweetId, setLikes) => {
        console.log("getLikes: ", tweetId)
        db.collection("likes").doc(tweetId).onSnapshot((doc) => {
            setLikes(doc.data().likes)
            console.log("getLikes: ", doc.data().likes)
        })
    },

    checkLiked: (tweetId, userId, setLiked) => {
        db.collection("likes").doc(tweetId).onSnapshot((doc) => {
            if(doc.data().people.length > 0){
                doc.data().people.forEach(person => {
                    if(person === userId){
                        setLiked(true)
                    }
                })
            } else{
                console.log("includes: ", false)
            }
        })
    }
}