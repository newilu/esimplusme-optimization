import styled, { css } from "styled-components";

export const SwitchButton = styled.button<{ $isSelected?: boolean }>`
  white-space: nowrap;
  flex: 1;
  cursor: pointer;
  z-index: 2;
  padding: 12px;
  position: relative;
  border-radius: 8px;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  border: none;
  background: ${(props) =>
    props.$isSelected ? props.theme.primary : "transparent"};
  color: ${(props) =>
    props.$isSelected ? "white" : props.theme.secondaryText};
  transition: 0.3s color;

  > div:first-child {
    display: flex;
    flex-direction: column;
    align-items: center;
    grid-gap: 5px;
    text-transform: capitalize;
    position: relative;
    z-index: 2;
  }

  @media (max-width: 920px) {
    width: 100%;
  }
`;

export const Wrapper = styled.div<{
  isOpen?: boolean;
  isStyledAsDropdown?: boolean;
}>`
  display: flex;
  grid-gap: 20px;
  padding: 5px;
  background: ${(props) => props.theme.cardsBg};
  box-shadow: 0 5px 100px rgba(0, 0, 0, 0.1);
  border-radius: 12px;

  @media (max-width: 920px) {
    grid-gap: 0;
  }

  @media (max-width: 768px) {
    ${(props) =>
      props.isStyledAsDropdown &&
      css`
        width: 100% !important;
        flex-direction: column;
        max-height: 50px;
        overflow: hidden;

        ${SwitchButton} {
          display: flex;
          align-items: center;
          justify-content: space-between;
          grid-gap: 20px;

          &:first-child {
            margin-bottom: 5px;
            svg {
              transition: 0.3s all var(--easing-func);
              transform: rotate(${props.isOpen ? "-90deg" : "90deg"});
            }
          }
        }
      `}
  }
`;
