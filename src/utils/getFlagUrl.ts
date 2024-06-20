import { registerLocale, getAlpha2Code } from "i18n-iso-countries";
import en from "i18n-iso-countries/langs/en.json";
registerLocale(en);

export default function getFlagUrl(countryName: string): string {
  if (!countryName) return "";

  const nameCorrections: { [key: string]: string} = {
    "Myanmar (Burma)": "Myanmar",
    "Côte d'Ivoire": "Ivory Coast",
    "Syria": "Syrian Arab Republic",
    "Cabo Verde": "Cape Verde",
    "Moldova": "Moldova, Republic of",
    "Laos": "Lao People's Democratic Republic"
  };

  countryName = nameCorrections[countryName] || countryName;

  const countryCode: string | undefined = getAlpha2Code(countryName, "en");

  if (!countryCode) return "";

  const flagUrl = `https://flagcdn.com/w320/${countryCode.toLowerCase()}.png`;

  return flagUrl;
}
