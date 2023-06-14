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
export const PhoneNumberCapabilityName = styled.div`
  display: flex;
  align-items: center;
  grid-gap: 12px;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: ${(props) => props.theme.primaryText};

  svg {
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
export const PhoneNumberAlertText = styled.div`
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  color: rgba(111, 111, 111, 1);
`;
export const PhoneNumberAlertTitle = styled.div`
  margin-bottom: 8px;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  color: black;
`;
export const PhoneNumberAlert = styled.div`
  margin: 20px 0;
  padding: 10px 16px;
  background: #fcf1cb;
  border: 1px dashed #f6c657;
  border-radius: 5px;
  text-align: center;
`;
export const PhoneNumberPrice = styled.div`
  font-weight: 700;
  font-size: 16px;
  line-height: 32px;
  color: ${(props) => props.theme.primary};
`;
export const PhoneNumber = styled.div`
  font-weight: 700;
  font-size: 32px;
  line-height: 32px;
  color: ${(props) => props.theme.primaryText};
`;
export const PhoneNumberAndPriceWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
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
`;

export const Wrapper = styled.div`
  padding: 32px 50px;

  > button {
    margin: 30px 0;
  }
`;
