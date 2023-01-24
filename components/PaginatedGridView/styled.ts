import styled from "styled-components";

export const PageSwitchButton = styled.button<{ active?: boolean }>`
  cursor: pointer;
  width: 30px;
  height: 30px;
  background: ${(props) => (props.active ? "#0076ff" : "transparent")};
  border-radius: 2px;
  border: none;
  color: ${(props) => (props.active ? "white" : props.theme.primaryText)};
`;
export const PageSwitchButtonsWrapper = styled.div`
  padding: 0 50px;
  display: flex;
  grid-gap: 10px;
  justify-content: center;

  @media (max-width: 768px) {
    padding: 0 20px;
  }
`;
export const NextPageButton = styled.button`
  cursor: pointer;
  font-weight: 500;
  font-size: 12px;
  line-height: 14px;
  display: flex;
  grid-gap: 5px;
  align-items: center;
  color: ${(props) => props.theme.primaryText};
  border: none;
  background: transparent;

  &:disabled {
    opacity: 0.3;
    pointer-events: none;
  }

  > img {
    filter: invert(${(props) => (props.theme.name === "light" ? 0 : 1)});
  }
`;
export const PrevPageButton = styled(NextPageButton)`
  > img {
    transform: rotate(-180deg);
  }
`;

export const PaginationButtonsWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const GridItem = styled.div`
  display: flex;
  flex-direction: column;
`;

export const GridWrapper = styled.div<{ gap?: number }>`
  margin-bottom: 100px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: ${(props) => (props.gap ? `${props.gap}px` : "45px")};

  @media (max-width: 768px) {
    margin-bottom: 50px;
  }
`;

export const Wrapper = styled.div`
  margin: 50px 0 100px 0;

  @media (max-width: 768px) {
    margin: 50px 0;
  }
`;
