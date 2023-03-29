import styled from "styled-components";
import Image from "next/image";
import { SectionTitle } from "shared/ui/styled";

export const FeatureText = styled.div`
  font-weight: 300;
  font-size: 16px;
  line-height: 26px;
  color: ${(props) => props.theme.secondaryText};
`;

export const FeatureTitle = styled.div`
  font-weight: 600;
  font-size: 16px;
  line-height: 26px;
  color: ${(props) => props.theme.primaryText};
  margin-bottom: 5px;
`;

export const FeatureIcon = styled(Image)`
  margin-bottom: 30px;

  @media (max-width: 430px) {
  }
`;

export const Feature = styled.div`
  text-align: center;

  @media (max-width: 530px) {
    text-align: left;
    display: flex;
    flex-direction: column;

    > div:first-child {
      display: flex;
      grid-gap: 16px;
      align-items: center;
    }

    ${FeatureIcon} {
      margin-bottom: 0;
    }
  }
`;

export const FeaturesWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  grid-gap: 60px;

  @media (max-width: 600px) {
    grid-gap: 20px;
  }
`;

export const Wrapper = styled.div`
  padding: 80px 0;
  z-index: 3;
  position: relative;

  ${SectionTitle} {
    max-width: 480px;
    margin-bottom: 60px;
  }

  @media (max-width: 768px) {
    padding: 40px 0;

    ${SectionTitle} {
      margin-bottom: 40px;
    }
  }
`;
