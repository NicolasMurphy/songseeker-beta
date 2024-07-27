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
    bearings,
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
    <>
      {(wrongGuesses.length > 0 || selectedCountry === correctAnswer) && (
        <div className="card bg-base-300 text-base-content py-4 my-4 mx-auto w-full max-w-xs">
          {roundOver && score === 0 && (
            <table className="table max-w-xs mx-auto my-2 bg-base-100">
              <tbody>
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
              </tbody>
            </table>
          )}
          <table className="table max-w-xs mx-auto">
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
                  {/* <td>❌</td> */}
                  <td>
                    {distances[index] !== undefined ? (
                      distanceFeedback[wrongGuess]
                    ) : (
                      <SmallLoader />
                    )}
                  </td>
                  <td className="w-20 relative">
                    {bearings[index] !== undefined ? (
                      <div
                        className="relative"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          version="1.1"
                          width="100%"
                          height="100%"
                          viewBox="0 0 256 256"
                          xmlSpace="preserve"
                          className="absolute left-0 top-0"
                          fill="#AAAAAA"
                        >
                          <text
                            x="100"
                            y="55"
                            fontSize="4rem"
                            fontWeight="bold"
                          >
                            N
                          </text>
                          <text
                            x="110"
                            y="255"
                            fontSize="4rem"
                            fontWeight="bold"
                          >
                            S
                          </text>
                          <text
                            x="10"
                            y="155"
                            fontSize="4rem"
                            fontWeight="bold"
                          >
                            W
                          </text>
                          <text
                            x="200"
                            y="155"
                            fontSize="4rem"
                            fontWeight="bold"
                          >
                            E
                          </text>
                        </svg>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          version="1.1"
                          width="100%"
                          height="100%"
                          viewBox="0 0 256 256"
                          xmlSpace="preserve"
                          fill="#b91c1c"
                          className="relative z-10"
                        >
                          <defs></defs>
                          <g
                            transform={`scale(2.81 2.81) rotate(${bearings[index]}, 45, 45)`}
                          >
                            <path
                              d="M 55.082 45 c 0 -0.073 -0.011 -0.146 -0.019 -0.219 c -0.009 -0.079 -0.016 -0.157 -0.034 -0.234 c -0.004 -0.019 -0.003 -0.038 -0.008 -0.056 l -8.088 -30.686 c -0.231 -0.878 -1.025 -1.49 -1.934 -1.49 s -1.703 0.612 -1.934 1.49 L 34.978 44.49 c -0.005 0.019 -0.004 0.039 -0.008 0.058 c -0.018 0.076 -0.024 0.153 -0.033 0.231 c -0.008 0.074 -0.019 0.147 -0.019 0.221 c 0 0.074 0.011 0.147 0.019 0.221 c 0.009 0.078 0.015 0.155 0.033 0.231 c 0.004 0.019 0.003 0.039 0.008 0.058 l 10.022 0.49 C 55.071 45.146 55 46 55.082 45 z z"
                              strokeLinecap="round"
                            ></path>
                          </g>
                        </svg>
                      </div>
                    ) : (
                      <SmallLoader />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {selectedCountry === correctAnswer && (
            <table className="table max-w-xs mx-auto bg-base-100 my-4">
              <tbody>
                <tr>
                  <td className="w-20">
                    <img
                      src={getFlagUrl(correctAnswer)}
                      alt={`${correctAnswer} flag`}
                    ></img>
                  </td>
                  <td className="text-left">{correctAnswer}</td>
                  {/* <td>heyyyyyy</td> */}
                  <td>✔️</td>
                  {/* <td>hey</td> */}
                </tr>
              </tbody>
            </table>
          )}
        </div>
      )}
    </>
  );
};

export default GuessesTable;
