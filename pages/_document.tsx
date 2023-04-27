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
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-RQ66T6FFRW"
          ></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag() {
            dataLayer.push(arguments);
          }
            gtag('js', new Date());

            gtag('config', 'G-RQ66T6FFRW');
          `,
            }}
          ></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
      (function (m, e, t, r, i, k, a) {
        m[i] =
          m[i] ||
          function () {
            (m[i].a = m[i].a || []).push(arguments);
          };
        m[i].l = 1 * new Date();
        for (var j = 0; j < document.scripts.length; j++) {
          if (document.scripts[j].src === r) {
            return;
          }
        }
        (k = e.createElement(t)),
          (a = e.getElementsByTagName(t)[0]),
          (k.async = 1),
          (k.src = r),
          a.parentNode.insertBefore(k, a);
      })(
        window,
        document,
        'script',
        'https://mc.yandex.ru/metrika/tag.js',
        'ym',
      );

      ym(79496440, 'init', {
        clickmap: true,
        trackLinks: true,
        accurateTrackBounce: true,
        webvisor: true,
        ecommerce: 'dataLayer',
      });
    `,
            }}
          ></script>
          <noscript>
            <div>
              <img
                src="https://mc.yandex.ru/watch/79496440"
                style={{ position: "absolute", left: -9999 }}
                alt=""
              />
            </div>
          </noscript>
          <script
            dangerouslySetInnerHTML={{
              __html: `
      !(function (f, b, e, v, n, t, s) {
        if (f.fbq) return;
        n = f.fbq = function () {
          n.callMethod
            ? n.callMethod.apply(n, arguments)
            : n.queue.push(arguments);
        };
        if (!f._fbq) f._fbq = n;
        n.push = n;
        n.loaded = !0;
        n.version = '2.0';
        n.queue = [];
        t = b.createElement(e);
        t.async = !0;
        t.src = v;
        s = b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t, s);
      })(
        window,
        document,
        'script',
        'https://connect.facebook.net/en_US/fbevents.js',
      );
      fbq('init', 578800919804138);
    `,
            }}
          ></script>
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
