import React from "react";
import useGameStore from "../store/useGameStore";
import getFlagUrl from "../utils/getFlagUrl";

const WrongGuesses: React.FC = () => {
  const { wrongGuesses } = useGameStore();

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
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default WrongGuesses;
