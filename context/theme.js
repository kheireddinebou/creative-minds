import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = props => {
  const [theme, setTheme] = useState("light");

  const onSetTheme = theme => {
    document.body.style.setProperty("--color", themes[theme].color);
    document.body.style.setProperty(
      "--bg-color",
      themes[theme].backgroundColor
    );
    setTheme(theme);
  };

  

  return (
    <ThemeContext.Provider value={{ theme, setTheme: onSetTheme }}>
      {props.children}
    </ThemeContext.Provider>
  );
};

const themes = {
  light: {
    color: "#000",
    backgroundColor: "#fff",
  },

  dark: {
    color: "#fff",
    backgroundColor: "#000",
  },
};
