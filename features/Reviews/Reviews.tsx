import React, { useState } from "react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperClass } from "swiper/types";
import Image, { StaticImageData } from "next/image";
import UserImagePlaceholder from "./assets/UserImagePlaceholder";
import ArrowRight from "./assets/ArrowRight";
import star from "./assets/star.svg";
import { useWindowSize } from "context/WindowSizeContext";
import { Container, SectionTitle } from "shared/ui/styled";
import {
  ReviewAuthor,
  ReviewBody,
  ReviewCard,
  ReviewCardWrapper,
  ReviewerImageWrapper,
  ReviewerName,
  ReviewRating,
  ReviewStarsWrapper,
  ReviewText,
  ReviewTitle,
  SliderButtonsWrapper,
  Star,
  Title,
  Wrapper,
} from "./styled";

function Reviews({
  sectionTitle,
  reviewsList,
}: {
  sectionTitle: React.ReactNode;
  reviewsList: {
    icon?: string | StaticImageData;
    name: string;
    title: string;
    text: string;
    rating: number;
  }[];
}) {
  const { isMobile, isTablet } = useWindowSize();
  const [swiperApi, setSwiperApi] = useState<SwiperClass | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const slidesPerView = isMobile ? 1 : isTablet ? 3 : 4;

  return (
    <Wrapper>
      <Container>
        <Title>
          <SectionTitle>{sectionTitle}</SectionTitle>
          {!isMobile && (
            <SliderButtonsWrapper>
              <button onClick={() => swiperApi?.slidePrev()} disabled={activeIndex === 0}>
                <ArrowRight />
              </button>
              <button onClick={() => swiperApi?.slideNext()} disabled={activeIndex === reviewsList.length - slidesPerView}>
                <ArrowRight />
              </button>
            </SliderButtonsWrapper>
          )}
        </Title>
      </Container>
      <Swiper
        slidesPerView={slidesPerView}
        spaceBetween={20}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="slick-slider"
        onSwiper={setSwiperApi}
        onSlideChange={(s) => setActiveIndex(s.activeIndex)}
      >
        {reviewsList.map(({ icon, name, rating, text, title }) => (
          <SwiperSlide key={name}>
            <ReviewCardWrapper>
              <ReviewCard>
                <ReviewAuthor>
                  <ReviewerImageWrapper>
                    {icon ? (
                      <Image width={40} height={40} src={icon} alt={name} />
                    ) : (
                      <UserImagePlaceholder />
                    )}
                  </ReviewerImageWrapper>
                  <ReviewerName>{name}</ReviewerName>
                </ReviewAuthor>
                <ReviewBody>
                  <ReviewRating>
                    <ReviewStarsWrapper>
                      <div style={{ width: `${rating * 20}%` }} />
                      <div>
                        {Array.from(Array(5).keys()).map((idx) => (
                          <Star key={idx}>
                            <Image
                              width={14}
                              height={14}
                              src={star}
                              alt="star"
                            />
                          </Star>
                        ))}
                      </div>
                    </ReviewStarsWrapper>
                  </ReviewRating>
                  <ReviewTitle>{title}</ReviewTitle>
                  <ReviewText>{text}</ReviewText>
                </ReviewBody>
              </ReviewCard>
            </ReviewCardWrapper>
          </SwiperSlide>
        ))}
      </Swiper>
      {isMobile && (
        <SliderButtonsWrapper style={{ justifyContent: "center" }}>
          <button onClick={() => swiperApi?.slidePrev()} disabled={activeIndex === 0}>
            <ArrowRight />
          </button>
          <button onClick={() => swiperApi?.slideNext()} disabled={activeIndex === reviewsList.length - slidesPerView}>
            <ArrowRight />
          </button>
        </SliderButtonsWrapper>
      )}
    </Wrapper>
  );
}

export { Reviews };
