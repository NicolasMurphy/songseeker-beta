import React from "react";
import useStore from "../store/useStore";
import getFlagUrl from "../utils/getFlagUrl";

const GuessesTable: React.FC = () => {
  const {
    wrongGuesses,
    selectedCountry,
    correctAnswer,
    gameOver,
    score,
    distances,
  } = useStore();

  const getDistanceFeedback = (distance: number) => {
    if (distance > 6000) {
      return "Ice Cold ❄️";
    } else if (distance > 4000) {
      return "Cold 🥶";
    } else if (distance > 2000) {
      return "Warm 🌡️";
    } else if (distance > 1000) {
      return "Warmer 🔥";
    } else if (distance > 500) {
      return "Hot 🔥🔥";
    } else {
      return "Burning Up 🔥🔥🔥";
    }
  };

  return (
    <>
      <table className="table w-100">
        <tbody>
          {gameOver && score === 0 && (
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
      <table className="table w-100 my-4">
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
                {distances[index] !== undefined
                  ? getDistanceFeedback(distances[index])
                  : ""}
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
    </>
  );
};

export default GuessesTable;
