import styled, { css } from "styled-components";
import ornament from "../assets/ornament.svg";

export const PanelSectionTitle = styled.div`
  padding: 15px 25px;
  color: ${(props) => props.theme.primaryText};
  font-weight: 700;
  font-size: 18px;
  line-height: 26px;
`;
export const PanelSection = styled.div<{ flex?: string | number }>`
  background: ${(props) => props.theme.panelSectionBg};
  border-radius: 5px;
  flex: ${(props) => props.flex};
  overflow: hidden;
  margin: 5px auto;
  max-width: 900px;
  display: flex;
  flex-direction: column;

  &:only-of-type {
    border-radius: 25px;
  }
`;

PanelSection.defaultProps = {
  flex: 1,
};

export const PanelSectionsWrapper = styled.div<{
  dir?: "column" | "row";
  maxWidth?: number;
}>`
  display: flex;
  grid-gap: 5px;
  max-width: ${(props) => props.maxWidth}px;
  margin: 50px auto;

  ${PanelSection} {
    margin: 0;
  }

  ${(props) => {
    switch (props.dir) {
      case "column":
        return css`
          flex-direction: column;
          ${PanelSection} {
            flex: 1;

            &:first-of-type:not(&:only-of-type) {
              border-radius: 25px 25px 5px 5px;
            }
            &:last-of-type:not(&:only-of-type) {
              border-radius: 5px 5px 25px 25px;
            }
          }
        `;
      case "row":
        return css`
          flex-direction: row;

          ${PanelSection} {
            &:first-of-type:not(&:only-of-type) {
              border-radius: 25px 5px 5px 25px;
            }
            &:last-of-type:not(&:only-of-type) {
              border-radius: 5px 25px 25px 5px;
            }
          }
        `;
      default:
        return css``;
    }
  }}
`;

PanelSectionsWrapper.defaultProps = {
  maxWidth: 900,
};

export const NoDataWrapper = styled.div`
  flex: 1;
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  font-size: 13px;
  line-height: 16px;
  color: ${(props) => props.theme.secondaryText};
`;

export const NoMatchesText = styled.div`
  padding: 0 25px;
  font-weight: 400;
  font-size: 16px;
  line-height: 26px;
  text-align: center;
  color: ${(props) => props.theme.secondaryText};
`;

export const Card = styled.div`
  background: ${(props) => props.theme.translucentCardsBg};
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

export const OrderedListItem = styled.li`
  position: relative;
  padding-left: 40px;
  counter-increment: counter;
  font-size: 16px;
  line-height: 26px;
  color: ${(props) => props.theme.secondaryText};

  &:before {
    content: counter(counter);
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    justify-content: center;
    align-items: center;
    width: 24px;
    height: 24px;
    border-radius: 100vmax;
    color: white;
    background: ${(props) => props.theme.primary};
    font-size: 12px;
    line-height: 26px;
  }
`;
export const OrderedList = styled.ol`
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

export const Paragraph = styled.p`
  text-align: left;
  font-weight: 300;
  font-size: 16px;
  line-height: 26px;
  color: ${(props) => props.theme.secondaryText};

  a {
    text-decoration: underline;
    color: ${(props) => props.theme.primary};
  }
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
