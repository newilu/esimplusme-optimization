/* eslint-disable */

import mixpanel from "mixpanel-browser";
import { MIXPANEL_ID } from "@/shared/constants";

function loadYMScript() {
  (function () {
    window.ym =
      window.ym ||
      function () {
        // @ts-ignore
        (window.ym.a = window.ym.a || []).push(arguments);
      };
    // @ts-ignore
    window.ym.l = 1 * new Date();
    for (var j = 0; j < document.scripts.length; j++) {
      if (document.scripts[j].src === "https://mc.yandex.ru/metrika/tag.js") {
        return;
      }
    }
    const script = document.createElement("script");
    const firstScript = document.getElementsByTagName("script")[0];
    (script.async = true),
      (script.src = "https://mc.yandex.ru/metrika/tag.js"),
      firstScript?.parentNode?.insertBefore(script, firstScript);
  })();

  window.ym(79496440, "init", {
    clickmap: true,
    trackLinks: true,
    accurateTrackBounce: true,
    webvisor: true,
    ecommerce: "dataLayer",
  });
}

function loadGtagScript() {
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () {
    window.dataLayer.push(arguments);
  };

  // @ts-ignore
  window.gtag("js", new Date());
  window.gtag("config", "G-RQ66T6FFRW");

  const script = document.createElement("script");
  script.src = "https://www.googletagmanager.com/gtag/js?id=G-RQ66T6FFRW";
  script.async = true;

  document.body.append(script);
}

function loadFacebookScript() {
  (function (f, b, e, v, nn, tt, ss) {
    // @ts-ignore
    if (f.fbq) return;
    // @ts-ignore
    let n: any = nn;
    let t: any = tt;
    let s: any = ss;
    n = f.fbq = function () {
      // @ts-ignore
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    // @ts-ignore
    if (!f._fbq) f._fbq = n;
    // @ts-ignore
    n.push = n;
    n.loaded = !0;
    n.version = "2.0";
    n.queue = [];
    // @ts-ignore
    t = b.createElement(e);
    t.async = !0;
    t.src = v;
    // @ts-ignore
    s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s);
    ss = s;
    nn = n;
    tt = t;
  })(
    window,
    document,
    "script",
    "https://connect.facebook.net/en_US/fbevents.js"
  );

  window.fbq("init", "578800919804138");
}

function loadMixpanel() {
  mixpanel.init(MIXPANEL_ID, {
    debug: true,
    persistence: "localStorage",
  });
  mixpanel.register({ signed: false });
  window.$isMixpanelLoaded = (mixpanel as any).__loaded as boolean;
}

/* eslint-enable */

export { loadYMScript, loadFacebookScript, loadGtagScript, loadMixpanel };
