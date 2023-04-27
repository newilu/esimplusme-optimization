import styled from 'styled-components';

export const ButtonsWrapper = styled.div`
  width: 100%;

  @media (max-width: 600px) {
    flex-wrap: wrap;
    grid-gap: 10px;

    button {
      width: 100% !important;
    }
  }

  @media (max-width: 375px) {
    flex: 0;
  }
`;

export const Wrapper = styled.div`
  width: 100%;
  border-radius: 10px;
  overflow: hidden;
  max-width: 400px;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(85px);
  position: fixed;
  bottom: 16px;
  left: 16px;
  z-index: 167770000;
  color: white;

  > div:first-child {
    border-radius: 10px;
    overflow: hidden;
    width: 100%;
    position: absolute;
    background: ${(props) => props.theme.primary};
    opacity: 0.25;
    z-index: 1;
    height: 100%;
  }

  > div:last-child {
    padding: 16px;
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    grid-gap: 20px;
    font-size: 14px;

    h2 {
      margin: 0;
    }

    > div {
      display: flex;

      &:first-child {
        grid-gap: 20px;
        align-items: flex-start;
        svg {
          flex: 0 0 50px;
          height: 50px;
          width: 50px;
        }

        @media (max-width: 500px) {
          grid-gap: 10px;
        }
      }
    }

    @media (max-width: 500px) {
      grid-gap: 20px;
    }
  }

  a {
    text-decoration: none;
    color: ${(props) => props.theme.primary};
  }

  button {
    width: 100%;
    color: white !important;
    font-size: 14px;
    height: 40px;
    border-radius: 8px;
  }

  @media (max-width: 430px) {
    width: calc(100% - 32px);
  }

  @media (max-width: 375px) {
    svg {
      display: none;
    }
  }
`;
