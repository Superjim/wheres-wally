import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import app from "../firebaseConfig";

const db = getFirestore(app);

function Image() {
  const { id } = useParams();
  const [image, setImage] = useState(null);

  useEffect(() => {
    const getImage = async () => {
      try {
        const docRef = doc(db, "images", id);
        const docSnapshot = await getDoc(docRef);
        if (docSnapshot.exists()) {
          setImage(docSnapshot.data());
        } else {
          setImage(null);
          console.error("Image doesn't exist:", id);
        }
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    getImage();
  }, [id]);

  if (!image) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Image</h2>
      <img src={image.url} alt="uploaded" />
    </div>
  );
}

export default Image;
