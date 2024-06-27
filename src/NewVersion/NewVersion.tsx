import React, { useState, useEffect } from "react";
import useTracks from "./useTracks";
import getDescriptionOptions from "../utils/DescriptionOptions";
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

  const descriptions: Description[] = getDescriptionOptions();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const checkAnswer = () => {
    if (
      inputValue.toLowerCase() ===
      descriptions[randomIndex as number].country.toLowerCase()
    ) {
      setResult("Correct");
    } else {
      setResult("Wrong");
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="mx-auto mt-40 text-center">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            {tracks.length === 0 || randomIndex === null ? (
              <div>No tracks available</div>
            ) : (
              <section>
                <AudioPlayer src={tracks[randomIndex].preview_url} />
                <input
                  className="input input-bordered w-full max-w-xs m-4"
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  placeholder="Enter country"
                />
                <button className="btn btn-primary m-4" onClick={checkAnswer}>
                  Check
                </button>
                <div>{result}</div>
              </section>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default NewVersion;
