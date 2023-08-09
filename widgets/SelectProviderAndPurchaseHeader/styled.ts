import styled from "styled-components";

export const PaymentMethodCardInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    align-items: start;
  }
`

export const PaymentMethodSupportedCards = styled.div`
  margin-top: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;

  @media (max-width: 768px) {
    justify-content: start;
  }

  > div {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    color: rgba(255, 255, 255, 0.6);
  }
`;

export const CancelPaymentTypeSelection = styled.div`
  cursor: pointer;
  margin: 20px auto;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: ${(props) => props.theme.secondaryText};
  text-align: center;
`;

export const PaymentMethodCard = styled.div<{$disabled: boolean}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  grid-gap: 16px;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: white;
  max-width: 300px;
  height: 200px;
  border-radius: 10px;
  background: ${(props) => props.theme.primary};
  flex: 1 1 200px;
  filter: ${(props) => props.$disabled ? 'grayscale(1)' : 'none'};
  opacity: ${(props) => props.$disabled ? '.65' : '1'};
  pointer-events: ${(props) => props.$disabled ? 'none': 'auto'};
  cursor: pointer;

  @media (max-width: 768px) {
    grid-gap: 0;
    flex-direction: row-reverse;
    justify-content: space-between;
    text-align: left;
    padding: 16px;
    height: auto;
  }
`;

export const PaymentMethodsWrapper = styled.div`
  margin: 50px 0 75px 0;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  grid-gap: 10px;

  @media (max-width: 768px) {
    margin: 25px 0 50px 0;
  }
`;
