import styled from "styled-components";
import {
  CountriesCards,
  CountryCard,
  SelectedCountryFlagWrapper,
} from "../LocalEsim/styled";

export const RegionsWrapper = styled(CountriesCards)`
  margin-top: 16px;

  @media (max-width: 440px) {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  }
`;
export const Wrapper = styled.div`
  ${CountryCard} {
    flex: 0 1 200px;
  }

  ${SelectedCountryFlagWrapper} {
    > img {
      width: auto;
      height: 36px;
    }
  }
`;
