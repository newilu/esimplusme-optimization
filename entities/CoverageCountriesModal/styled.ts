import styled from "styled-components";

export const CoverageCountryPrice = styled.div`
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  text-align: right;
  color: ${(props) => props.theme.secondaryText};
`;
export const CoverageCountryName = styled.div`
  display: flex;
  align-items: center;
  grid-gap: 8px;
  font-weight: 400;
  font-size: 16px;
  line-height: 16px;
  color: ${(props) => props.theme.primaryText};

  > div {
    flex: 0 0 42px;
    width: 42px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    overflow: hidden;
    -webkit-backface-visibility: hidden;
    -webkit-transform: translate3d(0, 0, 0);

    img {
      -webkit-perspective: 1000;
      -webkit-backface-visibility: hidden;
      -webkit-transform: translate3d(0, 0, 0);
      outline: none;
      border: none;
      text-decoration: none;
    }
  }
`;

export const CoverageCountry = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const CoverageCountries = styled.div`
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  > div {
    padding: 0 20px 20px 20px;
    display: flex;
    flex-direction: column;
    grid-gap: 15px;
    overflow: hidden scroll;
    height: 100%;
  }

  > label {
    margin: 20px;
  }

  @media (max-width: 768px) {
    > div {
      padding: 0 16px 20px 16px;
    }

    > label {
      margin: 20px 16px;
    }
  }
`;
