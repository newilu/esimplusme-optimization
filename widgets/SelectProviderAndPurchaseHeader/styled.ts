import styled from "styled-components";

export const CancelPaymentTypeSelection = styled.div`
  cursor: pointer;
  margin: 20px auto;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: ${(props) => props.theme.secondaryText};
  text-align: center;
`;

export const PaymentMethodCard = styled.div`
  cursor: pointer;
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
`;

export const PaymentMethodsWrapper = styled.div`
  margin: 50px 0;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  grid-gap: 10px;
`;
