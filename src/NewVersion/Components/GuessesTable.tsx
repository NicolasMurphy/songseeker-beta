import React, { useState, useEffect, useCallback } from "react";
import useStore from "../store/useStore";
import getFlagUrl from "../utils/getFlagUrl";
import { checkIfBorders } from "../utils/borderUtils";
import { SmallLoader } from "./Loaders";

const GuessesTable: React.FC = () => {
  const {
    wrongGuesses,
    selectedCountry,
    correctAnswer,
    roundOver,
    score,
    distances,
  } = useStore();

  const getDistanceFeedback = useCallback(
    async (selectedCountry: string, distance: number): Promise<string> => {
      if (await checkIfBorders(selectedCountry, correctAnswer)) {
        return "Borders 🔥🔥🔥";
      } else if (distance > 5000) {
        return "Ice Cold ❄️";
      } else if (distance > 2500) {
        return "Cold 🥶";
      } else if (distance > 1000) {
        return "Warm 🌡️";
      } else if (distance > 500) {
        return "Warmer 🔥";
      } else {
        return "Hot 🔥🔥";
      }
    },
    [correctAnswer]
  );

  const [distanceFeedback, setDistanceFeedback] = useState<{
    [key: string]: string;
  }>({});

  useEffect(() => {
    const fetchFeedback = async () => {
      const feedback: { [key: string]: string } = {};
      for (let i = 0; i < wrongGuesses.length; i++) {
        const guess = wrongGuesses[i];
        if (distances[i] !== undefined) {
          feedback[guess] = await getDistanceFeedback(guess, distances[i]);
        }
      }
      setDistanceFeedback(feedback);
    };

    if (wrongGuesses.length > 0) {
      fetchFeedback();
    }
  }, [wrongGuesses, distances, getDistanceFeedback]);

  return (
    <div className="">
      <table className="table max-w-xs mx-auto">
        <tbody>
          {roundOver && score === 0 && (
            <tr>
              <td className="w-20">
                <img
                  src={getFlagUrl(correctAnswer)}
                  alt={`${correctAnswer} flag`}
                ></img>
              </td>
              <td className="text-left">
                {correctAnswer} was the correct answer.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <table className="table max-w-xs my-4 mx-auto">
        <tbody>
          {wrongGuesses.map((wrongGuess, index) => (
            <tr key={wrongGuess}>
              <td className="w-20">
                <img
                  src={getFlagUrl(wrongGuess)}
                  alt={`${wrongGuess} flag`}
                ></img>
              </td>
              <td className="text-left">{wrongGuess}</td>
              <td>❌</td>
              <td>
                {distances[index] !== undefined ? (
                  distanceFeedback[wrongGuess]
                ) : (
                  <SmallLoader />
                )}
              </td>
            </tr>
          ))}
          {selectedCountry === correctAnswer && (
            <tr>
              <td className="w-20">
                <img
                  src={getFlagUrl(correctAnswer)}
                  alt={`${correctAnswer} flag`}
                ></img>
              </td>
              <td className="text-left">{correctAnswer}</td>
              <td>✔️</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default GuessesTable;
