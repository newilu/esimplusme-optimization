import React from "react";
import {
  createGlobalStyle,
  ThemeProvider as StyledThemeProvider,
} from "styled-components";
import { getCookie, setCookie, themes } from "utils/common";

type ThemeContextProps = {
  isDarkTheme: boolean;
  toggleTheme: () => void;
};

const ThemeContext = React.createContext<ThemeContextProps>({
  isDarkTheme: false,
  toggleTheme: () => {},
});

const GlobalStyle = createGlobalStyle`
  html {
    background: ${(props) => (props.theme as any).htmlBg} fixed;
  }
  body {
    background: ${(props) => (props.theme as any).bg};
  }
`;

function ThemeProvider<T extends { children: React.ReactNode }>(props: T) {
  const [isDarkTheme, setIsDarkTheme] = React.useState(false);

  const toggleTheme = () => {
    setIsDarkTheme((prev) => {
      return !prev;
    });
    setCookie("isDarkTheme", String(Number(!isDarkTheme)), 30);
  };

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setIsDarkTheme(
        getCookie("isDarkTheme")
          ? !!Number(getCookie("isDarkTheme"))
          : window.matchMedia("(prefers-color-scheme: dark)").matches
      );
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ isDarkTheme, toggleTheme }} {...props}>
      <GlobalStyle theme={themes[isDarkTheme ? "dark" : "light"]} />
      <StyledThemeProvider theme={themes[isDarkTheme ? "dark" : "light"]}>
        {props.children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
}

function useTheme() {
  return React.useContext(ThemeContext);
}

export { ThemeProvider, useTheme, ThemeContext };
