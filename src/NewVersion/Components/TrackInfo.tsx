import React from "react";
import useStore from "../store/useStore";
import getDescriptionOptions from "../utils/DescriptionOptions";
import { Description } from "../utils/types";
import useTracks from "../hooks/useTracks";

const HintsTable: React.FC = () => {
  const { tracks } = useTracks();
  const { randomIndex } = useStore();

  const descriptions: Description[] = getDescriptionOptions();

  return (
    <>
      {tracks.length !== 0 && randomIndex !== null && (
        <table className="table max-w-xs text-center my-4">
          <tbody>
            <tr>
              <td>{tracks[randomIndex].name}</td>
            </tr>
            <tr>
              <td>{tracks[randomIndex].artists[0].name}</td>
            </tr>
            <tr>
              <td>
                <img
                  src={tracks[randomIndex].album.images[0].url}
                  alt={`${tracks[randomIndex].name} album art`}
                  className="mx-auto m-4 w-48"
                />
              </td>
            </tr>
            <tr>
              <td>Description: {descriptions[randomIndex].description}</td>
            </tr>
          </tbody>
        </table>
      )}
    </>
  );
};

export default HintsTable;
