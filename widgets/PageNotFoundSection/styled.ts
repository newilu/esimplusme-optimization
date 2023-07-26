import styled from "styled-components";
import { Container } from "@/shared/ui/styled";

export const Wrapper = styled(Container)`
  color: ${(props) => props.theme.primaryText};
  text-align: center;
  padding: 160px 16px;
  min-height: 50vh;
  flex: 1 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;

  h1 {
    font-weight: 700;
    font-size: 42px;
    line-height: 50px;
    margin: 50px 0 15px 0;
  }

  p {
    font-weight: 400;
    font-size: 16px;
    line-height: 26px;
    max-width: 700px;
    margin: 0 auto;
  }

  img {
    width: 100%;
    height: auto;
    max-width: 550px;
    display: block;
    margin: 0 auto;
  }

  @media (max-width: 500px) {
    h1 {
      font-size: 28px;
      line-height: 30px;
    }
    p {
      line-height: 22px;
      font-size: 14px;
    }
  }
  @media (max-width: 330px) {
    h1 {
      font-size: 24px;
      line-height: 26px;
      margin: 30px 0 10px 0;
    }
    p {
      line-height: 18px;
      font-size: 12px;
    }
  }
`;
