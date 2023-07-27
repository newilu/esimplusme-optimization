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
      <Html lang={currentLocale} data-country={(this.props as any).countryCode}>
        <Head>
          <meta charSet="utf-8" />
          <link href="/app.css" rel="stylesheet" />
          <link
            rel="stylesheet"
            href="https://paymentpage.ecommpay.com/shared/merchant.css"
          />
        </Head>
        <body>
          <Main />
          <Script id="help-crunch-script" strategy='afterInteractive'>
            {`
              window.helpcrunchSettings = {
                organization: 'appvillis',
                appId: 'dc92b31a-172f-46e8-9f88-ceddd074d9fe',
              };

              (function(w,d) { 
                var hS=w.helpcrunchSettings;
                if(!hS||!hS.organization){return;}
                var widgetSrc='https://'+hS.organization+'.widget.helpcrunch.com/';
                w.HelpCrunch=function(){w.HelpCrunch.q.push(arguments)};
                w.HelpCrunch.q=[];
                function r(){
                  if (d.querySelector('script[src="' + widgetSrc + '"')) { return; }
                  var s=d.createElement('script');
                  s.async=1;
                  s.type='text/javascript';
                  s.src=widgetSrc;
                  (d.body||d.head).appendChild(s);
                }
                if(d.readyState === 'complete'||hS.loadImmediately){r();} 
                else if(w.attachEvent){w.attachEvent('onload',r)}
                else{w.addEventListener('load',r,false)}
              })(window, document)

              HelpCrunch('showChatWidget');
            `}
          </Script>
          <Script strategy='lazyOnload' id="gtag-script">{`
            window.dataLayer = window.dataLayer || [];
            function gtag() {
            dataLayer.push(arguments);
          }
            gtag('js', new Date());

            gtag('config', 'G-RQ66T6FFRW');
          `}</Script>
          <Script strategy='lazyOnload' id="metrika-script">{`
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
    `}</Script>
          <Script
            strategy='lazyOnload'
            src="https://www.googletagmanager.com/gtag/js?id=G-RQ66T6FFRW"
          />
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
          <Script strategy='lazyOnload' id="fb-script">{`
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
    `}</Script>
          <Script
            src="https://paymentpage.ecommpay.com/shared/merchant.js"
            strategy='afterInteractive'
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
