import React from "react";
import "public/nprogress.css";
import nProgress from "nprogress";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import Head from "next/head";
import { Router } from "next/router";
import { appWithTranslation } from "next-i18next";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "context/ThemeContext";
import { CookieConsentProvider } from "context/CookieConsentContext";
import { WidthProvider } from "context/WindowSizeContext";
import favicon from "public/favicon.ico";
import nextI18NextConfig from "../next-i18next.config";

const EsimAppBanner = dynamic(() => import("features/EsimAppBanner"), {
  ssr: false,
});

// eslint-disable-next-line @typescript-eslint/no-unsafe-argument,@typescript-eslint/unbound-method
Router.events.on("routeChangeStart", nProgress.start);
// eslint-disable-next-line @typescript-eslint/no-unsafe-argument,@typescript-eslint/unbound-method
Router.events.on("routeChangeError", nProgress.done);
// eslint-disable-next-line @typescript-eslint/no-unsafe-argument,@typescript-eslint/unbound-method
Router.events.on("routeChangeComplete", nProgress.done);

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="icon" href={favicon.src} />
        {/* <meta name="yandex-verification" content="b0cce6481d476b06" /> */}
      </Head>
      <QueryClientProvider client={queryClient}>
        <WidthProvider>
          <ThemeProvider>
            <CookieConsentProvider>
              <EsimAppBanner />
              <Component {...pageProps} />
            </CookieConsentProvider>
          </ThemeProvider>
        </WidthProvider>{" "}
      </QueryClientProvider>
    </>
  );
}
export default appWithTranslation(MyApp, nextI18NextConfig);
