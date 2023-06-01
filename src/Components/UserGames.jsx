import React, { useEffect, useState } from "react";
import { useAuth } from "../Hooks/useAuth";
import { collection, getDocs, where, query } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import app from "../firebaseConfig";

const db = getFirestore(app);

function UserGames() {
  const { user } = useAuth();
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchUserGames = async () => {
      try {
        if (user) {
          const q = query(
            collection(db, "images"),
            where("userId", "==", user.uid)
          );
          const querySnapshot = await getDocs(q);
          const userGames = querySnapshot.docs.map((doc) => doc.data());
          setGames(userGames);
        } else {
          console.log("Please login to see your games");
        }
      } catch (error) {
        console.error("Error fetching user games:", error);
      }
    };

    fetchUserGames();
  }, [user]);

  if (!games) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Your Games</h1>
      {games.map((game, index) => (
        <div key={index}>
          <img src={game.url} alt="uploaded game" />
        </div>
      ))}
    </div>
  );
}

export default UserGames;
