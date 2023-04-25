import React from "react";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import facebook from "public/staticfiles/Facebook.svg";
import telegram from "public/staticfiles/Telegram.svg";
import whatWeAccept from "public/staticfiles/what-we-accept.svg";
import { Container } from "utils/styled";
import Logo from "../../entities/Logo";
import {
  ListItem,
  List,
  ListTitle,
  Wrapper,
  ListWrapper,
  SocialNetworksWrapper,
  LinksWrapper,
  TopSection,
  BottomSection,
  Chat,
} from "./styled";
import { Country, Region, RegionById } from "@/utils/types";
import NavLink from "@/shared/ui/NavLink";
import CountryFlag from "@/shared/ui/CountryFlag";
import { BASE_STORAGE_URL, SectionIDS } from "@/shared/constants";
import { scrollToId } from "@/shared/lib";
import { useRouter } from "next/router";
import Link from "next/link";
import { TG_DEFAULT_LINK, TG_RU_LINK } from "@/utils/constants";

function Footer({
  countries = [],
  regions = [],
  worldwideRegion,
}: {
  countries?: Country[];
  regions?: Region[];
  worldwideRegion?: RegionById;
}) {
  const router = useRouter();
  const [isShowingAllCountries, setIsShowingAllCountries] =
    React.useState(false);
  const { t, i18n } = useTranslation();

  const countryList = React.useMemo(
    () => (isShowingAllCountries ? countries : countries.slice(0, 9)),
    [isShowingAllCountries, countries]
  );

  const handleRegionSelect = (region?: string) => {
    scrollToId(SectionIDS.SearchYourDestination, 65);
    void router.push({ query: { region } }, undefined, { shallow: true });
  };

  return (
    <Wrapper>
      <TopSection>
        <Container>
          <div>
            <Logo color="white" />
            <SocialNetworksWrapper>
              <button>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://www.facebook.com/esim4world/"
                >
                  <Image src={facebook} alt="facebook" />
                </a>
              </button>{" "}
              <button>
                <Link
                  target="_blank"
                  rel="noreferrer"
                  href={i18n.language === "ru" ? TG_RU_LINK : TG_DEFAULT_LINK}
                >
                  <Image src={telegram} alt="telegram" />
                </Link>
              </button>{" "}
            </SocialNetworksWrapper>
          </div>
          <div>
            <LinksWrapper>
              <div>
                <ListWrapper>
                  <ListTitle>{t("services")}</ListTitle>
                  <List>
                    <ListItem>
                      <Link
                        target="_blank"
                        rel="noreferrer"
                        href="https://sms.esimplus.me"
                      >
                        {t("virtual_numbers")}
                      </Link>
                    </ListItem>
                    <ListItem>
                      <Link
                        target="_blank"
                        rel="noreferrer"
                        href="https://mobiledata.esimplus.me"
                      >
                        {t("mobile_data")}
                      </Link>
                    </ListItem>
                    <ListItem>
                      <Link href="/blog">{t("blog_page_title")}</Link>
                    </ListItem>
                  </List>
                </ListWrapper>
              </div>
              <div>
                <ListWrapper>
                  <ListTitle>{t("support")}</ListTitle>
                  <List>
                    <ListItem
                      onClick={() => {
                        // eslint-disable-next-line new-cap
                        window.HelpCrunch("openChat");
                      }}
                    >
                      {t("online_support")}
                    </ListItem>
                    <ListItem>
                      <Link
                        target="_blank"
                        rel="noreferrer"
                        href="mailto:support.esim@appvillis.com"
                      >
                        support.esim@appvillis.com
                      </Link>
                    </ListItem>{" "}
                    <ListItem>
                      <Link
                        target="_blank"
                        rel="noreferrer"
                        href={
                          i18n.language === "ru" ? TG_RU_LINK : TG_DEFAULT_LINK
                        }
                      >
                        Telegram
                      </Link>
                    </ListItem>
                  </List>
                </ListWrapper>
              </div>
              <div>
                <ListWrapper>
                  <ListTitle>{t("contacts")}</ListTitle>
                  <List>
                    <ListItem>
                      <a
                        target="_blank"
                        rel="noreferrer"
                        href="mailto:support.esim@appvillis.com"
                      >
                        support.esim@appvillis.com
                      </a>
                    </ListItem>{" "}
                    <ListItem>
                      Appvillis UAB. CRN 304930580. Šiaulių g. 10-56, Vilnius,
                      01134, Lithuania
                    </ListItem>{" "}
                    <ListItem>
                      <a href="tel:+37064757853">+37064757853</a>
                    </ListItem>
                  </List>
                </ListWrapper>
              </div>
            </LinksWrapper>
            {router.pathname === "/" && (
              <LinksWrapper>
                <div>
                  <ListWrapper>
                    <ListTitle>{t("local_esim")}</ListTitle>
                    <List>
                      {countryList.map(({ country, isoName2 }) => (
                        <ListItem key={country}>
                          <NavLink
                            onClick={(e) => {
                              e.preventDefault();
                              handleRegionSelect(isoName2.toLowerCase());
                            }}
                            href="mock"
                          >
                            <Chat key={country}>
                              <div>
                                <CountryFlag
                                  width={22}
                                  height={22}
                                  name={isoName2}
                                  alt="local plan"
                                />
                              </div>
                              {country}
                            </Chat>
                          </NavLink>
                        </ListItem>
                      ))}
                      <ListItem
                        onClick={() =>
                          setIsShowingAllCountries((prev) => !prev)
                        }
                      >
                        <span>
                          {isShowingAllCountries ? "Less" : "More"}...
                        </span>
                      </ListItem>
                    </List>
                  </ListWrapper>
                </div>
                <div>
                  <ListWrapper>
                    <ListTitle>{t("regional_esim")}</ListTitle>
                    <List>
                      {regions.map(({ name }) => (
                        <ListItem key={name}>
                          <NavLink
                            onClick={(e) => {
                              e.preventDefault();
                              handleRegionSelect(name.toLowerCase());
                            }}
                            href="mock"
                          >
                            <Chat key={name}>
                              <div>
                                <Image
                                  width={22}
                                  height={22}
                                  src={`${BASE_STORAGE_URL}48x30/${name}350.jpg`}
                                  alt="regional plan"
                                />
                              </div>
                              {name}
                            </Chat>
                          </NavLink>
                        </ListItem>
                      ))}
                    </List>
                  </ListWrapper>
                </div>
                <div>
                  <ListWrapper>
                    <ListTitle>{t("global_esim")}</ListTitle>
                    <List>
                      <ListItem>
                        <NavLink
                          onClick={(e) => {
                            e.preventDefault();
                            handleRegionSelect(
                              worldwideRegion?.name.toLowerCase()
                            );
                          }}
                          href="mock"
                        >
                          <Chat>
                            <div>
                              <Image
                                width={22}
                                height={22}
                                src={`${BASE_STORAGE_URL}48x30/Pay-as-you-go.jpg`}
                                alt="worldwide plan"
                              />
                            </div>
                            {worldwideRegion?.name}
                          </Chat>
                        </NavLink>
                      </ListItem>
                    </List>
                  </ListWrapper>
                </div>
              </LinksWrapper>
            )}
            <ul>
              <li>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://esimplus.me/privacy"
                >
                  {t("privacy_policy")}
                </a>
              </li>{" "}
              <li>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://esimplus.me/terms"
                >
                  {t("terms_of_use")}
                </a>
              </li>{" "}
              <li>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://esimplus.me/esim-supported-devices"
                >
                  {t("esim_supported_devices")}
                </a>
              </li>{" "}
            </ul>
          </div>
        </Container>
      </TopSection>
      <BottomSection>
        <Container>
          <div>Appvillis UAB, {new Date().getFullYear()}</div>
          <ul>
            <li>
              <Link href="/privacy">{t("privacy_policy")}</Link>
            </li>{" "}
            <li>
              <Link href="/terms">{t("terms_of_use")}</Link>
            </li>{" "}
            <li>
              <Link href="/esim-supported-devices">
                {t("esim_supported_devices")}
              </Link>
            </li>{" "}
          </ul>
          <div>
            <Image
              width={130}
              height={24}
              src={whatWeAccept}
              alt="what we accept"
            />
          </div>
        </Container>
      </BottomSection>
    </Wrapper>
  );
}

export { Footer };
