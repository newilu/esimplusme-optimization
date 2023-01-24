import { appWithTranslation } from "next-i18next";
import type { AppProps } from "next/app";
import { ThemeProvider } from "context/ThemeContext";
import nextI18NextConfig from "../next-i18next.config.js";
import { WidthProvider } from "@/context/WindowSizeContext";
import Head from "next/head.js";
import favicon from "@/public/favicon.ico";
import React from "react";

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="icon" href={favicon.src} />
      </Head>
      <WidthProvider>
        <ThemeProvider>
          <Component {...pageProps} />
        </ThemeProvider>
      </WidthProvider>{" "}
    </>
  );
}

export default appWithTranslation(App, nextI18NextConfig);
