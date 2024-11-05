import React, { useEffect, useState } from 'react';
import Spline from '@splinetool/react-spline';

export default function ColorChangingSpline() {
  const [app, setApp] = useState(null);

  useEffect(() => {
    if (!app) return;

    // Initialize color states
    let currentColorIndex = 0;

    // Define the color states in an array
    const colors = [
      { color1: 100, color2: 0, color3: 0 }, // First color state (default)
      { color1: 0, color2: 100, color3: 0 }, // Second color state
      { color1: 0, color2: 0, color3: 100 }  // Third color state
    ];

    // Function to apply color based on the current index
    function applyColor() {
      const color = colors[currentColorIndex];
      console.log('Applying color:', color);

      // Try to apply color if setVariables is available
      if (app.setVariables) {
        app.setVariables(color);
      } else {
        console.warn('setVariables method is not available on the Spline instance.');
      }

      // Cycle through the colors
      currentColorIndex = (currentColorIndex + 1) % colors.length;
    }

    // Apply the first color immediately on load
    const initialColor = colors[0];
    console.log('Initial color applied:', initialColor);
    if (app.setVariables) {
      app.setVariables(initialColor);
    }

    // Change color every 5 seconds
    const colorInterval = setInterval(applyColor, 5000);

    // Clear interval on component unmount
    return () => clearInterval(colorInterval);
  }, [app]);

  return (
    <div>
      <Spline
        scene="https://prod.spline.design/i04iXPXzyN8Qo939/scene.splinecode"
        onLoad={(splineApp) => setApp(splineApp)}
      />
    </div>
  );
}
