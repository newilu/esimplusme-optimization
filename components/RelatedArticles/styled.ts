import styled from "styled-components";

export const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 45px;
`;
export const Title = styled.div`
  font-weight: 700;
  font-size: 24px;
  line-height: 29px;
  color: ${(props) => props.theme.primaryText};
  margin-bottom: 30px;
`;
export const Wrapper = styled.div`
  margin-top: 100px;
`;
