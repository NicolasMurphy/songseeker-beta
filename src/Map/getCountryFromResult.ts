interface AddressComponent {
  types: string[];
  long_name: string;
}

export function getCountryFromResult(result: { address_components: AddressComponent[] }): string {
  const countryComponent = result.address_components.find((component) =>
    component.types.includes('country')
  );

  const country = countryComponent ? countryComponent.long_name : '';
  return country;
};
