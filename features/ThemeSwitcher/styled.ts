import styled, { css } from "styled-components";

export const Label = styled.label<{
  checked?: boolean;
  disabled?: boolean;
  disableTransition?: boolean;
}>`
  position: relative;
  display: flex;
  align-items: center;
  text-transform: uppercase;
  width: 64px;
  height: 32px;
  cursor: pointer;
  border-radius: 100vmax;
  opacity: ${(props) => (props.disabled ? "0.4" : "1")};
  user-select: none;
  border: 1px solid ${(props) => props.theme.borderColor};
  transition: 0.35s all var(--easing-func);

  input {
    display: none;
  }

  > div {
    position: relative;
    z-index: 3;
    width: 32px;
    height: 32px;
    border-radius: 25px;
    transition: all 0.35s var(--easing-func);

    > div {
      width: 100%;
      height: 100%;
      background: #f1f1f1;
      border-radius: 25px;
      position: relative;

      img:first-child:hover {
        transform: translate(-50%, -50%) scale(1.2) rotate(360deg);
      }
      img:last-child:hover {
        transform: translate(-50%, -50%) scale(1.2) rotate(-110deg);
      }
      img {
        position: absolute;
        width: 20px;
        height: 20px;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        transition: 0.5s all var(--easing-func);

        &:last-child {
          opacity: 0;
          visibility: hidden;
        }
      }
    }

    ${(props) =>
      props.checked &&
      css`
        transform: translateX(100%);
        background: rgba(255, 255, 255, 0.05);

        > div {
          background: rgba(255, 255, 255, 0.05);

          img {
            &:first-child {
              transform: translate(-50%, -50%) scale(0.9) rotate(-360deg);
              opacity: 0;
              visibility: hidden;
            }
            &:last-child {
              opacity: 1;
              visibility: visible;
            }
          }
        }
      `}
  }

  ${(props) =>
    props.disableTransition &&
    css`
      > div {
        transition: none;
      }
    `}
`;

export const Wrapper = styled.div<{ size?: "medium" | "small" }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 20px;

  > div:first-child {
    display: flex;
    align-items: center;
    gap: 14px;

    img {
      width: 25px;
      height: 24px;
    }

    div {
      white-space: pre-line;
      font-size: 12px;
      line-height: 18px;
    }
  }

  ${(props) => {
    switch (props.size) {
      case "medium":
        return css``;
      case "small":
        return css`
          ${Label} {
            width: 52px;
            height: 26px;
            > div {
              width: 26px;
              height: 26px;

              img {
                width: 16px;
                height: 16px;
              }
            }
          }
        `;
      default:
        return css``;
    }
  }}
`;
