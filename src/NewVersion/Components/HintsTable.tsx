import React, { useEffect, useState } from "react";
import useStore from "../store/useStore";
import useTracks from "../hooks/useTracks";
import { HintInfoProps } from "../utils/types";
import { censoredWords } from "../utils/censoredWords";
import getDescriptionHintOptions from "../utils/DescriptionHintOptions";

const censorText = (text: string, words: string[]) => {
  let censoredText = text;
  words.forEach((word) => {
    const regex = new RegExp(word, "gi");
    censoredText = censoredText.replace(regex, "[REDACTED]");
  });
  return censoredText;
};

const countryNameMapping: { [key: string]: string } = {
  "Myanmar (Burma)": "Myanmar",
  "The Gambia": "Gambia",
  "Cabo Verde": "Cape Verde",
};

const manualPopulationOverride: { [key: string]: string } = {
  "United States": "333,300,000",
  Georgia: "3,713,000",
};

interface CountryData {
  country: string;
  population: string | number;
}

const HintsTable: React.FC<HintInfoProps> = ({ track }) => {
  const { tracks } = useTracks();
  const { round, guesses } = useStore();
  const [countryData, setCountryData] = useState<CountryData[]>([]);

  useEffect(() => {
    const fetchAllCountries = async () => {
      const descriptions = getDescriptionHintOptions();
      const countries = descriptions.map((desc) => desc.country);

      const data = await Promise.all(
        countries.map(async (country) => {
          const mappedCountry = countryNameMapping[country] || country;
          const manualPopulation = manualPopulationOverride[mappedCountry];

          if (manualPopulation) {
            return { country: mappedCountry, population: manualPopulation };
          }

          try {
            const response = await fetch(
              `https://restcountries.com/v3.1/name/${mappedCountry}?fullText=true`
            );
            if (!response.ok) {
              throw new Error(
                `Failed to fetch country data for ${mappedCountry}`
              );
            }
            const jsonData = await response.json();
            if (jsonData.length > 0) {
              return {
                country: mappedCountry,
                population: jsonData[0].population,
              };
            } else {
              console.warn(`No data found for country: ${mappedCountry}`);
              return { country: mappedCountry, population: "N/A" };
            }
          } catch (error) {
            console.error(`Error fetching data for ${mappedCountry}:`, error);
            return { country: mappedCountry, population: "N/A" };
          }
        })
      );

      setCountryData(data);
    };

    fetchAllCountries();
  }, []);

  const censoredTrackName = censorText(track.name, censoredWords);
  const censoredArtistName = censorText(track.artists[0].name, censoredWords);
  const censoredAlbumName = censorText(track.album.name, censoredWords);

  return (
    <>
      {guesses < 5 && tracks.length !== 0 && round !== null && (
        <div className="card bg-base-300 text-base-content my-4 mx-auto w-full max-w-xs">
          <h1 className="mt-4 text-xl">Hints:</h1>
          <table className="table max-w-xs text-center my-4">
            <tbody>
              {guesses < 5 && (
                <tr>
                  <td>Track name: {censoredTrackName}</td>
                </tr>
              )}
              {guesses < 4 && countryData.length > 0 && (
                <tr>
                  <td>Artist name: {censoredArtistName}</td>
                </tr>
              )}
              {guesses < 3 && countryData.length > 0 && (
                <tr>
                  <td>Album name: {censoredAlbumName}</td>
                </tr>
              )}
              {guesses < 2 && countryData.length > 0 && (
                <tr>
                  <td>
                    Population:{" "}
                    {countryData[0]?.population?.toLocaleString() || "N/A"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default HintsTable;
