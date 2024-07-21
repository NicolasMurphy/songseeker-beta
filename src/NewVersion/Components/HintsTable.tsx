// Here is the component for the hints table, plan is to reveal more and more information about the track at each wrong guess
// Perhaps:
// 1 Wrong Guess: Track name (need to censor if country name is here)
// 2 Wrong Guesses: Artist name (need to censor if country name is here)
// 3 Wrong Guesses: Album art (need to blur if country name or flag is here)
// 4 Wrong Guesses: Track Description
// Other ideas: Release date, language, instruments used, continent, starting letter, how many letters in the country

import React from "react";
import useStore from "../store/useStore";
import useTracks from "../hooks/useTracks";
import { HintInfoProps } from "../utils/types";

const HintsTable: React.FC<HintInfoProps> = ({ track, hint }) => {
  const { tracks } = useTracks();
  const { round, guesses } = useStore();

  return (
    <>
      {guesses < 5 && tracks.length !== 0 && round !== null && (
        <div className="card bg-base-300 text-base-content my-4 mx-auto max-w-xs">
          <table className="table max-w-xs text-center my-4">
            <tbody>
              {guesses < 5 && (
                <tr>
                  <td>Track: {track.name}</td>
                </tr>
              )}
              {guesses < 4 && (
                <tr>
                  <td>
                    Artist: {track.artists[0].name}
                  </td>
                </tr>
              )}
              {guesses < 3 && (
                <tr>
                  <td>
                    Album art:
                    <img
                      src={track.album.images[0].url}
                      alt={`${track.name} album art`}
                      className="mx-auto m-4 w-48"
                    />
                  </td>
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
