import React, { useEffect, useState } from "react";
import useStore from "../store/useStore";
import useTracks from "../hooks/useTracks";
import { HintInfoProps } from "../utils/types";
import { censoredWords } from "../utils/censoredWords";

const censorText = (text: string, words: string[]) => {
  let censoredText = text;
  words.forEach((word: string) => {
    const regex = new RegExp(word, "gi");
    censoredText = censoredText.replace(regex, "[REDACTED]");
  });
  return censoredText;
};

const HintsTable: React.FC<HintInfoProps> = ({ track }) => {
  const { tracks } = useTracks();
  const { round, guesses, correctAnswer } = useStore();
  const [countryData, setCountryData] = useState<any>(null);

  useEffect(() => {
    if (correctAnswer) {
      fetch(`https://restcountries.com/v3.1/name/${correctAnswer}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch country data");
          }
          return response.json();
        })
        .then((data) => {
          setCountryData(data[0]);
        })
        .catch((error) => {
          console.error("Error fetching country data:", error);
        });
    }
  }, [correctAnswer, setCountryData]);

  const censoredTrackName = censorText(track.name, censoredWords);
  const censoredArtistName = censorText(track.artists[0].name, censoredWords);
  const censoredAlbumName = censorText(track.album.name, censoredWords);

  return (
    <>
      {tracks.length !== 0 && round !== null && (
        <div className="card bg-base-300 text-base-content my-4 mx-auto w-full max-w-xs">
          <h1 className="mt-4 text-xl">Hints:</h1>
          <table className="table max-w-xs text-center my-4">
            <tbody>
              {guesses < 5 && (
                <tr>
                  <td>
                    {censoredTrackName} - {censoredArtistName} -{" "}
                    {censoredAlbumName}
                  </td>
                </tr>
              )}
              {guesses < 4 && (
                <tr>
                  <td>Population: {countryData.population.toLocaleString()}</td>
                </tr>
              )}
              {guesses < 3 && (
                <tr>
                  <td>
                    Subregion: {Object.values(countryData.subregion)}
                  </td>
                </tr>
              )}
              {guesses < 2 && (
                <tr>
                  <td>The country starts with "{correctAnswer[0]}".</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default HintsTable;
