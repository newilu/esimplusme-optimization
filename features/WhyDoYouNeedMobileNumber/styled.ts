import styled from "styled-components";
import { Paragraph, SectionTitle } from "@/shared/ui/styled";
import checkmark from "@/shared/assets/checkmark.svg";

export const ListTitle = styled.div`
  font-size: 18px;
  font-weight: 700;
  line-height: 30px;
  color: ${(props) => props.theme.primaryText};
  margin-bottom: 25px;
`;

export const Wrapper = styled.div`
  display: flex;
  margin: 50px 0;
  gap: 100px;

  > div {
    width: 100%;
    &:first-child {
      padding: 100px 0 100px calc(50% - 636px);
    }

    &:last-child {
      padding: 100px calc(50% - 636px) 100px 50px;
      background: ${(props) => props.theme.howToGetNumberBg};
    }
  }

  ul {
    margin: 0;
    padding: 0 16px 0 0;
    display: flex;
    flex-direction: column;
    gap: 15px;

    li {
      display: flex;
      align-items: flex-start;
      grid-gap: 15px;
      font-size: 16px;
      line-height: 26px;
      color: ${(props) => props.theme.secondaryText};

      &:before {
        content: "";
        background: url(${checkmark.src}) center center;
        flex: 0 0 20px;
        width: 20px;
        height: 20px;
        display: block;
      }
    }
  }

  ${SectionTitle},${Paragraph} {
    padding-left: 16px;
  }

  ${SectionTitle} {
    margin: 0 0 50px 0;
  }

  @media (max-width: 1024px) {
    gap: 40px;

    ${SectionTitle} {
      margin: 0 0 40px 0;
    }

    > div:last-child {
      padding-left: 40px;
    }
  }

  @media (max-width: 900px) {
    flex-direction: column;

    ${SectionTitle},${Paragraph} {
      padding-left: 0;
    }

    ul {
      padding-right: 0;
    }
    > div:first-child {
      padding: 0 16px;
    }
    > div:last-child {
      padding: 20px 16px 50px 16px;
    }
  }
`;
