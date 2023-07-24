import React from "react";
import { useRouter } from "next/router";
import { Trans, useTranslation } from "next-i18next";
import Question from "./Question";
import { QuestionsWrapper, Wrapper } from "./styled";

function FAQSection() {
  const router = useRouter();
  const { t } = useTranslation();

  const questionsList = React.useMemo(
    () =>
      Array.from(
        Array(router.pathname.includes("virtual-phone-number") ? 14 : 8).keys()
      ).map((el) => {
        return {
          question: t(
            `${router.pathname.includes("virtual-phone-number")
              ? "virtual_numbers"
              : "mobile_data"
            }_faq_q_${el + 1}`
          ),
          answer: (
            <Trans
              key={`faq_a_${el + 1}`}
              i18nKey={`${router.pathname.includes("virtual-phone-number")
                  ? "virtual_numbers"
                  : "mobile_data"
                }_faq_a_${el + 1}`}
              components={{
                1: <a href="mailto:support.esim@appvillis.com" />,
                2: <a href="https://esimplus.me/esim-supported-devices" />,
                3: (
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://www.youtube.com/watch?v=5e24Kqs3eNM&feature=emb_imp_woyt&themeRefresh=1"
                  />
                ),
                4: (
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://www.youtube.com/watch?v=KFbObq6ytPc"
                  />
                ),
                5: <a href="appesim://support" />,
                title: (
                  <div
                    style={{
                      margin: "20px 0",
                      fontWeight: "bold",
                      fontSize: 20,
                    }}
                  />
                ),
                ul: <ul />,
                li: <li />,
                b: <b />,
                br: <br />
              }}
            />
          ),
        };
      }),
    [router.pathname, t]
  );

  return (
    <>
      <div
        style={{
          visibility: "hidden",
          opacity: 0,
          height: 0,
          position: "absolute",
          overflow: "hidden",
        }}
      >
        <div itemType="http://schema.org/FAQPage" itemScope>
          {questionsList.map(({ question, answer }) => {
            return (
              <div
                key={question}
                itemProp="mainEntity"
                itemType="http://schema.org/Question"
                itemScope
              >
                <div itemProp="name">{question}</div>
                <div
                  itemProp="acceptedAnswer"
                  itemType="http://schema.org/Answer"
                  itemScope
                >
                  <div itemProp="text">{answer}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Wrapper
        id={`faq_section_${router.pathname.includes("virtual-phone-number")
            ? "virtual_numbers"
            : "mobile_data"
          }`}
      >
        <h3>{t("faq")}</h3>
        <QuestionsWrapper>
          {questionsList.map(({ question, answer }, idx) => (
            <Question
              key={`${idx}${question}`}
              id={`${idx}${question}`}
              title={question}
              text={answer}
            />
          ))}
        </QuestionsWrapper>
      </Wrapper>
    </>
  );
}

export { FAQSection };
