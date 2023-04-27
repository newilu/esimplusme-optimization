import React from "react";
import { useWindowSize } from "context/WindowSizeContext";
import { QuestionAnswer, QuestionTitle, Question as Wrapper } from "./styled";

function Question({
  id,
  title,
  text,
}: {
  id: string;
  title: string;
  text: React.ReactNode;
}) {
  const { isMobile } = useWindowSize();
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    const el = document.getElementById(id);
    const answer = el?.nextElementSibling as HTMLDivElement | null;
    if (answer && el) {
      if (isMobile) {
        el.style.transition = "none";
        answer.style.transition = "none";
      }
      el.style.paddingBottom = isOpen ? (isMobile ? "15px" : "25px") : "0";
      answer.style.maxHeight = isOpen ? `${answer.scrollHeight}px` : "0";
    }
  }, [id, isMobile, isOpen]);

  return (
    <Wrapper>
      <QuestionTitle
        isOpen={isOpen}
        id={id}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {title}
      </QuestionTitle>
      <QuestionAnswer>{text}</QuestionAnswer>
    </Wrapper>
  );
}

export default Question;
