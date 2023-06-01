import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  getStorage,
} from "firebase/storage";
import { useState, useEffect } from "react";
import { collection, addDoc, getFirestore } from "firebase/firestore";
import app from "../firebaseConfig";

//firebase storage ref
const storage = getStorage(app);

//fireSTORE database ref
const db = getFirestore(app);

const useFirebaseUpload = (image, user) => {
  const [progress, setProgress] = useState(0);
  const [url, setUrl] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (image && image.type.includes("image/") && user) {
      const storageRef = ref(storage, image.name);

      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const percentage =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(percentage);
        },
        (err) => {
          setError(err);
          console.error("Error uploading image:", err);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL) => {
              setUrl(downloadURL);

              addDoc(collection(db, "images"), {
                url: downloadURL,
                userId: user.uid, // store userId in document too
              })
                .then((docRef) => {
                  console.log("document added ID:", docRef.id);
                })
                .catch((err) => {
                  setError(err);
                  console.error("error adding document:", err);
                });
            })
            .catch((err) => {
              setError(err);
              console.error("error getting image URL:", err);
            });
        }
      );
    } else {
      setError(new Error("Invalid file type. Please upload an image."));
    }
  }, [image, user]);

  return { progress, url, error };
};

export default useFirebaseUpload;
