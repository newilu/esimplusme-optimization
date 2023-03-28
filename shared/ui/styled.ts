import styled from "styled-components";
import ornament from "../assets/ornament.svg";

export const NoMatchesText = styled.div`
  padding: 0 25px;
  font-weight: 400;
  font-size: 16px;
  line-height: 26px;
  text-align: center;
  color: ${(props) => props.theme.secondaryText};
`;

export const Card = styled.div`
  background: ${(props) => props.theme.cardsBg};
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  border: 1px solid ${(props) => props.theme.cardsBorder};
  border-radius: 20px;
`;
export const Container = styled.div`
  position: relative;
  margin: 0 auto;
  padding: 0 16px;
  max-width: 1272px;
  width: 100%;
  height: 100%;
`;

export const SectionTitle = styled.h2`
  position: relative;
  white-space: pre-line;
  margin: 1rem 0;
  font-style: normal;
  font-weight: 700;
  font-size: 42px;
  line-height: 50px;
  color: ${(props) => props.theme.primaryText};
  text-align: left;

  &::before {
    position: absolute;
    content: "";
    background: url(${ornament.src}) no-repeat center center;
    width: 90px;
    height: 100px;
    background-size: contain;
    left: 0;
    top: 0;
    transform: translate(-45%, -35%);
  }

  @media (max-width: 768px) {
    font-size: 28px;
    line-height: 33px;
  }
`;
