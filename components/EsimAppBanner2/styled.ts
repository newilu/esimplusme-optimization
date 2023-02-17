import styled from "styled-components";

export const Text = styled.div`
  font-weight: 300;
  font-size: 16px;
  line-height: 26px;
  color: ${(props) => props.theme.secondaryText};
  margin: 15px 0 25px 0;
  max-width: 580px;
`;
export const Title = styled.div`
  font-weight: 700;
  font-size: 32px;
  line-height: 38px;
  color: ${(props) => props.theme.primaryText};
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  grid-gap: 16px;

  > button {
    cursor: pointer;
    color: ${(props) => (props.theme.name === "light" ? "#ffffff" : "#000000")};
    display: flex;
    justify-content: center;
    align-items: center;
    width: fit-content;
    border: none;
    border-radius: 6px;
    height: 40px;
    background: ${(props) =>
      props.theme.name === "light" ? "#000000" : "#ffffff"};

    > a {
      width: 100%;
      height: 100%;
    }

    img {
      width: 100%;
      height: 100%;
    }
  }
`;

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  background: ${(props) => props.theme.appBannerBg};
  border-radius: 15px;

  > div:first-child {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 40px;
  }

  > div:last-child {
    text-align: right;
    padding: 40px 40px 0 40px;
    img {
      max-height: 270px;
      height: 100%;
      width: auto;
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 40px 24px 0 24px;
    grid-gap: 40px;

    * {
      padding: 0 !important;
      justify-content: center;
    }
  }
`;
