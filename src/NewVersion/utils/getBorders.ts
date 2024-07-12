export const getBorders = async (countryName: string): Promise<string[]> => {
    const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
    if (!response.ok) {
      throw new Error('Failed to fetch country borders');
    }
    const data = await response.json();
    return data[0].borders || [];
  };
