import { registerLocale, getAlpha2Code } from 'i18n-iso-countries';
import en from 'i18n-iso-countries/langs/en.json';
registerLocale(en);


export default function getFlagUrl(countryName) {
  if (!countryName) return "";

  if (countryName === "Myanmar (Burma)") {
    countryName = "Myanmar"
  }

  if (countryName === "Côte d'Ivoire") {
    countryName = "Ivory Coast"
  }

  if (countryName === "Syria") {
    countryName = "Syrian Arab Republic"
  }

  let countryCode = getAlpha2Code(countryName, "en");

  if (!countryCode) return "";

  let flagUrl = `https://flagcdn.com/w320/${countryCode.toLowerCase()}.png`;

  return flagUrl;
}
