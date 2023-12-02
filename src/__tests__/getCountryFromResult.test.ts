import { getCountryFromResult } from '../Map/getCountryFromResult'; // Adjust the import path as necessary

describe('getCountryFromResult', () => {
  it('should extract the country from the result', () => {
    const mockResult = {
      address_components: [
        { types: ['country'], long_name: 'Brazil' }
      ]
    };

    const country = getCountryFromResult(mockResult);
    expect(country).toBe('Brazil');
  });

  it('should return an empty string if country is not found', () => {
    const mockResult = {
      address_components: [
        { types: ['locality'], long_name: 'São Paulo' }
      ]
    };

    const country = getCountryFromResult(mockResult);
    expect(country).toBe('');
  });
});
