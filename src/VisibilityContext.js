import React, { createContext, useState } from 'react';

// Create a context to hold visibility state
export const VisibilityContext = createContext();

export const VisibilityProvider = ({ children }) => {
  const [isComponentVisible, setIsComponentVisible] = useState(false);

  // Function to toggle visibility
  const toggleVisibility = () => {
    setIsComponentVisible(!isComponentVisible);
  };

  return (
    <VisibilityContext.Provider value={{ isComponentVisible, toggleVisibility }}>
      {children}
    </VisibilityContext.Provider>
  );
};
