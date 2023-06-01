import { useState } from "react";
import useFirebaseUpload from "../Hooks/useFirebaseUpload";
import { useAuth } from "../Hooks/useAuth";

function CreateGame() {
  const { user } = useAuth();
  const [file, setFile] = useState(null);

  const { url, progress, error } = useFirebaseUpload(file, user);

  const handleChange = (e) => {
    if (user) {
      let selected = e.target.files[0];
      setFile(selected);
    } else {
      console.log("Please login to create a game");
    }
  };

  if (!user) {
    return <div>Please login to create a game</div>;
  }

  return (
    <div className="create-game">
      <input type="file" onChange={handleChange} />
      <div>Progress: {progress}%</div>
      {url && <img src={url} alt="uploaded" />}
      {error && <div>Error: {error.message}</div>}
    </div>
  );
}

export default CreateGame;
