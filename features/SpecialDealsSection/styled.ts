import styled from "styled-components";
import { Card, SectionTitle } from "@/shared/ui/styled";
import checkmark from "./assets/checkmark.svg";

export const VirtualPhoneNumberServicesInformationItem = styled.li`
  display: flex;
  align-items: flex-start;
  grid-gap: 15px;
  font-size: 16px;
  line-height: 26px;
  color: ${(props) => props.theme.secondaryText};

  &:before {
    content: "";
    background: url(${checkmark.src}) center center;
    flex: 0 0 20px;
    width: 20px;
    height: 20px;
    display: block;
  }
`;
export const VirtualPhoneNumberServicesInformationList = styled.ul`
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 25px 50px;
`;

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
