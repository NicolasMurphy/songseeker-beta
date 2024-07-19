// Here is the component for the hints table, plan is to reveal more and more information about the track at each wrong guess
// Perhaps:
// 1 Wrong Guess: Track name
// 2 Wrong Guesses: Artist name
// 3 Wrong Guesses: Album art
// 4 Wrong Guesses: Track Description

import React from "react";
import useStore from "../store/useStore";
import getDescriptionOptions from "../../utils/DescriptionOptions";
import { Description } from "../utils/types";
import useTracks from "../hooks/useTracks";

const HintsTable: React.FC = () => {
  const { tracks } = useTracks();
  const { round, guesses } = useStore();

  const descriptions: Description[] = getDescriptionOptions();

  return (
    <>
      {tracks.length !== 0 && round !== null && (
        <table className="table max-w-xs text-center my-4">
          <tbody>
            {guesses < 5 && (
              <tr>
                <td>Track title: {tracks[round - 1].name}</td>
              </tr>
            )}
            {guesses < 4 && (
              <tr>
                <td>Track title: {tracks[round - 1].artists[0].name}</td>
              </tr>
            )}
            {guesses < 3 && (
              <tr>
                <td>
                  Album art:
                  <img
                    src={tracks[round - 1].album.images[0].url}
                    alt={`${tracks[round - 1].name} album art`}
                    className="mx-auto m-4 w-16 h-16"
                  />
                </td>
              </tr>
            )}
            {guesses < 2 && (
              <tr>
                <td>Description: {descriptions[round - 1].description}</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </>
  );
};

export default HintsTable;
