import styled from "styled-components";
import { Container, SectionTitle } from "@/shared/ui/styled";

export const FaqItemText = styled.div`
  color: ${(props) => props.theme.secondaryText};
  font-size: 16px;
  font-weight: 600;
  line-height: 26px;
`;
export const FaqItemTitle = styled.div`
  color: ${(props) => props.theme.primaryText};
  font-size: 18px;
  font-weight: 700;
  line-height: 24px;
  letter-spacing: -0.2px;
  margin-bottom: 10px;

  > * {
    display: inline;
  }

  &:before {
    content: counter(faq-item) ". ";
  }
`;
export const FaqItem = styled.div`
  counter-increment: faq-item;
`;
export const FaqWrapper = styled.div`
  flex: 0 1 600px;
  display: flex;
  flex-direction: column;
  gap: 30px;

  @media (max-width: 900px) {
    flex: 0;
  }
`;

export const Wrapper = styled(Container)`
  display: flex;
  margin: 50px auto;

  ${SectionTitle} {
    flex: 1;
  }

  @media (max-width: 900px) {
    flex-direction: column;
    gap: 50px;
  }
`;
