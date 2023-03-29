import styled from "styled-components";
import arrow from "./assets/right-arrow.svg";
import { Card as BaseCard } from "shared/ui/styled";

export const Subtitle = styled.div`
  font-weight: 300;
  font-size: 16px;
  line-height: 26px;
  color: ${(props) => props.theme.secondaryText};

  @media (max-width: 768px) {
    font-size: 14px;
    line-height: 20px;
  }
`;

export const CardText = styled.div`
  font-weight: 300;
  font-size: 16px;
  line-height: 26px;
  color: ${(props) => props.theme.secondaryText};
`;

export const CardTitle = styled.div`
  margin-bottom: 20px;
  font-weight: 600;
  font-size: 20px;
  line-height: 26px;
  color: ${(props) => props.theme.primaryText};
`;

export const Card = styled(BaseCard)`
  position: relative;
  width: 100%;
  counter-increment: section;
  padding: 16px;
  backdrop-filter: blur(250px);

  &:before {
    content: url(${arrow.src});
    position: absolute;
    display: block;
    top: 16px;
    right: -1rem;
  }

  &:last-child:before {
    display: none;
  }

  > div:first-child:before {
    content: "0" counter(section);
    display: block;
    width: fit-content;
    margin-bottom: 30px;
    color: white;
    background: #0076ff;
    box-shadow: 0 5px 100px rgba(0, 0, 0, 0.1);
    border-radius: 20px;
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;
    padding: 20px;
  }

  @media (max-width: 768px) {
    &:before {
      display: none;
    }
  }
`;

export const WhatWeAccept = styled.div`
  font-weight: 400;
  font-size: 14px;
  line-height: 26px;
  color: ${(props) => props.theme.secondaryText};
  text-align: center;
`;

export const GetNumberWrapper = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 70px;

  button {
    margin-bottom: 20px;
    padding: 0;

    > a {
      text-decoration: none;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      padding: 0 1rem;
      color: inherit;
    }
  }

  > div:last-child {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    color: ${(props) => props.theme.primaryText};
    font-weight: 400;
    font-size: 12px;
    line-height: 18px;
    grid-gap: 10px;

    > div {
      display: flex;
      align-items: center;
      grid-gap: 10px;
    }
  }

  @media (max-width: 430px) {
    button {
      width: 100%;
    }
  }
`;

export const CardsWrapper = styled.div`
  position: relative;
  z-index: 2;
  margin: 0;
  padding: 70px 0 50px 0;
  display: flex;
  grid-gap: 2rem;
  list-style: none;

  @media (max-width: 900px) {
    grid-gap: 1rem;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 40px 0;
  }
`;

export const SecondaryBg = styled.div`
  background: ${(props) => props.theme.howitworksSecondaryBg};
  position: absolute;
  bottom: 0;
  width: 1000000px;
  height: 350px;
  z-index: 1;
  transform: translate(-50%);
`;

export const Wrapper = styled.div`
  position: relative;
`;
