import styled from "styled-components";

export const Agreement = styled.div`
  display: flex;
  align-items: center;
  grid-gap: 12px;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: ${(props) => props.theme.secondaryText};
`;
export const Agreements = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  grid-gap: 4px;
`;
export const PhoneNumberCapabilityAvailability = styled.div`
  display: flex;
  align-items: center;
  grid-gap: 12px;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: ${(props) => props.theme.primaryText};

  svg {
    fill: #50a854;
  }
`;
export const InfoField = styled.div`
  display: flex;
  align-items: center;
  grid-gap: 12px;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: ${(props) => props.theme.primaryText};

  svg {
    flex-shrink: 0;
    fill: ${(props) => props.theme.primary};
  }
`;
export const PhoneNumberCapability = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px 0;
`;
export const PhoneNumberCapabilitiesInfo = styled.div`
  margin-bottom: 30px;
  padding-top: 20px;
  border-top: 1px solid ${(props) => props.theme.borderColor};
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
  color: ${(props) => props.theme.secondaryText};
`;
export const AboutServiceSection = styled.div`
  margin-bottom: 20px;
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
  color: ${(props) => props.theme.secondaryText};

  ul {
    margin: 8px 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    grid-gap: 10px;

    li {
      font-weight: 400;
      font-size: 16px;
      line-height: 24px;
      color: ${(props) => props.theme.primaryText};
      display: flex;
      align-items: center;
      grid-gap: 8px;

      svg {
        fill: ${(props) => props.theme.primary};
      }
    }
  }
`;

export const PhoneNumberPrice = styled.div`
  font-weight: 700;
  font-size: 32px;
  line-height: 32px;
  color: ${(props) => props.theme.primary};
  @media (max-width: 430px) {
    padding-top: 24px;
    border-top: 1px solid ${(props) => props.theme.borderColor};
  }
`;
export const PhoneNumber = styled.div`
  font-weight: 700;
  font-size: 32px;
  line-height: 32px;
  color: ${(props) => props.theme.primaryText};
  @media (max-width: 430px) {
    padding-bottom: 24px;
  }
`;
export const PhoneNumberAndPriceWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;

  @media (max-width: 430px) {
    flex-direction: column;
    > * {
      width: 100%;
      text-align: center;
    }
  }
`;
export const NumberType = styled.div`
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: ${(props) => props.theme.primary};
  text-transform: capitalize;
`;
export const CountryNameWrapper = styled.div`
  display: flex;
  align-items: center;
  grid-gap: 8px;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: ${(props) => props.theme.secondaryText};
  position: relative;

  &:after {
    content: "";
    width: 4px;
    height: 4px;
    border-radius: 100vmax;
    background: ${(props) => props.theme.secondaryText};
    position: absolute;
    top: 50%;
    right: -10px;
    transform: translate(50%, -50%);
  }
`;
export const CountryNameAndNumberTypeWrapper = styled.div`
  display: flex;
  align-items: center;
  grid-gap: 20px;
  margin-bottom: 5px;

  @media (max-width: 430px) {
    justify-content: center;
  }
`;

export const Wrapper = styled.div`
  padding: 32px 50px;

  > button {
    margin: 30px 0;
  }

  @media (max-width: 900px) {
    padding: 32px 16px;
  }
`;

export const RadioButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: 10px 0;
  margin-bottom: 35px;
`

export const PhoneDurationOptionWrapper = styled.div`
  margin-right: 10px;
  color: ${(props) => props.theme.secondaryText};
  font-size: 14px;
  line-height: 22px;
`

export const PhoneDurationOptionWrapperTitlte = styled.div`
  font-weight: 700;
  font-size: 18px;
  color: ${(props) => props.theme.primaryText};
`

export const MultiplePurchaseLabel = styled.label`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${(props) => props.theme.primaryText};
  cursor: pointer;
`
export const MultiplePurchaseInfoField = styled(InfoField)`
  font-weight: 400;
  margin-bottom: 5px;

  &:last-child {
    margin-bottom: 0;
  }

  b {
    margin-left: 3px;
  }
`

export const MultiplePurchaseRangeWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0;
  font-weight: 500;
  color: ${(props) => props.theme.primaryText};
`
export const MultiplePurchaseRange = styled.div`
  display: flex;
  align-items: center;
  margin-left: 40px;
  font-size: 24px;
  font-weight: 700;
`

export const MultiplePurchaseIconsWrapper = styled.div`
  display: flex;
  align-items: center;
  grid-gap: 0 5px;
  user-select: none;
  margin-left: 16px;
  padding-left: 16px;
  border-left: 1px solid ${(props) => props.theme.borderColor};
`

export const MultiplePurchaseIcon = styled.div<{ $disabled?: boolean }>`
  display: flex;
  align-items: center;
  padding: 9px 5px;
  background: ${(props) => props.theme.benefitsBg};
  border-radius: 8px;
  opacity: ${(props) => props.$disabled ? .4 : 1};
  cursor: pointer;
  pointer-events: ${(props) => props.$disabled ? 'none' : 'auto'};
  
  svg {
    color: ${(props) => props.theme.primary};
  }
`

export const PurchaseLimit = styled.span`
  color: ${(props) => props.theme.secondaryText};
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.1px;
`
export const MultiplePurchaseWrapper = styled.div`
  margin: 20px 0;
  border-bottom: 1px solid #F1F1F1;
`