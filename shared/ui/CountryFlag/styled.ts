import styled from "styled-components";

export const Wrapper = styled.div<{ src?: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  background: url(${(props) => props.src}) center center no-repeat;
  background-size: cover;
`;
