import styled, { css } from "styled-components";
import { Container, SectionTitle } from "shared/ui/styled";
import ornament from "@/shared/assets/images/ornament.svg";

export const QuestionAnswer = styled.div`
  padding-right: 90px;
  color: ${(props) => props.theme.secondaryText};
  font-weight: 300;
  font-size: 16px;
  line-height: 26px;
  max-height: 0;
  overflow: hidden;

  a {
    cursor: pointer;
    text-decoration: none;
    color: ${(props) => props.theme.primary};
  }

  ul {
    padding-left: 16px;
    margin: 20px 0;

    li {
      padding: 5px 0;
    }
  }

  @media (max-width: 768px) {
    padding-right: 0;
  }
`;

export const QuestionTitle = styled.div<{ isOpen: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  padding-bottom: 0;
  font-weight: 600;
  font-size: 16px;
  line-height: 26px;
  color: ${(props) => props.theme.primaryText};

  &:after {
    content: "+";
    display: block;
  }

  ${(props) =>
    props.isOpen &&
    css`
      &:after {
        content: "-";
      }
    `}
`;

export const Question = styled.li`
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  padding-bottom: 40px;

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 768px) {
    padding-bottom: 25px;
  }
`;

export const QuestionsWrapper = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  grid-gap: 40px;

  @media (max-width: 768px) {
    grid-gap: 25px;
  }
`;

export const Wrapper = styled(Container)`
  padding-bottom: 60px;
  display: flex;
  grid-gap: 100px;

  h3 {
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
  }

  > div:last-child {
    width: 100%;
  }

  ${SectionTitle} {
    width: min-content;
  }

  @media (max-width: 768px) {
    padding-bottom: 20px;
    flex-direction: column;
    grid-gap: 20px;

    ${SectionTitle} {
      width: 100%;
    }
  }
`;
