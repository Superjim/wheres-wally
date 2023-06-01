import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
          const userGames = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
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

  const copyLink = (id) => {
    const link = `https://whereswally.netlify.app/game/${id}`;
    navigator.clipboard.writeText(link);
  };

  if (!games) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <h1>Your Games</h1>
      <div className="row">
        {games.map((game, index) => (
          <div className="col-md-4" key={index}>
            <div className="card mb-4">
              <img src={game.url} alt="uploaded" className="card-img-top" />
              <div className="card-body">
                <h5 className="card-title">Game ID: {game.id}</h5>
                <button
                  className="btn btn-primary me-2"
                  onClick={() => copyLink(game.id)}
                >
                  Copy Link
                </button>
                <Link to={`/image/${game.id}`} className="btn btn-secondary">
                  Go to Image
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserGames;
