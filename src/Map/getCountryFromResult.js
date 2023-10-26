export function getCountryFromResult(result) {
    const countryComponent = result.address_components.find((component) =>
      component.types.includes('country')
    );

    const country = countryComponent ? countryComponent.long_name : '';
    return country;
  };
