import { OrderedList, Paragraph, SectionTitle } from "@/shared/ui/styled";
import styled from "styled-components";

export const PhoneNumberCapability = styled.div`
  font-size: 18px;
  line-height: 30px;
  padding: 35px 0;
  color: ${(props) => props.theme.primaryText};
  display: flex;
  align-items: flex-start;
  justify-content: center;
  grid-gap: 15px;
  position: relative;

  span {
    text-transform: capitalize;
  }

  &:after {
    content: "";
    display: block;
    height: 1px;
    width: calc(100% - 35px);
    background: ${(props) => props.theme.borderColor};
    right: 0;
    bottom: 0;
    position: absolute;
  }

  &:last-child {
    &:after {
      display: none;
    }
  }

  @media (max-width: 900px) {
    line-height: 24px;
  }
`;
export const PhoneNumberCapabilities = styled.div`
  padding-left: 50px;

  @media (max-width: 900px) {
    padding: 15px 0;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  grid-gap: 100px;

  ${OrderedList} {
    margin: 50px 0;
  }

  > div {
    padding-top: 100px;
    padding-bottom: 100px;
    width: 100%;

    &:first-child {
      padding-left: calc(50% - 636px);

      ${Paragraph} {
        &:first-of-type {
          margin-top: 25px;
        }
        &:last-of-type {
          margin-top: 80px;
        }
      }
    }
    &:last-child {
      padding-right: calc(50% - 636px);
      background: ${(props) => props.theme.howToGetNumberBg};
    }
  }

  @media (max-width: 1272px) {
    flex-direction: column;
    grid-gap: 15px;

    ${OrderedList} {
      margin: 0;
    }

    > div {
      padding: 0 16px;

      &:first-child {
        display: flex;
        flex-direction: column;
        grid-gap: 40px;
        padding-left: 16px;

        ${SectionTitle} {
          margin: 0;
        }

        ${Paragraph} {
          margin: 0 !important;
        }
      }
      &:last-child {
        padding-right: 16px;
      }
    }
  }
`;
