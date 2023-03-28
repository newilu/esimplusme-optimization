import styled from 'styled-components';

export const RightSide = styled.div`
  max-width: 700px;
  ul,
  li {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  ul {
    display: flex;
    flex-direction: column;
    grid-gap: 50px;
  }

  li {
    counter-increment: step;
    display: flex;
    align-items: center;
    grid-gap: 25px;
    > div:first-child {
      border-radius: 100vmax;
      color: white;
      width: 40px;
      height: 40px;
      flex: 0 0 40px;
      background: ${(props) => props.theme.primary};
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 500;
      font-size: 14px;
      line-height: 42px;

      &:before {
        content: counter(step);
      }
    }
    > div:last-child {
      font-weight: 300;
      font-size: 16px;
      line-height: 22px;
      color: ${(props) => props.theme.secondaryText};

      span {
        display: block;
        font-weight: 600;
        font-size: 24px;
        line-height: 26px;
        color: ${(props) => props.theme.primaryText};
        margin-bottom: 5px;
      }
    }
  }

  @media (max-width: 430px) {
    li {
      padding: 10px;
      border-radius: 20px;
      background: ${(props) => props.theme.cardsBg};
      border: 1px solid ${(props) => props.theme.cardsBorder};
      flex-direction: column;
      grid-gap: 15px;

      > div:first-child {
        width: 100%;
      }
    }
  }
`;
export const LeftSide = styled.div`
  max-width: 420px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  p {
    margin: 0 0 50px 0;
    font-weight: 300;
    font-size: 16px;
    line-height: 26px;
    color: ${(props) => props.theme.secondaryText};
  }
`;

export const Content = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-direction: column;
    grid-gap: 50px;

    ${LeftSide},${RightSide} {
      max-width: unset;
    }

    ${LeftSide} {
      text-align: center;
      * {
        text-align: center;
      }
      button {
        max-width: 350px;
        width: 100%;
        margin: 0 auto;
      }
      p {
        margin-bottom: 20px;
      }
    }

    ${RightSide} {
      ul {
        grid-gap: 20px;
      }
    }
  }

  @media (max-width: 430px) {
    ${LeftSide} {
      text-align: center;
      button {
        max-width: unset;
      }
    }
  }
`;

export const Wrapper = styled.div`
  position: relative;
  padding: 100px 0;

  @media (max-width: 768px) {
    padding: 70px 0;
  }
`;
