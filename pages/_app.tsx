import React from "react";
import { appWithTranslation } from "next-i18next";
import Head from "next/head.js";
import nProgress from "nprogress";
import { Router } from "next/router";
import "public/nprogress.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "context/ThemeContext";
import nextI18NextConfig from "../next-i18next.config.js";
import { WidthProvider } from "@/context/WindowSizeContext";
import favicon from "@/public/favicon.ico";

// eslint-disable-next-line @typescript-eslint/no-unsafe-argument,@typescript-eslint/unbound-method
Router.events.on("routeChangeStart", nProgress.start);
// eslint-disable-next-line @typescript-eslint/no-unsafe-argument,@typescript-eslint/unbound-method
Router.events.on("routeChangeError", nProgress.done);
// eslint-disable-next-line @typescript-eslint/no-unsafe-argument,@typescript-eslint/unbound-method
Router.events.on("routeChangeComplete", nProgress.done);

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
