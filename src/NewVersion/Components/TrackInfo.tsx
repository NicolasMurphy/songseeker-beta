import React from "react";
import useStore from "../store/useStore";
import getFlagUrl from "../utils/getFlagUrl";
import { TrackInfoProps } from "../utils/types";

const TrackInfo: React.FC<TrackInfoProps> = ({ track, description, link }) => {
  const { correctAnswer } = useStore();
  return (
    <div className="card bg-base-300 text-base-content my-4 max-w-xs mx-auto">
      <table className="table max-w-xs text-center my-2 mx-auto">
        <tbody>
          <tr>
            <td className="text-3xl">{track.name}</td>
          </tr>
          <tr>
            <td className="text-xl">{track.artists[0].name}</td>
          </tr>
        </tbody>
      </table>
      <div className="mx-auto flex justify-center items-center my-2">
        <div className="text-center">{correctAnswer}</div>
        <span className="ml-4">
          <img
            className="w-16"
            src={getFlagUrl(correctAnswer)}
            alt={`${correctAnswer} flag`}
          />
        </span>
      </div>
      <table className="table max-w-xs text-center my-2 mx-auto">
        <tbody>
          <tr>
            <td>
              <a href={track.link} target="_blank" rel="noopener noreferrer">
                <img
                  className="transition duration-300 ease-in-out hover:scale-105 w-48 mx-auto"
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
