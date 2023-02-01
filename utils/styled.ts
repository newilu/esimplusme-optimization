import styled from "styled-components";

export const PageSubtitle = styled.div`
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
  color: ${(props) => props.theme.secondaryText};
  opacity: 0.5;
  margin-bottom: 4px;
`;

export const SectionTitle = styled.h1`
  font-weight: 700;
  font-size: 42px;
  line-height: 50px;
  color: ${(props) => props.theme.primaryText};
  text-align: left;
  margin: 0 0 15px 0;

  @media (max-width: 768px) {
    font-size: 28px;
    line-height: 33px;
  }
`;

export const Text = styled.div`
  text-align: left;
  font-weight: 300;
  font-size: 16px;
  line-height: 26px;
  color: ${(props) => props.theme.secondaryText};
`;

export const Container = styled.div`
  position: relative;
  margin: 0 auto;
  padding: 0 16px;
  max-width: 1272px;
  flex: 1;
  width: 100%;
  height: 100%;
`;
