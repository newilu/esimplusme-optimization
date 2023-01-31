import styled from "styled-components";

export const CategoryArticlesCount = styled.div`
  font-weight: 600;
  font-size: 14px;
  line-height: 18px;
  color: ${(props) => props.theme.secondaryText};
`;
export const CategoryTitle = styled.div`
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
  color: ${(props) => props.theme.primaryText};
  margin-bottom: 4px;
`;

export const CategoriesGridItem = styled.div`
  border-radius: 12px;
  text-align: center;
  background: ${(props) => props.theme.cardBaseBg};

  > a {
    padding: 16px;
    display: block;
    text-decoration: none;
  }
`;

export const CategoriesGridWrapper = styled.div`
  margin-top: 50px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-gap: 6px;
`;

export const Wrapper = styled.div`
  margin: 100px 0;

  > div:first-child {
    font-weight: 700;
    font-size: 42px;
    line-height: 50px;
    color: ${(props) => props.theme.primaryText};
  }

  @media (max-width: 768px) {
    margin: 50px 0;
  }
`;
