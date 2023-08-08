import styled from "styled-components";

export const Wrapper = styled.label<{ $checked: boolean, $disabled?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${(props) => props.$checked ? '5px 19px' : '6px 20px'};
  box-sizing: border-box;
  border-radius: 18px;
  border-style: solid;
  border-width: ${(props) => props.$checked ? '2px' : '1px'};
  border-color: ${(props) => props.$checked ? '#54C7FC' : props.theme.radioGroupBorderColor};
  background-color: ${(props) => props.$checked ? 'rgba(84, 199, 252, 0.15)' : 'transparent'};
  cursor: pointer;
  pointer-events: ${(props) => props.$disabled ? 'none' : 'auto'};
  opacity: ${(props) => props.$disabled ? .6 : 1};
`