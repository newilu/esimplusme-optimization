import styled from "styled-components";
import { Card as BaseCard } from "shared/ui/styled";

export const BundleCountry = styled.div`
  font-weight: 500;
  font-size: 16px;
  line-height: 16px;
  color: ${(props) => props.theme.primaryText};
`;

export const BundleImage = styled.div<{ src?: string }>`
  width: 48px;
  height: 30px;
  border-radius: 3px;
  clip-path: polygon(0 0, 80% 0, 100% 30%, 100% 100%, 0 100%);
  background: #cccccc url(${(props) => props.src}) center center no-repeat;
  background-size: cover;
`;

export const BundleCapability = styled.div`
  width: 100%;
  padding: 0 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-right: 1px solid ${(props) => props.theme.borderColor};

  &:last-child {
    border: none;
  }

  > div:first-child {
    font-weight: 400;
    font-size: 16px;
    line-height: 21px;
    letter-spacing: 0.02em;
    color: ${(props) => props.theme.primaryText};
  }

  > div:last-child {
    text-align: center;
    font-weight: 300;
    font-size: 10px;
    line-height: 20px;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: ${(props) => props.theme.secondaryText};
  }

  @media (max-width: 430px) {
    min-width: 75px;
    flex: 1;
  }
  @media (max-width: 350px) {
    flex: 1;

    &:nth-child(2) {
      flex: 1 1 auto;
    }
  }
`;

export const BundleCapabilities = styled.div`
  display: flex;
  margin: 25px 0;
`;

export const BundleTitle = styled.div`
  display: flex;
  justify-content: space-between;

  > div {
    display: flex;
    align-items: center;
    grid-gap: 8px;
  }
`;

export const Wrapper = styled(BaseCard)`
  padding: 20px;
  max-width: 400px;
  flex: 1 1 350px;
`;
