import React from "react";
import { TrackInfoProps } from "../utils/types";

const TrackInfo: React.FC<TrackInfoProps> = ({ track, description }) => {
  return (
    <div className="card bg-base-300 text-base-content my-4">
    <table className="table max-w-xs text-center my-4 mx-auto">
      <tbody>
        <tr>
          <td>{track.name}</td>
        </tr>
        <tr>
          <td>{track.artists[0].name}</td>
        </tr>
        <tr>
          <td>
            <img
              src={track.album.images[0].url}
              alt={`${track.name} album art`}
              className="mx-auto m-4 w-48"
            />
          </td>
        </tr>
        <tr>
          <td>{description}</td>
        </tr>
      </tbody>
    </table>
    </div>
  );
};

export default TrackInfo;
