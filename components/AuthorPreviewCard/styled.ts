import styled from "styled-components";

export const AuthorDesr = styled.div`
  font-weight: 600;
  font-size: 14px;
  line-height: 18px;
  color: ${(props) => props.theme.secondaryText};
`;
export const AuthorName = styled.div`
  margin-bottom: 6px;
  color: ${(props) => props.theme.primaryText};
  font-weight: 700;
  font-size: 24px;
  line-height: 32px;
`;
export const AuthorImageWrapper = styled.div`
  margin-bottom: 10px;
  width: 80px;
  height: 80px;
  border-radius: 100vmax;
  overflow: hidden;

  > img {
    width: 80px;
    height: 80px;
  }
`;

export const Wrapper = styled.div`
  border-radius: 10px;
  background: ${(props) => props.theme.cardBaseBg};

  > a {
    padding: 25px;
    text-decoration: none;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;
