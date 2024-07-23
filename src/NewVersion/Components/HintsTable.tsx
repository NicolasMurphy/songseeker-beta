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

  const getBlurAmount = () => {
    switch (guesses) {
      case 5:
        return "blur(10px)";
      case 4:
        return "blur(8px)";
      case 3:
        return "blur(6px)";
      case 2:
        return "blur(4px)";
      case 1:
        return "blur(2px)";
      default:
        return "none";
    }
  };

  const censoredTrackName = censorText(track.name, censoredWords);
  const censoredArtistName = censorText(track.artists[0].name, censoredWords);
  const censoredAlbumName = censorText(track.album.name, censoredWords);

  return (
    <>
      {tracks.length !== 0 && round !== null && (
        <div className="card bg-base-300 text-base-content my-4 mx-auto w-full max-w-xs">
          <h1 className="mt-4 text-xl">Hints</h1>
          <table className="table max-w-xs text-center my-4">
            <tbody>
              <tr>
                <td>
                  Album art:
                  <img
                    src={track.album.images[0].url}
                    alt={`${track.name} album art`}
                    className="mx-auto m-4 w-48"
                    style={{ filter: getBlurAmount() }}
                  />
                </td>
              </tr>
              {guesses < 5 && (
                <tr>
                  <td>
                    Hint placeholder
                  </td>
                </tr>
              )}
              {guesses < 4 && (
                <tr>
                  <td>
                    {censoredTrackName} - {censoredArtistName} -{" "}
                    {censoredAlbumName}
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
