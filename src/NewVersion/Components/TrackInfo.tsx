import React from "react";
import { TrackInfoProps } from "../utils/types";

const TrackInfo: React.FC<TrackInfoProps> = ({ track, description, link }) => {
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
              <a href={track.link} target="_blank" rel="noopener noreferrer">
                <img
                  className="transition duration-300 ease-in-out hover:scale-105 m-4 w-48 mx-auto"
                  src={track.album.images[0].url}
                  alt="Album Art"
                />
              </a>
            </td>
          </tr>
          <tr>
            <td>{description}</td>
          </tr>
          <tr>
            <td>
              <a
                target="_blank"
                rel="noreferrer"
                href={link}
                className="text-info underline hover:no-underline"
              >
                Read more
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TrackInfo;
