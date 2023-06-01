import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import app from "../firebaseConfig";

const db = getFirestore(app);

function Image() {
  const { id } = useParams();
  const [image, setImage] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const getImage = async () => {
      try {
        const docRef = doc(db, "images", id);
        const docSnapshot = await getDoc(docRef);
        if (docSnapshot.exists()) {
          setImage(docSnapshot.data().url);
          setUserId(docSnapshot.data().userId);
        } else {
          setImage(null);
          setUserId(null);
          console.error("Image doesn't exist:", id);
        }
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    getImage();
  }, [id]);

  if (!image) {
    return (
      <div className="alert alert-warning" role="alert">
        Loading...
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="card">
        <img src={image} className="card-img-top" alt="uploaded" />
        <div className="card-body">
          <h5 className="card-title">Image</h5>
          <p className="card-text">Uploaded by User ID: {userId}</p>
        </div>
      </div>
    </div>
  );
}

export default Image;
