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
    return (
      <div className="alert alert-danger" role="alert">
        Please login to create a game
      </div>
    );
  }

  return (
    <div className="create-game container mt-5">
      <form>
        <div className="mb-3">
          <label htmlFor="gameFile" className="form-label">
            Upload Game Image
          </label>
          <input
            type="file"
            className="form-control"
            id="gameFile"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          {progress > 0 && (
            <div className="progress">
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: `${progress}%` }}
                aria-valuenow={progress}
                aria-valuemin="0"
                aria-valuemax="100"
              >
                {progress}%
              </div>
            </div>
          )}
        </div>
        {url && (
          <div className="mb-3">
            <img src={url} alt="uploaded" className="img-thumbnail" />
          </div>
        )}
        {error && (
          <div className="alert alert-danger" role="alert">
            Error: {error.message}
          </div>
        )}
      </form>
    </div>
  );
}

export default CreateGame;
