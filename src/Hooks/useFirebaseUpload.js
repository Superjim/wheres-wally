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

const useFirebaseUpload = (image, user, coordinates, radius, shouldUpload) => {
  const [progress, setProgress] = useState(0);
  const [url, setUrl] = useState(null);
  const [error, setError] = useState(null);
  const [isUploaded, setIsUploaded] = useState(false);

  useEffect(() => {
    if (shouldUpload && image && image.type.includes("image/") && user) {
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
          setIsUploaded(false);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL) => {
              setUrl(downloadURL);

              addDoc(collection(db, "images"), {
                url: downloadURL,
                userId: user.uid,
                coordinates: coordinates,
                radius: radius,
              })
                .then((docRef) => {
                  setIsUploaded(true);
                })
                .catch((err) => {
                  setError(err);
                  setIsUploaded(false);
                });
            })
            .catch((err) => {
              setError(err);
              setIsUploaded(false);
            });
        }
      );
    }
  }, [image, user, coordinates, radius, shouldUpload]);

  return { progress, url, error, isUploaded, setIsUploaded };
};

export default useFirebaseUpload;
