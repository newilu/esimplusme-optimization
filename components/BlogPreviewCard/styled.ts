import styled from "styled-components";

export const BlogPublicationDate = styled.div`
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  color: ${(props) => props.theme.secondaryText};
  opacity: 0.5;
`;

export const CardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  a {
    text-decoration: none;
    font-weight: 500;
    font-size: 12px;
    line-height: 14px;
    display: flex;
    align-items: center;
    color: ${(props) => props.theme.primary};
  }
`;

export const CardText = styled.div`
  flex: 1;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  color: ${(props) => props.theme.secondaryText};
  margin-bottom: 25px;
`;

export const CardTitle = styled.div`
  font-weight: 700;
  font-size: 18px;
  line-height: 18px;
  color: ${(props) => props.theme.primaryText};
  margin: 20px 0 15px 0;
`;

export const ImageWrapper = styled.div`
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
  width: 100%;
  max-height: 200px;
  height: auto;
  overflow: hidden;

  > a {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &:hover {
    img {
      transform: scale(1.1);
    }
  }

  img {
    transition: 0.2s all var(--easing-func);
    width: 100%;
    height: auto;
    pointer-events: none;
  }
`;

export const CardCategory = styled.div`
  margin-top: 20px;
  width: fit-content;
  background: ${(props) => props.theme.cardCategoryStripBg};
  border-radius: 4px;
  padding: 4px 8px;
  font-weight: 600;
  font-size: 12px;
  line-height: 14px;
  color: ${(props) => props.theme.primaryText};
`;

export const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  > a {
    text-decoration: none;
  }
`;
