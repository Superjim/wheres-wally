import { useState, useEffect } from "react";
import useFirebaseUpload from "../Hooks/useFirebaseUpload";
import { useAuth } from "../Hooks/useAuth";

function CreateGame() {
  const { user } = useAuth();
  const [file, setFile] = useState(null);
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
  const [radius, setRadius] = useState(15);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isUploaded, setIsUploaded] = useState(false);

  const { url, progress, error } = useFirebaseUpload(
    file,
    user,
    coordinates,
    radius,
    setIsUploaded
  );

  const handleChange = (e) => {
    let selected = e.target.files[0];
    setFile(selected);
    setPreviewUrl(URL.createObjectURL(selected));
  };

  const handleClick = (e) => {
    setCoordinates({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
  };

  const handleUploadClick = () => {
    if (file && user) {
      setIsUploaded(false);
    }
  };

  useEffect(() => {
    if (isUploaded) {
      setPreviewUrl(url);
    }
  }, [isUploaded, url]);

  if (!user) {
    return (
      <div className="alert alert-warning">Please login to create a game</div>
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
          <label htmlFor="gameRadius" className="form-label">
            Select Radius: {radius} pixels
          </label>
          <input
            type="range"
            className="form-range"
            id="gameRadius"
            value={radius}
            onChange={(e) => setRadius(e.target.value)}
            min="10"
            max="50"
          />
        </div>
        <div className="mb-3">
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
        </div>
        {previewUrl && (
          <div
            className="mb-3"
            style={{ position: "relative", display: "inline-block" }}
          >
            <img
              className="img-thumbnail"
              src={previewUrl}
              alt="uploaded"
              onClick={handleClick}
            />
            <svg
              style={{
                position: "absolute",
                top: "0",
                left: "0",
                height: "100%",
                width: "100%",
                pointerEvents: "none",
              }}
            >
              <circle
                cx={coordinates.x}
                cy={coordinates.y}
                r={radius}
                stroke="red"
                strokeWidth="3"
                fill="transparent"
              />
            </svg>
          </div>
        )}
        <p className="mb-3">
          Coordinates: x={coordinates.x}, y={coordinates.y}
        </p>
        {error && (
          <div className="alert alert-danger">Error: {error.message}</div>
        )}
        {!isUploaded && (
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleUploadClick}
          >
            Upload Game
          </button>
        )}
        {isUploaded && (
          <div className="alert alert-success">Upload successful!</div>
        )}
      </form>
    </div>
  );
}

export default CreateGame;
