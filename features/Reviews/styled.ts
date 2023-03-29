import styled from "styled-components";
import { Card, Container, SectionTitle } from "shared/ui/styled";

export const ReviewerName = styled.div`
  font-weight: 700;
  font-size: 16px;
  line-height: 16px;
  color: ${(props) => props.theme.primaryText};
`;

export const ReviewerImageWrapper = styled.div`
  border-radius: 100vmax;
  overflow: hidden;
  background: ${(props) => props.theme.benefitsBg};
  display: flex;
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.primaryText};
`;
export const ReviewAuthor = styled.div`
  padding: 28px 22px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  grid-gap: 15px;
`;

export const Star = styled.div`
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-right: 1px solid ${(props) => props.theme.cardsBg};
  z-index: 1;

  &:last-child {
    border-right: none;
  }
`;
export const ReviewStarsWrapper = styled.div`
  position: relative;
  width: min-content;
  background: ${(props) => props.theme.downloadAppBg};
  height: 20px;

  > div:first-child {
    position: absolute;
    height: 20px;
    background: #67b07c;
  }

  > div:last-child {
    display: flex;
  }
`;
export const ReviewRating = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 22px;
`;
export const ReviewBody = styled.div`
  padding: 25px 22px;
`;

export const ReviewTitle = styled.div`
  font-weight: 700;
  font-size: 22px;
  line-height: 32px;
  color: ${(props) => props.theme.primaryText};
  margin-bottom: 10px;
`;

export const ReviewText = styled.div`
  padding-bottom: 2rem;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 19px;
  color: ${(props) => props.theme.primaryText};
`;
export const ReviewCard = styled(Card)`
  height: 100%;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);
  background: ${(props) => props.theme.translucentCardsBg};
`;

export const ReviewCardWrapper = styled.div`
  background: transparent;
  height: 100%;
`;

export const SliderButtonsWrapper = styled.div`
  display: flex;
  grid-gap: 10px;
  align-items: flex-end;
  justify-content: flex-end;
  > button {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 16px;
    border-radius: 100vmax;
    background: ${(props) => props.theme.cardsBg};
    filter: drop-shadow(0px 4px 15px rgba(0, 0, 0, 0.05));
    border: none;

    &.disabled {
      img {
        opacity: 0.5;
      }
    }

    img {
      filter: invert(${(props) => (props.theme.name === "light" ? 1 : 0)});
    }

    &:first-child {
      img {
        transform: rotate(180deg);
      }
    }
  }
`;

export const Title = styled.div`
  display: flex;

  > button {
    width: 0;
    height: 0;
    padding: 0;
    font-size: 0;
    overflow: hidden;
    border: none;
    visibility: hidden;
  }

  ${SectionTitle} {
    margin-bottom: 0;
  }

  > div {
    width: 100%;
  }
`;

export const Wrapper = styled.div`
  padding: 110px 0 100px 0;
  background: ${(props) => props.theme.howitworksSecondaryBg};
  position: relative;

  .swiper-pagination-bullet {
    margin: 0 4px;
    padding: 0;
    width: 6px;
    height: 6px;
    border-radius: 100px;
    background: ${(props) => props.theme.primaryText};
    opacity: 0.1;
    transition: 0.3s all var(--easing-func);
    color: transparent;
  }

  .swiper-pagination-bullets {
    bottom: 35px !important;
    z-index: 2;
  }

  .swiper-pagination-bullet-active {
    width: 16px;
    opacity: 1;
    background: ${(props) => props.theme.primaryText};
  }

  .slick-slider {
    overflow: visible;
    position: unset;
    padding-top: 50px;
    padding-left: calc(50% - 617px);
  }

  .slick-prev,
  .slick-next {
    opacity: 0;
    visibility: hidden;
  }

  .slick-slide {
    padding: 60px 0;
  }

  .swiper-slide {
    height: auto;
  }

  ${Container} {
    position: relative;
  }

  @media (max-width: 1272px) {
    .slick-slider {
      padding: 50px 16px 0 16px;
    }
  }

  @media (max-width: 768px) {
    padding: 40px 0;

    .swiper-pagination-bullets {
      display: none;
    }

    .slick-slider {
      padding: 50px 0;
    }

    .swiper-slide {
      padding: 0 16px;
    }
  }
`;
