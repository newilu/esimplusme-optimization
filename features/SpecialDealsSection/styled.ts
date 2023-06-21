import styled from "styled-components";
import { Card, SectionTitle } from "@/shared/ui/styled";

export const SpecialDealCardSubtitle = styled.div`
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
  color: ${(props) => props.theme.primaryText};
  display: flex;
  align-items: center;
  justify-content: center;
  grid-gap: 8px;
  margin-bottom: 25px;
`;
export const SpecialDealCardTitle = styled.div`
  font-weight: 700;
  font-size: 32px;
  line-height: 40px;
  color: ${(props) => props.theme.primaryText};
  margin-bottom: 8px;
  text-align: center;
`;
export const SpecialDealCard = styled(Card)`
  flex: 1;
  padding: 25px;
  background: ${(props) => props.theme.cardsBg};

  button {
    margin: 0 auto;
  }
`;
export const SpecialDealsWrapper = styled.div`
  padding: 60px 0;
  display: flex;
  grid-gap: 45px;
  flex-wrap: wrap;
`;

export const Wrapper = styled.div`
  padding: 0 0 50px 0;
  background: ${(props) => props.theme.specialDealsBg};

  ${SectionTitle} {
    margin: 0;
    text-align: center;
    &:before {
      display: none;
    }
  }
`;
