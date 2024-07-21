import React from "react";
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

const HintsTable: React.FC<HintInfoProps> = ({ track, hint }) => {
  const { tracks } = useTracks();
  const { round, guesses, correctAnswer } = useStore();

  const censoredTrackName = censorText(track.name, censoredWords);
  const censoredArtistName = censorText(track.artists[0].name, censoredWords);
  const censoredAlbumName = censorText(track.album.name, censoredWords);

  return (
    <>
      {guesses < 5 && tracks.length !== 0 && round !== null && (
        <div className="card bg-base-300 text-base-content my-4 mx-auto w-full max-w-xs">
          <table className="table max-w-xs text-center my-4">
            <tbody>
              {guesses < 5 && (
                <tr>
                  <td>
                    Album art:
                    <img
                      src={track.album.images[0].url}
                      alt={`${track.name} album art`}
                      className="mx-auto m-4 w-48"
                      style={{ filter: "blur(10px)" }}
                    />
                  </td>
                </tr>
              )}
              {guesses < 4 && (
                <tr>
                  <td>
                    {censoredTrackName} - {censoredArtistName} - {censoredAlbumName}
                  </td>
                </tr>
              )}
              {guesses < 3 && (
                <tr>
                  <td>The country starts with "{correctAnswer[0]}".</td>
                </tr>
              )}
              {guesses < 2 && (
                <tr>
                  <td>Hint: {hint}</td>
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
