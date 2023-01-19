import { appWithTranslation } from "next-i18next";
import type { AppProps } from "next/app";
import { ThemeProvider } from "context/ThemeContext";
import nextI18NextConfig from "../next-i18next.config.js";
import { WidthProvider } from "@/context/WindowSizeContext";

function App({ Component, pageProps }: AppProps) {
  return (
    <WidthProvider>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </WidthProvider>
  );
}

export default appWithTranslation(App, nextI18NextConfig);
