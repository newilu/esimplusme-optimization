import styled from "styled-components";

export const Wrapper = styled.label<{ checked: boolean }>`
  cursor: pointer;
  position: relative;
  width: 24px;
  flex: 0 0 24px;
  height: 24px;
  background: ${(props) => props.theme.primary};
  border-radius: 6px;
  user-select: none;
  opacity: ${(props) => (props.checked ? 1 : 0.5)};
  filter: grayscale(${(props) => (props.checked ? 0 : 1)});

  svg {
    fill: white;
  }

  input {
    opacity: 0;
    visibility: hidden;
    margin: 0;
    padding: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
  }

  svg {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
`;
