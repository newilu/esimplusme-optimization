import styled from "styled-components";
import Link from "next/link";

export const Wrapper = styled(Link)`
  height: 40px;
  width: 140px;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  background: #000;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
