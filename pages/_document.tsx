import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
import i18nextConfig from "../next-i18next.config";
import { ServerStyleSheet } from "styled-components";

class MyDocument extends Document {
  render() {
    const currentLocale =
      this.props.__NEXT_DATA__.locale ?? i18nextConfig.i18n.defaultLocale;
    return (
      <Html lang={currentLocale}>
        <Head>
          <meta charSet="utf-8" />

          <link href="/app.css" rel="stylesheet" />
        </Head>
        <body>
          <Main />
          <NextScript />
          <script
            dangerouslySetInnerHTML={{
              __html: `  (function (w, d) {
        w.HelpCrunch = function () {
          w.HelpCrunch.q.push(arguments);
        };
        w.HelpCrunch.q = [];
        function r() {
          var s = document.createElement('script');
          s.async = 1;
          s.type = 'text/javascript';
          s.src = 'https://widget.helpcrunch.com/';
          (d.body || d.head).appendChild(s);
        }
        if (w.attachEvent) {
          w.attachEvent('onload', r);
        } else {
          w.addEventListener('load', r, false);
        }
      })(window, document);

      HelpCrunch('init', 'appvillis', {
        applicationId: 1,
        applicationSecret:
          '3GoaIg0gOa0vzfNaISDSDL+vJPSCEKYtC8tGIGA+y3z5rgJmfVQ+vFlHOiXJOPAAkKQYw2oheLOO4AJKMV6umA==',
      });

      HelpCrunch('showChatWidget');`,
            }}
          />
        </body>
      </Html>
    );
  }
}

MyDocument.getInitialProps = async (ctx) => {
  const originalRenderPage = ctx.renderPage;

  const sheet = new ServerStyleSheet();

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
  };
};

export default MyDocument;
