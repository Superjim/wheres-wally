import { useState } from "react";
import useFirebaseUpload from "../Hooks/useFirebaseUpload";

function Home() {
  const [file, setFile] = useState(null);
  const { url, progress, error } = useFirebaseUpload(file);

  const handleChange = (e) => {
    let selected = e.target.files[0];
    setFile(selected);
  };

  return (
    <div className="home">
      <input type="file" onChange={handleChange} />
      <div>Progress: {progress}%</div>
      {url && <img src={url} alt="uploaded" />}
      {error && <div>Error: {error.message}</div>}
    </div>
  );
}

export default Home;
