export const loadGoogleMapsScript = () => {
    return new Promise<void>((resolve, reject) => {
      const existingScript = document.querySelector(
        `script[src^="https://maps.googleapis.com/maps/api/js?key="]`
      );

      if (existingScript) {
        resolve();
        return;
      }

      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=geometry,drawing,places`;
      script.async = true;
      script.defer = true;

      script.onload = () => {
        resolve();
      };

      script.onerror = (error) => {
        reject(error);
      };

      document.body.appendChild(script);
    });
  };
