import styled from "styled-components";
import { Card } from "@/shared/ui/styled";
import { Wrapper as MobileDataBundleCardWrapper } from "@/entities/MobileDataBundleCard/styled";

export const CountryCard = styled(Card)`
  padding: 30px 16px;
  flex: 0 1 195px;
  display: flex;
  flex-direction: column;
  align-items: center;
  grid-gap: 15px;
  cursor: pointer;
  background: ${(props) => props.theme.translucentCardsBg};

  &:hover {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  }

  > div:first-child {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    overflow: hidden;
    width: 56px;
    height: 42px;
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
    font-size: 16px;
    line-height: 24px;
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

export const SelectedCountryNameWrapper = styled.div`
  > div {
    &:first-child {
      font-weight: 500;
      font-size: 14px;
      line-height: 18px;
      color: ${(props) => props.theme.primaryText};
      margin-bottom: 4px;
    }
    &:last-child {
      font-weight: 400;
      font-size: 12px;
      line-height: 12px;
      color: ${(props) => props.theme.secondaryText};
    }
  }
`;
export const SelectedCountryFlagWrapper = styled.div`
  width: 46px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  overflow: hidden;
  -webkit-backface-visibility: hidden;
  -webkit-transform: translate3d(0, 0, 0);

  img {
    width: 46px;
    height: 46px;
    -webkit-perspective: 1000;
    -webkit-backface-visibility: hidden;
    -webkit-transform: translate3d(0, 0, 0);
    outline: none;
    border: none;
    text-decoration: none;
  }
`;

export const SelectedCountry = styled.div`
  margin-top: 12px;
  flex: 1;
  display: flex;
  grid-gap: 35px;
  align-items: center;
  padding-right: 20px;
  border-right: 1px solid ${(props) => props.theme.borderColor};

  > div {
    display: flex;
    grid-gap: 15px;
    align-items: center;
  }

  > button {
    cursor: pointer;
    display: flex;
    align-items: center;
    height: 36px;
    background: ${(props) => props.theme.translucentCardsBg};
    border: 1px solid ${(props) => props.theme.cardsBorder};
    border-radius: 6px;
    padding: 0 4px;

    img {
      filter: invert(${(props) => (props.theme.name === "light" ? 1 : 0)});
    }
  }
`;

export const DataSizeButton = styled.button<{ active?: boolean }>`
  cursor: pointer;
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  color: ${(props) => (props.active ? "white" : props.theme.secondaryText)};
  background: ${(props) =>
    props.active ? props.theme.primary : props.theme.translucentCardsBg};
  border: 1px solid ${(props) => props.theme.cardsBorder};
  border-radius: 12px;
  height: 36px;
  padding: 0 10px;
  transition: 0.3s all var(--easing-func);

  @media (max-width: 768px) {
    flex: 1;
  }
`;

export const SelectDataSizeButtonsWrapper = styled.div`
  grid-gap: 4px;
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    flex: 1;
    flex-wrap: wrap;
    white-space: nowrap;
  }
`;

export const SelectDataSizeButtons = styled.div`
  margin-bottom: 30px;
  display: flex;
  grid-gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column-reverse;
  }
`;

export const BundlesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  grid-gap: 12px;
  margin-bottom: 12px;
`;

export const SpecialOfferWrapper = styled.div`
  padding: 15px;
  background: ${(props) => props.theme.benefitsBg};
  border-radius: 20px;
  margin-bottom: 30px;

  ${MobileDataBundleCardWrapper} {
    background: ${(props) => props.theme.htmlBg};

    svg {
      color: ${(props) => props.theme.htmlBg} !important;
    }
  }

  > div:first-child {
    font-weight: 600;
    font-size: 18px;
    line-height: 21px;
    margin-bottom: 20px;
    color: ${(props) => props.theme.primaryText};
    display: flex;
    align-items: center;
    grid-gap: 10px;
  }

  ${BundlesWrapper} {
    margin-bottom: 0;
  }

  @media (max-width: 430px) {
    > div:first-child {
      font-size: 20px;
      line-height: 20px;
      grid-gap: 0;

      &:before {
        scale: 0.7;
      }
    }
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
  @media (max-width: 430px) {
    grid-gap: 4px;
  }
`;
