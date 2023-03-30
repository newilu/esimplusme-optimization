import styled from 'styled-components';

export const Title = styled.div`
  margin: 0 !important;
  background: transparent !important;
  flex-direction: column;
  align-items: flex-start !important;
  > div {
    &:first-child {
      font-weight: 500;
      font-size: 14px;
      line-height: 17px;
      margin-bottom: 4px;
    }
    &:last-child {
      font-weight: 400;
      font-size: 12px;
      line-height: 14px;
      opacity: 0.65;
    }
  }
`;

export const Wrapper = styled.div<{ visible: boolean }>`
  position: fixed;
  left: 0;
  top: 64px;
  z-index: 6;
  width: 100%;
  display: ${(props) => (props.visible ? 'block' : 'none')};

  > div:first-child {
    width: 100%;
    height: 65px;
    position: fixed;
    background: ${(props) => props.theme.primary};
    opacity: 0.5;
    z-index: 1;
  }

  > div:last-child {
    position: relative;
    height: 65px;
    z-index: 2;
    padding: 12px 8px;
    background: rgba(0, 0, 0, 0.25);
    backdrop-filter: blur(85px);
    color: white;
    display: flex;
    align-items: center;
    width: 100%;

    > div {
      padding: 4px 2px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #02071c;
      border-radius: 10px;
      margin: 0 8px;
    }

    button {
      color: inherit;
      border: none;

      &:first-child {
        background: none;
        padding: 0;
      }

      &:last-child {
        display: block;
        margin: 0 0 0 auto;
        background: #0076ff;
        border-radius: 16px;
        padding: 7px 12px;

        a {
          white-space: nowrap;
          width: 100%;
          height: 100%;
          text-decoration: none;
          color: inherit;
        }
      }
    }
  }
`;
