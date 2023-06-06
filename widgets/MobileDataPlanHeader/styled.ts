import styled from "styled-components";
import blur from "./assets/blur-min.png";
import bannerBlur from "./assets/banner-blur-min.png";
import bestPrice from "./assets/best-price.svg";
import { Card } from "@/shared/ui/styled";

export const CountryCard = styled(Card)`
  padding: 30px 16px;
  flex: 0 1 180px;
  display: flex;
  flex-direction: column;
  align-items: center;
  grid-gap: 15px;
  cursor: pointer;
  background: ${(props) => props.theme.translucentCardsBg};

  > div:first-child {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    overflow: hidden;
    width: 42px;
    height: 30px;
    -webkit-backface-visibility: hidden;
    -webkit-transform: translate3d(0, 0, 0);

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      -webkit-perspective: 1000;
      -webkit-backface-visibility: hidden;
      -webkit-transform: translate3d(0, 0, 0);
      outline: none;
      border: none;
      text-decoration: none;
    }
  }

  > div:last-child {
    margin: auto 0;
    text-align: center;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    font-weight: 500;
    font-size: 14px;
    line-height: 18px;
    color: ${(props) => props.theme.primaryText};
  }

  @media (max-width: 768px) {
    flex: 1 1 180px;
  }
  @media (max-width: 400px) {
    flex: 1 1 130px;
    grid-gap: 15px;
    padding: 15px;
  }
`;

export const SeeAllCard = styled(CountryCard)`
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.1);
  > div {
    color: ${(props) => props.theme.primaryText} !important;
  }
`;

export const CountriesCards = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  grid-gap: 16px;

  @media (max-width: 768px) {
    grid-gap: 8px;
  }
`;

export const MobileDataBundleBannerHeader = styled.div`
  font-weight: 400;
  font-size: 20px;
  line-height: 16px;
  display: flex;
  align-items: center;
  grid-gap: 8px;
  color: #ffffff;

  > div {
    border-radius: 5px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 30px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;

export const BundleCapability = styled.div`
  width: 100%;
  padding: 0 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-right: 1px solid rgba(111, 111, 111, 1);

  &:last-child {
    border: none;
  }

  > div:first-child {
    font-weight: 400;
    font-size: 16px;
    line-height: 21px;
    letter-spacing: 0.02em;
    color: white;
  }

  > div:last-child {
    text-align: center;
    font-weight: 300;
    font-size: 10px;
    line-height: 20px;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: white;
  }

  @media (max-width: 430px) {
    min-width: 75px;
    flex: 1;
  }
  @media (max-width: 350px) {
    flex: 1;

    &:nth-child(2) {
      flex: 1 1 auto;
    }
  }
`;

export const BundleCapabilities = styled.div`
  display: flex;
  margin: 25px 0;
`;

export const MobileDataBundleBanner = styled.div`
  padding: 20px;
  background: radial-gradient(
    100% 1129% at -0.04% -31.58%,
    #040d30 34.11%,
    #000006 100%
  );
  box-shadow: 0 5px 100px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  position: relative;
  max-width: 400px;
  flex: 1 1 350px;

  > * {
    position: relative;
    z-index: 2;
  }

  &:after {
    content: "";
    background: url(${bestPrice.src}) no-repeat center center;
    background-size: cover;
    width: 65px;
    height: 48px;
    position: absolute;
    right: 10px;
    top: -4px;
  }

  &:before {
    content: "";
    background: url(${bannerBlur.src}) center center no-repeat;
    background-size: cover;
    width: 100%;
    height: 80px;
    position: absolute;
    z-index: 0;
    bottom: 0;
    left: 0;
    border-radius: 0 0 20px 20px;
    display: block;
  }
  button {
    width: 100%;
  }
`;

export const CardsWrapper = styled.div`
  display: flex;
  grid-gap: 30px;
  flex-wrap: wrap;
  margin: 35px 0;

  @media (max-width: 768px) {
    grid-gap: 8px;
    justify-content: center;

    > div {
      max-width: 500px;
    }
  }
`;
export const AvailableDataSizes = styled.div`
  margin: 35px auto;
  display: flex;
  justify-content: center;
  align-items: center;
  grid-gap: 4px;
  flex-wrap: wrap;

  button {
    flex: 0 1 80px;
    height: 36px;
  }
`;
export const SelectedCountryImageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  width: 64px;
  height: 50px;
  border-radius: 8px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
export const SelectedCountry = styled.div`
  margin-top: 40px;
  font-weight: 700;
  font-size: 32px;
  line-height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  grid-gap: 15px;
  color: ${(props) => props.theme.primaryText};
`;
export const Wrapper = styled.div`
  position: relative;
  z-index: 2;
  padding-top: 50px;

  &:before {
    content: "";
    z-index: -1;
    display: block;
    position: absolute;
    top: -65px;
    width: 100%;
    height: 500px;
    background: url(${blur.src}) top center no-repeat;
    background-size: cover;
  }
  h1 {
    padding: 0 16px;
    margin: 0 auto 15px auto;
    font-weight: 700;
    font-size: 64px;
    line-height: 64px;
    text-align: center;
    color: ${(props) => props.theme.primaryText};
  }

  h2 {
    padding: 0 16px;
    font-weight: 500;
    font-size: 18px;
    line-height: 24px;
    text-align: center;
    color: ${(props) => props.theme.primaryText};
    margin: 15px auto 35px auto;
  }

  > div > label {
    margin: 0 auto;
    max-width: 500px;
  }

  @media (max-width: 768px) {
    h1 {
      font-weight: 700;
      font-size: 48px;
      line-height: 48px;
    }
    h2 {
      font-weight: 500;
      font-size: 18px;
      line-height: 24px;
    }
  }
`;
