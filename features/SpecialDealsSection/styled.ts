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

  @media (max-width: 900px) {
    display: flex;
    gap: 15px;
    flex-direction: column;
  }
`;

export const SpecialDealCardSubtitle = styled.div`
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
  color: ${(props) => props.theme.primaryText};
  margin-bottom: 25px;
  text-align: center;

  > * {
    display: inline-flex !important;
    vertical-align: middle;
  }
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

  a {
    margin: 0 auto;
  }

  @media (max-width: 900px) {
    flex: 1 1 300px;
  }
`;
export const SpecialDealsWrapper = styled.div`
  padding: 60px 0;
  display: flex;
  grid-gap: 45px;
  flex-wrap: wrap;

  @media (max-width: 1024px) {
    grid-gap: 20px;
    padding: 40px 0;
  }
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
