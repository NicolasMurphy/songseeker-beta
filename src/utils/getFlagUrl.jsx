import { getAlpha2Code } from "i18n-iso-countries";

export default function getFlagUrl(countryName) {
  if (!countryName) return "";

  let countryCode = getAlpha2Code(countryName, "en");

  if (!countryCode) return "";

  let flagUrl = `https://flagcdn.com/w320/${countryCode.toLowerCase()}.png`;

  return flagUrl;
}
