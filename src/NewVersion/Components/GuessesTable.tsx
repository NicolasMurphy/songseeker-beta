import React from "react";
import useStore from "../store/useStore";
import getFlagUrl from "../utils/getFlagUrl";

const GuessesTable: React.FC = () => {
  const { wrongGuesses, selectedCountry, correctAnswer } = useStore();

  return (
    <table className="table w-100">
      <tbody>
        {wrongGuesses.map((wrongGuess) => (
          <tr key={wrongGuess}>
            <td className="w-20">
              <img
                src={getFlagUrl(wrongGuess)}
                alt={`${wrongGuess} flag`}
              ></img>
            </td>
            <td className="text-left">{wrongGuess}</td>
            <td>Wrong</td>
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
            <td>Correct</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default GuessesTable;
