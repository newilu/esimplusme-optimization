/* eslint-disable */

import mixpanel from "mixpanel-browser";

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

  window.ym(process.env.NEXT_PUBLIC_YANDEX_METRIKA_TOKEN!, "init", {
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

  const token = process.env.NEXT_PUBLIC_GTAG_TOKEN!;

  // @ts-ignore
  window.gtag("js", new Date());
  window.gtag("config", token);

  const script = document.createElement("script");
  script.src = `https://www.googletagmanager.com/gtag/js?id=${token}`;
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

  window.fbq("init", process.env.NEXT_PUBLIC_FACEBOOK_TOKEN!);
}

function loadMixpanel() {
  mixpanel.init(process.env.NEXT_PUBLIC_MIXPANEL_TOKEN!, {
    debug: process.env.NEXT_PUBLIC_RUNTIME_ENV !== "development",
    persistence: "localStorage",
  });
  window.$isMixpanelLoaded = (mixpanel as any).__loaded as boolean;
}

/* eslint-enable */

export { loadYMScript, loadFacebookScript, loadGtagScript, loadMixpanel };
