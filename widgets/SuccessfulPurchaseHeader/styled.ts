import styled from "styled-components";
import BaseHeader from "@/shared/ui/BaseHeader";

export const Wrapper = styled(BaseHeader)`
  > div {
    padding-top: 100px;
    padding-bottom: 50px;
    text-align: center;
    max-width: 460px;

    h1 {
      font-weight: 700;
      font-size: 42px;
      line-height: 50px;
      margin: 50px auto 25px auto;
    }

    p {
      font-weight: 400;
      font-size: 16px;
      line-height: 24px;
      margin: 25px auto;
    }

    button {
      max-width: 300px;
      margin: 50px auto 0 auto;
    }
  }
`;
