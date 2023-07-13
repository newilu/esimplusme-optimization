import styled from "styled-components";

export const Label = styled.label`
  margin-bottom: 30px;
  padding: 16px;
  border-radius: 12px;
  border: 1px solid ${(props) => props.theme.searchInputBorderColor};
  height: 60px;
  display: flex;
  grid-gap: 10px;
  position: relative;

  > svg {
    position: absolute;
    top: 50%;
    right: 16px;
    transform: translateY(-50%);
    fill: ${(props) => props.theme.primaryText};
    cursor: pointer;
  }

  input {
    text-overflow: ellipsis;
    border: none;
    background: transparent;
    flex: 1;
    outline: none;
    font-weight: 400;
    font-size: 16px;
    line-height: 26px;
    height: 30px;
    color: ${(props) => props.theme.primaryText};

    &::placeholder {
      color: ${(props) => props.theme.primaryText};
      opacity: 0.65;
    }
  }

  button {
    height: 100%;
    background: transparent;
    color: ${(props) => props.theme.primaryText};
    border: none;
    border-right: 1px solid ${(props) => props.theme.borderColor};
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 10px;
  }
`;
