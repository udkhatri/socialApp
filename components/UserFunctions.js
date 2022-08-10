import { db, auth, fs} from "../firebase";
import firebase from "firebase/app";

export const fetchUser = (userId, callback) => {
  const id = auth.currentUser.uid;
  db
    .collection("users")
    .doc(id)
    .onSnapshot((snapshot) => {
      if (snapshot.exists) {
        callback(snapshot.data());
      } else {
        console.log("errors: snapshot not exist");
      }
    });
};
export const fetchUserById = (userId, callback) => {
  console.log("userId: ", userId);
  db
    .collection("users")
    .doc(userId)
    .onSnapshot((snapshot) => {
      if (snapshot.exists) {
        callback(snapshot.data());
      } else {
        console.log("errors: snapshot not exist");
      }
    });
};

export const savePost = (postID) => {
  const id = auth.currentUser.uid;
  db
  .collection("users")
    .doc(id)
    .update({
      savedPost: firebase.firestore.FieldValue.arrayUnion(postID),
    })
    .catch((error) => {
      console.log('error', error);
    });
};
export const removeSavedPost = (postID) => {
  const id = auth.currentUser.uid;
  db
  .collection("users")
    .doc(id)
    .update({
      savedPost: firebase.firestore.FieldValue.arrayRemove(postID),
    })
    .catch((error) => {
      console.log('error', error);
    });
};
export const setUserData = async (userId, data) => {
  console.log("setUserData", userId, data);
  db
    .collection("users")
    .doc(userId)
    .update(data)
}
export const fetchUserPosts = async (userId, callback) => {
  console.log("fetching posts",userId);
  var Posts = [];
  await db
    .collection("posts")
    .where("userId", "==", userId)
    .orderBy("creation", "desc")
    .get()
    .then(async(snapshot) => {
      await Promise.all(
        snapshot.docs.map(async(doc) => {
          const data = doc.data();
          data.id = doc.id;
          const allDataWithUser = await data.postBy.get();
          data.postBy = allDataWithUser.data();
          Posts.push(data);
        })
      ).then(() => {
        callback(Posts);
      })
    });
};
export const fetchAllPosts = async (callback) => {
  var Posts = [];
  await db
    .collection("posts")
    .orderBy("creation", "desc")
    .get()
    .then(async(snapshot) => {
      await Promise.all(
        snapshot.docs.map(async(doc) => {
          const data = doc.data();
          data.id = doc.id;
          const allDataWithUser = await data.postBy.get();
          data.postBy = allDataWithUser.data();
          Posts.push(data);
        })
      ).then(() => {
        console.log("Posts",Posts.length);
        callback(Posts);
      })
    });
};
