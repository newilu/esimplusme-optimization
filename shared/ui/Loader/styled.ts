import styled from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
  > div:first-child {
    position: relative;
    margin: 0 auto;
    width: 100px;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: radial-gradient(
      circle,
      rgba(0, 255, 240, 0.25) 0%,
      rgba(4, 126, 181, 0.15) 30%,
      rgba(255, 255, 255, 0) 60%
    );
    animation: rotation 6s infinite;

    > div {
      margin: 0 auto;
      width: 80px;
      height: 40px;
      border-radius: 50%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }

    > div {
      animation: scale 6s infinite;

      &:first-child {
        transform: translate(-50%, -50%) rotate(0);
        background: linear-gradient(
          89.98deg,
          rgba(119, 28, 235, 0.65) -1%,
          rgba(0, 255, 163, 0.65) 99.97%
        );
      }
      &:nth-child(2) {
        transform: translate(-50%, -50%) rotate(90deg);
        background: linear-gradient(
          89.98deg,
          rgba(28, 136, 235, 0.65) -1%,
          rgba(0, 87, 255, 0.65) 99.97%
        );
      }
      &:nth-child(3) {
        transform: translate(-50%, -50%) rotate(-45deg);
        background: linear-gradient(
          89.98deg,
          rgba(28, 37, 235, 0.65) -1%,
          rgba(0, 209, 255, 0.65) 99.97%
        );
      }
      &:nth-child(4) {
        transform: translate(-50%, -50%) rotate(45deg);
        background: linear-gradient(
          90.51deg,
          rgba(0, 255, 240, 0.65) -0.13%,
          rgba(7, 4, 181, 0.65) 97.88%
        );
      }
    }

    @keyframes rotation {
      40% {
        transform: rotate(1440deg);
      }
    }

    @keyframes scale {
      15% {
        width: 80px;
      }
      40% {
        width: 40px;
      }
      100% {
        width: 80px;
      }
    }
  }

  > div:last-child {
    margin: 0 auto;
    width: 80px;
    height: 40px;
    border-radius: 50%;
    position: absolute;
    left: 50%;
    top: 50%;
    animation: show 6s infinite;
    transform: translate(-50%, -50%);
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 10px;
    opacity: 0;
    overflow: hidden;
    color: rgba(255, 255, 255, 0.45);
    span {
      font-weight: 400;
      color: rgba(255, 255, 255, 0.45);
    }

    @keyframes show {
      0% {
        opacity: 0;
      }
      20% {
        transform: translate(-50%, -50%) scale(0.7);
        opacity: 0;
      }
      45% {
        opacity: 1;
        transform: translate(-50%, -50%);
      }
      60% {
        opacity: 0;
        transform: translate(-50%, -50%) scale(0.7);
      }
      70% {
        opacity: 0;
      }
      100% {
        opacity: 0;
      }
    }
  }
`;
