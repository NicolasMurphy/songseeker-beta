import React, { useState, useEffect } from "react";
import useTracks from "./useTracks";
import getDescriptionOptions from "../utils/DescriptionOptions";
import ErrorMessage from "./ErrorMessage";
import AudioPlayer from "./AudioPlayer";

interface Description {
  description: string;
  country: string;
}

const getRandomInt = (max: number): number => {
  return Math.floor(Math.random() * max);
};

const NewVersion: React.FC = () => {
  const { tracks, loading, error } = useTracks();
  const [inputValue, setInputValue] = useState("");
  const [result, setResult] = useState("");
  const [randomIndex, setRandomIndex] = useState<number | null>(null);

  useEffect(() => {
    const descriptions: Description[] = getDescriptionOptions();
    setRandomIndex(getRandomInt(descriptions.length));
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (tracks.length === 0 || randomIndex === null) {
    return <div>No tracks available</div>;
  }

  const descriptions: Description[] = getDescriptionOptions();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const checkAnswer = () => {
    if (
      inputValue.toLowerCase() ===
      descriptions[randomIndex].country.toLowerCase()
    ) {
      setResult("Correct");
    } else {
      setResult("Wrong");
    }
  };

  return (
    <div className="min-h-screen text-center">
      <AudioPlayer src={tracks[randomIndex].preview_url} />
      <input
      className="input input-bordered w-full max-w-xs m-2"
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter country"
      />
      <button className="btn btn-primary" onClick={checkAnswer}>Check</button>
      <div>{result}</div>
    </div>
  );
};

export default NewVersion;
