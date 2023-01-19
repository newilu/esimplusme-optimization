import React from "react";
import Image from "next/image";
import { useTheme } from "context/ThemeContext";
import devices from "public/staticfiles/devices-min.webp";
import gplay from "public/staticfiles/gplay.svg";
import gplayDark from "public/staticfiles/gplay-black.svg";
import appstore from "public/staticfiles/appstore.svg";
import appstoreDark from "public/staticfiles/appstore-black.svg";
import { ButtonsWrapper, Title, Wrapper, Text } from "./styled";

function EsimAppBanner() {
  const { isDarkTheme } = useTheme();

  const handleMarketClick = (market: string) => {
    // window.fbq('track', 'Lead');
    // switch (true) {
    //   case pathname.includes('virtual-numbers'):
    //     window.gtag('event', `virtualnumber_${market}_click`);
    //     break;
    //   case pathname.includes('mobile-data'):
    //     window.gtag('event', `mobiledata_${market}_click`);
    //     break;
    //   default:
    //     break;
    // }
    console.log(market);
  };
  return (
    <Wrapper>
      <div>
        <Title>Download eSIM plus now</Title>
        <Text>
          Сайт рыбатекст поможет дизайнеру, верстальщику, вебмастеру
          сгенерировать несколько абзацев более менее осмысленного...
        </Text>
        <ButtonsWrapper>
          <button onClick={() => handleMarketClick("appstore")}>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://apps.apple.com/by/app/esim-mobile-data-cloud-sim/id1482736281"
            >
              <Image
                width={120}
                height={40}
                src={isDarkTheme ? appstoreDark : appstore}
                alt="appstore"
              />
            </a>
          </button>
          <button onClick={() => handleMarketClick("googleplay")}>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://play.google.com/store/apps/details?id=com.appvillis.esim&hl=ru&gl=US"
            >
              <Image
                width={140}
                height={40}
                src={isDarkTheme ? gplayDark : gplay}
                alt="gplay"
              />
            </a>
          </button>
        </ButtonsWrapper>
      </div>
      <div>
        <Image height={270} width={200} src={devices} alt="devices" />
      </div>
    </Wrapper>
  );
}

export { EsimAppBanner };
