import React from "react";
import { isIOS, isMobile } from "react-device-detect";
import logo from "public/staticfiles/logo.png";
import xmark from "shared/assets/xmark.svg";
import { Title, Wrapper } from "./styled";
import Image from "next/image";
import Link from "next/link";

function EsimAppBanner() {
  const [visible, setVisible] = React.useState(false);

  const handleHideBanner = () => {
    setVisible(false);
    try {
      localStorage.setItem("esim-banner-hidden", "1");
    } catch (e: unknown) {
      console.log(e);
    }
  };

  React.useLayoutEffect(() => {
    try {
      setVisible(
        isMobile ? !Number(localStorage.getItem("esim-banner-hidden")) : false
      );
    } catch (e: unknown) {
      console.log(e);
      setVisible(isMobile);
    }
  }, []);

  return (
    <Wrapper visible={visible}>
      <div />
      <div>
        <button onClick={handleHideBanner} aria-label="hide app banner">
          <Image width={14} height={14} src={xmark} alt="xmark" />
        </button>
        <div>
          <Image width={38} height={32} src={logo} alt="app logo" />
        </div>
        <Title>
          <div>ESIM Plus Mobile Data & Cloud SIM</div>
          <div>Virtual Number, Calls & Text</div>
        </Title>
        <button>
          <Link
            target="_blank"
            rel="noreferrer"
            href={
              isIOS
                ? "https://apps.apple.com/by/app/esim-mobile-data-cloud-sim/id1482736281"
                : "https://play.google.com/store/apps/details?id=com.appvillis.esim&hl=ru&gl=US"
            }
          >
            Get App
          </Link>
        </button>
      </div>
    </Wrapper>
  );
}

export { EsimAppBanner };
