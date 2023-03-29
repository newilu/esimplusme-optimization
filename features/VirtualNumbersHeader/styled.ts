import styled from "styled-components";
import { motion } from "framer-motion";
import ornament from "shared/assets/ornament.svg";

export const SectionSubtitle = styled.div`
  font-weight: 300;
  font-size: 24px;
  line-height: 35px;
  color: ${(props) => props.theme.secondaryText};

  @media (max-width: 600px) {
    font-size: 18px;
    line-height: 22px;
  }

  @media (max-width: 430px) {
    font-size: 16px;
    line-height: 20px;
  }
`;

export const SectionTitle = styled.h1`
  position: relative;
  white-space: pre-line;
  margin: 1rem 0 50px 0;
  font-style: normal;
  font-weight: 700;
  font-size: 56px;
  line-height: 67px;
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
    font-size: 38px;
    line-height: 40px;
    margin: 1rem 0 40px 0;
  }
  @media (max-width: 430px) {
    font-size: 28px;
    line-height: 30px;
    margin: 1rem 0 30px 0;
  }
`;

export const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  flex-basis: 55%;

  > div {
    max-width: 600px;
    margin-bottom: 80px;
  }

  > button {
    padding: 0;

    > a {
      text-decoration: none;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 1rem;
      color: inherit;
    }
  }

  @media (max-width: 767px) {
    > div {
      max-width: unset;
      margin-bottom: 40px;
    }

    > button {
      width: 100%;
    }
  }
`;

export const MessageText = styled.div`
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  color: #6f6f6f;
`;
export const MessageTitle = styled.div`
  font-weight: 600;
  font-size: 18px;
  line-height: 30px;
  letter-spacing: 0.01em;
  color: #101010;
`;

export const Message = styled(motion.div)`
  max-width: 400px;
  width: 100%;
  position: relative;
  z-index: 2;
  padding: 20px 16px;
  overflow: hidden;
  display: flex;
  grid-gap: 10px;
  align-items: center;
  box-shadow: 0 10px 15px rgba(41, 102, 228, 0.1);
  border-radius: 20px;
  background: white;

  > div:first-child {
    display: flex;
    align-items: center;
  }

  @media (max-width: 767px) {
    max-width: 100%;
  }

  @media (max-width: 430px) {
    width: 100%;
    max-width: 270px;
    margin: 0 auto;
    img {
      width: 26px;
      height: 26px;
    }

    ${MessageTitle} {
      font-size: 12px;
      line-height: 20px;
    }
    ${MessageText} {
      font-size: 10px;
      line-height: 10px;
    }
  }
`;
export const MessagesWrapper = styled(motion.div)`
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  grid-gap: 20px;
  padding-left: 16px;

  .slick-active.slick-slide {
    opacity: 1;
    transition: 0.2s all var(--easing-func);
  }

  .slick-active ~ .slick-slide:not(.slick-active) {
    opacity: 0;
    transition: 0.5s all var(--easing-func);
  }

  @media (max-width: 767px) {
    padding: 30px 0 40px 0;
    width: 100%;
  }

  @media (max-width: 430px) {
    grid-gap: 10px;
  }
`;

export const MessagesSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 4;
`;

export const Wrapper = styled.div`
  margin-bottom: 100px;
  display: flex;
  grid-gap: 16px;
  min-height: 700px;
  height: 100vh;
  max-height: 1000px;

  > div:last-child {
    position: relative;
    width: 100%;
    flex-basis: 45%;
    border-radius: 0 0 0 100px;

    &::after {
      content: "";
      background: ${(props) => props.theme.notificationsBg};
      border-radius: 0 0 0 100px;
      position: absolute;
      width: 100000px;
      height: 100%;
      left: 0;
      top: 0;
    }
  }

  ${SectionTitle} {
    z-index: 4;

    > div {
      position: relative;
      z-index: 4;
      > div {
        display: inline;
        color: white;
        position: relative;
        white-space: nowrap;
        z-index: -1;

        img {
          width: 170%;
          position: absolute;
          z-index: -1;
          left: 0;
          top: 0;
          transform: translate(-5%, -30%);
        }
      }
    }
  }

  @media (min-height: 1000px) {
    min-height: unset;
    height: 100vh;
    max-height: 800px;
  }

  @media (max-width: 767px) {
    flex-direction: column-reverse;

    > div:last-child {
      flex-basis: 100%;
      &::after {
        left: -16px;
      }
    }
    ${MessagesSection} {
      overflow: hidden;
      border-radius: 0 !important;

      &::after {
        display: none;
      }

      ${Message} {
        box-shadow: none;
        border: 1px solid ${(props) => props.theme.cardsBorder};
      }
    }
  }

  @media (max-width: 430px) {
    min-height: unset;
  }
`;
