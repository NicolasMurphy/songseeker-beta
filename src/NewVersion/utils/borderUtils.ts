import { getBorders } from './getBorders';
import countries from 'i18n-iso-countries';

countries.registerLocale(require("i18n-iso-countries/langs/en.json"));

export const checkIfBorders = async (selectedCountry: string, correctCountry: string): Promise<boolean> => {
  const borders = await getBorders(correctCountry);
  const countryNames = borders.map(code => countries.getName(code, 'en'));
  console.log(countryNames);
  return countryNames.includes(selectedCountry);
};
