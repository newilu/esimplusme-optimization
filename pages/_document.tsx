import React from 'react';
import Image from 'next/image';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';
import { ServerStyleSheet } from 'styled-components';
import i18nextConfig from '../next-i18next.config';

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
          <link rel="stylesheet" href="https://paymentpage.ecommpay.com/shared/merchant.css" />
          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: `
 (function(f,b){if(!b.__SV){var e,g,i,h;window.mixpanel=b;b._i=[];b.init=function(e,f,c){function g(a,d){var b=d.split(".");2==b.length&&(a=a[b[0]],d=b[1]);a[d]=function(){a.push([d].concat(Array.prototype.slice.call(arguments,0)))}}var a=b;"undefined"!==typeof c?a=b[c]=[]:c="mixpanel";a.people=a.people||[];a.toString=function(a){var d="mixpanel";"mixpanel"!==c&&(d+="."+c);a||(d+=" (stub)");return d};a.people.toString=function(){return a.toString(1)+".people (stub)"};i="disable time_event track track_pageview track_links track_forms track_with_groups add_group set_group remove_group register register_once alias unregister identify name_tag set_config reset opt_in_tracking opt_out_tracking has_opted_in_tracking has_opted_out_tracking clear_opt_in_out_tracking start_batch_senders people.set people.set_once people.unset people.increment people.append people.union people.track_charge people.clear_charges people.delete_user people.remove".split(" ");
        for(h=0;h<i.length;h++)g(a,i[h]);var j="set set_once union unset remove delete".split(" ");a.get_group=function(){function b(c){d[c]=function(){call2_args=arguments;call2=[c].concat(Array.prototype.slice.call(call2_args,0));a.push([e,call2])}}for(var d={},e=["get_group"].concat(Array.prototype.slice.call(arguments,0)),c=0;c<j.length;c++)b(j[c]);return d};b._i.push([e,f,c])};b.__SV=1.2;e=f.createElement("script");e.type="text/javascript";e.async=!0;e.src="undefined"!==typeof MIXPANEL_CUSTOM_LIB_URL?MIXPANEL_CUSTOM_LIB_URL:"file:"===f.location.protocol&&"//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js".match(/^\\/\\//)?"https://cdn.mxpnl.com/libs/mixpanel-2-latest.min.js":"//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js";g=f.getElementsByTagName("script")[0];g.parentNode.insertBefore(e,g)}})(document,window.mixpanel||[]);
`,
            }}
          />
        </Head>
        <body data-country={(this.props as any).countryCode}>
          <Main />
          <Script strategy="beforeInteractive" id="help-crunch-script">
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
          <noscript>
            <div>
              <Image
                width={10}
                height={10}
                src="https://mc.yandex.ru/watch/79496440"
                style={{ position: 'absolute', left: -9999 }}
                alt=""
              />
            </div>
          </noscript>
          <Script src="https://paymentpage.ecommpay.com/shared/merchant.js" strategy="afterInteractive" />
          <NextScript />
        </body>
      </Html>
    );
  }
}

MyDocument.getInitialProps = async (ctx) => {
  const originalRenderPage = ctx.renderPage;

  const sheet = new ServerStyleSheet();
  const countryCode = (ctx.req?.headers['cf-ipcountry'] ?? '') as string;

  ctx.renderPage = () =>
    originalRenderPage({
      // Take precedence over the CacheProvider in our custom _app.js
      enhanceComponent: (Component) => (props) => sheet.collectStyles(<Component {...props} />),
    });

  const initialProps = await Document.getInitialProps(ctx);

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [...React.Children.toArray(initialProps.styles), ...sheet.getStyleElement()],
    countryCode,
  };
};

export default MyDocument;
