import React from "react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Image, { StaticImageData } from "next/image";
import UserImagePlaceholder from "./assets/UserImagePlaceholder";
import arrow from "./assets/arrow-right.svg";
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

  React.useEffect(() => {
    const oldPrevButton =
      document.querySelector<HTMLButtonElement>("#btn-prev");
    const oldNextButton =
      document.querySelector<HTMLButtonElement>("#btn-next");
    const customPrevButton = document.getElementById("prev_slide_btn");
    const customNextButton = document.getElementById("next_slide_btn");
    const customMobileNextButton = document.getElementById(
      "next_slide_btn_mobile"
    );
    const customMobilePrevButton = document.getElementById(
      "prev_slide_btn_mobile"
    );

    if (oldPrevButton && oldNextButton) {
      if (customNextButton && customPrevButton) {
        customNextButton.onclick = () => oldNextButton.click();
        customPrevButton.onclick = () => oldPrevButton.click();
      }

      if (customMobilePrevButton && customMobileNextButton) {
        customMobileNextButton.onclick = () => oldNextButton.click();
        customMobilePrevButton.onclick = () => oldPrevButton.click();
      }
    }
  }, [isMobile]);

  return (
    <Wrapper>
      <Container>
        <Title>
          <SectionTitle>{sectionTitle}</SectionTitle>
          <button id="btn-prev">prev</button>
          <button id="btn-next">next</button>
          {!isMobile && (
            <SliderButtonsWrapper>
              <button id="prev_slide_btn">
                <Image width={18} height={18} src={arrow} alt="arrow" />
              </button>
              <button id="next_slide_btn">
                <Image width={18} height={18} src={arrow} alt="arrow" />
              </button>
            </SliderButtonsWrapper>
          )}
        </Title>
      </Container>
      <Swiper
        slidesPerView={isMobile ? 1 : isTablet ? 3 : 4}
        spaceBetween={20}
        pagination={{
          clickable: true,
        }}
        navigation={{
          enabled: true,
          nextEl: "#btn-next",
          prevEl: "#btn-prev",
          disabledClass: "disabled",
        }}
        modules={[Pagination, Navigation]}
        className="slick-slider"
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
          <button id="prev_slide_btn">
            <Image width={18} height={18} src={arrow} alt="arrow" />
          </button>
          <button id="next_slide_btn">
            <Image width={18} height={18} src={arrow} alt="arrow" />
          </button>
        </SliderButtonsWrapper>
      )}
    </Wrapper>
  );
}

export { Reviews };
