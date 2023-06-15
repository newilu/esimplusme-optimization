import React from "react";
import styled from "styled-components";
import { useTranslation } from "next-i18next";
import Footer from "components/Footer";
import ManageYourNumbers from "features/DownloadAppSection";
import { Container as BaseContainer } from "shared/ui/styled";
import Navbar from "widgets/Navbar";
import { LANGS_LIST } from "shared/constants";
import { useRouter } from "next/router";
import Head from "next/head.js";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Wrapper = styled.div`
  background: ${(props) => props.theme.bg};
`;

const Container = styled(BaseContainer)`
  padding-top: 65px;
  color: ${(props) => props.theme.primaryText};

  > div:not(div:last-child) {
    margin-bottom: 20px;
    padding: 16px;
    border-radius: 10px;
    background: ${(props) => props.theme.translucentCardsBg};
    border: 1px solid ${(props) => props.theme.cardsBorder};
  }

  > div#content {
    padding: 16px;
    border-radius: 10px;

    b {
      display: block;
      margin-bottom: 20px;
      font-size: 22px;
    }
  }

  ul {
    padding-left: 32px;
    li {
      list-style: square;
    }
  }

  li {
    padding: 10px 0;
    color: ${(props) => props.theme.secondaryText};

    a {
      color: ${(props) => props.theme.primaryText};
    }
  }

  ol {
    margin: 0;
    padding: 0;
    ol {
      padding-left: 32px;
      padding-top: 16px;
    }
  }
`;

function SupportedDevices() {
  const { t, i18n } = useTranslation();
  const { pathname } = useRouter();

  React.useEffect(() => {
    const listOfATags = document.querySelectorAll('a[href^="#"]');

    const listenerFunction = (anchor: Element, e: Event) => {
      e.preventDefault();
      const el = document.querySelector(anchor.getAttribute("href") as string);
      if (el) {
        window.scrollTo({
          top: el.getBoundingClientRect().top + window.scrollY - 90,
          behavior: "smooth",
        });
      }
    };

    listOfATags.forEach((anchor) => {
      anchor.addEventListener("click", (e) => listenerFunction(anchor, e));
    });

    return listOfATags.forEach((anchor) =>
      anchor.removeEventListener("click", (e) => listenerFunction(anchor, e))
    );
  }, []);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const pageDescription = t("esim_supported_devices_page_description").replace(
    "2022",
    `${new Date().toLocaleString(i18n.language, {
      month: "long",
    })} ${new Date().getFullYear().toString()}`
  );

  return (
    <>
      <Head>
        <title>{t("esim_supported_devices")}</title>
        <meta name="description" content={pageDescription} />
        <meta property="og:locale" content={i18n.language} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://esimplus.me${pathname}`} />
        <meta property="og:site_name" content="eSIM+" />
        <meta
          property="og:image"
          content="https://static.esimplus.net/storage/logos/logo.png"
        />
        <meta property="og:image:width" content="112" />
        <meta property="og:image:height" content="93" />
        <meta
          property="og:title"
          content={`eSIM+ | ${t("esim_supported_devices")}`}
        />
        <meta property="og:description" content={pageDescription} />
        <meta name="twitter:card" content="app" />
        <meta
          name="twitter:title"
          content={`eSIM+ | ${t("esim_supported_devices")}`}
        />
        <meta name="twitter:description" content={pageDescription} />
        <meta
          name="twitter:image"
          content="https://static.esimplus.net/storage/logos/logo.png"
        />
        <meta property="article:modified_time" content="2023-06-15" />
        <link
          rel="canonical"
          href={`https://esimplus.me${
            i18n.language.startsWith("en")
              ? ""
              : `/${i18n.language.slice(0, 2)}`
          }/esim-supported-devices`}
        />
        {LANGS_LIST.map((lng) => (
          <link
            key={lng.concat("2")}
            rel="alternate"
            href={`https://esimplus.me${
              lng.startsWith("en") ? "" : `/${lng.slice(0, 2)}`
            }/esim-supported-devices`}
            hrefLang={lng.toLowerCase()}
          />
        ))}
      </Head>
      <Wrapper>
        <Navbar />
        <Container>
          <h1>{t("what_devices_supports_esim")}</h1>
          <div id="content">
            <b>{t("content")}</b>
            <ol>
              <li>
                <a href="#esim-phones">{t("phones_that_supports_esim")}</a>
                <ol>
                  <li>
                    <a href="#esim-apple-phones">{t("apple_phones")}</a>
                  </li>{" "}
                  <li>
                    <a href="#esim-google-phones">{t("google_phones")}</a>
                  </li>{" "}
                  <li>
                    <a href="#esim-samsung-phones">{t("samsung_phones")}</a>
                  </li>{" "}
                  <li>
                    <a href="#esim-motorola-phones">{t("motorola_phones")}</a>
                  </li>{" "}
                  <li>
                    <a href="#esim-xiaomi-phones">{t("xiaomi_phones")}</a>
                  </li>{" "}
                  <li>
                    <a href="#esim-huawei-phones">{t("huawei_phones")}</a>
                  </li>{" "}
                  <li>
                    <a href="#esim-sony-phones">{t("sony_phones")}</a>
                  </li>
                  <li>
                    <a href="#esim-microsoft-phones">{t("microsoft_phones")}</a>
                  </li>
                </ol>
              </li>{" "}
              <li>
                <a href="#esim-watches">{t("smart_watches")}</a>
                <ol>
                  <li>
                    <a href="#esim-apple-watches">
                      {t("apple_watches_with_esim")}
                    </a>
                  </li>{" "}
                  <li>
                    <a href="#esim-huawei-watches">
                      {t("huawei_watches_with_esim")}
                    </a>
                  </li>
                  <li>
                    <a href="#esim-samsung-watches">
                      {t("samsung_watches_with_esim")}
                    </a>
                  </li>
                  <li>
                    <a href="#esim-xiaomi-watches">
                      {t("xiaomi_watches_with_esim")}
                    </a>
                  </li>
                </ol>
              </li>{" "}
              <li>
                <a href="#esim-tablets">{t("tablets_with_esim")}</a>
                <ol>
                  <li>
                    <a href="#esim-apple-tablets">
                      {t("apple_tablets_with_esim")}
                    </a>
                  </li>{" "}
                  <li>
                    <a href="#esim-microsoft-tablets">
                      {t("microsoft_tablets_with_esim")}
                    </a>
                  </li>
                </ol>
              </li>
            </ol>
          </div>
          <h2 id="esim-phones">{t("phones_that_supports_esim")}</h2>
          <div>
            <h3 id="esim-apple-phones">{t("apple_phones")}</h3>
            <ul>
              <li> iPhone SE (2nd gen)</li>
              <li>iPhone 11, iPhone 11 Pro, iPhone 11 Pro Max</li>
              <li>iPhone XS, iPhone XS Max, iPhone XR</li>
              <li>
                iPhone 12, iPhone 12 Pro, iPhone 12 mini, iPhone 12 Pro Max
              </li>
              <li>
                iPhone 13 Pro Max, iPhone 13 Pro, iPhone 13, iPhone 13 mini
              </li>
              <li>iPhone 14, iPhone 14 Pro, iPhone 14 Pro Max</li>
            </ul>{" "}
          </div>
          <div>
            <h3 id="esim-google-phones">{t("google_phones")}</h3>
            <ul>
              <li>Google Pixel, Google Pixel 2, Google Pixel 2X</li>
              <li>
                Google Pixel 3, Google Pixel 3XL, Google Pixel 3A, Google Pixel
                3A XL
              </li>
              <li>Google Pixel 4 XL, Google Pixel 4</li>
              <li>Pixel 5, Pixel 5a</li>
            </ul>{" "}
          </div>
          <div>
            <h3 id="esim-samsung-phones">{t("samsung_phones")}</h3>
            <ul>
              <li> Samsung Galaxy Fold (LTE), Galaxy Z Fold2</li>
              <li>Samsung Galaxy S20, S20+, S20 Ultra</li>
              <li>Galaxy S21, Galaxy S21 Ultra</li>
              <li>Galaxy Z Flip</li>
              <li>Galaxy Note20, Galaxy Note20 Ultra</li>
            </ul>{" "}
          </div>
          <div>
            <h3 id="esim-motorola-phones">{t("motorola_phones")}</h3>
            <ul>
              <li>Motorola RAZR, Moto Razr 5G</li>
            </ul>{" "}
          </div>
          <div>
            <h3 id="esim-xiaomi-phones">{t("xiaomi_phones")}</h3>
            <ul>
              <li>Xiaomi Mi Note 3 и Mi Max 3 (CN)</li>
            </ul>{" "}
          </div>
          <div>
            <h3 id="esim-huawei-phones">{t("huawei_phones")}</h3>
            <ul>
              <li>Huawei P40, P40 Pro, P40 Pro+</li>
              <li>Mate 40, Mate 40 Pro</li>
            </ul>{" "}
          </div>
          <div>
            <h3 id="esim-sony-phones">{t("sony_phones")}</h3>
            <ul>
              <li>Sony Xperia 10 III Lite</li>
            </ul>{" "}
          </div>
          <div>
            <h3 id="esim-microsoft-phones">{t("microsoft_phones")}</h3>
            <ul>
              <li>Surface Duo</li>
            </ul>{" "}
          </div>
          <h2 id="esim-watches">{t("smart_watches")}</h2>
          <div>
            <h3 id="esim-apple-watches"> {t("apple_watches_with_esim")}</h3>
            <ul>
              <li>Apple Watch 3</li>
              <li>Apple Watch 4</li>
              <li>Apple Watch 5</li>
              <li>Apple Watch SE (1st gen)</li>
              <li>Apple Watch Series 6</li>
              <li>Apple Watch Series 7</li>
              <li>Apple Watch Series 8</li>
              <li>Apple Watch SE (2nd gen)</li>
              <li>Apple Watch Ultra</li>
            </ul>{" "}
          </div>
          <div>
            <h3 id="esim-huawei-watches"> {t("huawei_watches_with_esim")}</h3>
            <ul>
              <li>Huawei Watch 2 Pro (4G)</li>
            </ul>{" "}
          </div>
          <div>
            <h3 id="esim-samsung-watches"> {t("samsung_watches_with_esim")}</h3>
            <ul>
              <li>Samsung Galaxy Gear S3 , Samsung Galaxy Watch Active 2</li>
            </ul>{" "}
          </div>
          <div>
            <h3 id="esim-xiaomi-watches"> {t("xiaomi_watches_with_esim")}</h3>
            <ul>
              <li>Huami Amazfit Verge 2 (Nexo)</li>
              <li>Amazfit Nexo Marvel Edition</li>
              <li>Amazfit Smart Watch 2</li>
            </ul>
          </div>
          <h2 id="esim-tablets"> {t("tablets_with_esim")}</h2>
          <div>
            <h3 id="esim-apple-tablets">{t("apple_tablets_with_esim")}</h3>
            <ul>
              <li>11-inches iPad Pro</li>
              <li>12,9-inches iPad Pro (3rd gen)</li>
              <li>iPad (7th gen)</li>
              <li>iPad Air (3rd gen)</li>
              <li>iPad mini (5th gen)</li>
            </ul>{" "}
          </div>
          <div>
            <h3 id="esim-microsoft-tablets">
              {t("microsoft_tablets_with_esim")}
            </h3>
            <ul>
              <li>Microsoft Surface Tablet Pro (5th gen)</li>
            </ul>
          </div>
          <p>{t("more_devices_with_esim")}</p>
          <div style={{ marginBottom: 50 }}>
            <ul>
              <li>Lenovo Yoga 630</li>
              <li>HP Spectre Folio</li>
              <li>Surface Pro X</li>
              <li>ACER Swift 7,ACER Swift 3</li>
              <li>Microsoft Surface Pro 5 LTE Advanced</li>
              <li>ASUS Mini Transformer T103HAF</li>
              <li>VAIO Series 11, VAIO Series 13, VAIO Pro PG,VAIO Pro PF</li>
            </ul>
          </div>
          <ManageYourNumbers sectionTitle="download_the_esimplus_app_virtual_numbers" />
        </Container>
        <Footer />
      </Wrapper>
    </>
  );
}

export default SupportedDevices;

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", [
        "common",
        "navbar",
        "footer",
      ])),
    },
  };
};
