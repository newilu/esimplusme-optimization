import React from "react";
import Image from "next/image";
import Document, { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";
import { ServerStyleSheet } from "styled-components";
import i18nextConfig from "../next-i18next.config";

class MyDocument extends Document {
  render() {
    const currentLocale =
      // eslint-disable-next-line no-underscore-dangle
      this.props.__NEXT_DATA__.locale ?? i18nextConfig.i18n.defaultLocale;
    return (
      <Html lang={currentLocale}>
        <Head>
          <meta charSet="utf-8" />
          <link href="/app.css" rel="stylesheet" />
          <link
            rel="stylesheet"
            href="https://paymentpage.ecommpay.com/shared/merchant.css"
          />
        </Head>
        <body data-country={(this.props as any).countryCode}>
          <Main /> 
          <noscript>
            <div>
              <Image
                width={10}
                height={10}
                src="https://mc.yandex.ru/watch/79496440"
                style={{ position: "absolute", left: -9999 }}
                alt=""
              />
            </div>
          </noscript>
          <Script
            src="https://paymentpage.ecommpay.com/shared/merchant.js"
            strategy="afterInteractive"
          />
          <NextScript />
        </body>
      </Html>
    );
  }
}

MyDocument.getInitialProps = async (ctx) => {
  const originalRenderPage = ctx.renderPage;

  const sheet = new ServerStyleSheet();
  const countryCode = (ctx.req?.headers["cf-ipcountry"] ?? "") as string;

  ctx.renderPage = () =>
    originalRenderPage({
      // Take precedence over the CacheProvider in our custom _app.js
      enhanceComponent: (Component) => (props) =>
        sheet.collectStyles(<Component {...props} />),
    });

  const initialProps = await Document.getInitialProps(ctx);

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [
      ...React.Children.toArray(initialProps.styles),
      ...sheet.getStyleElement(),
    ],
    countryCode,
  };
};

export default MyDocument;
