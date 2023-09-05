import React from 'react';
import FakeNumberGeneratorHeader from '@/widgets/FakeNumberGeneratorHeader';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Navbar from '@/widgets/Navbar';
import Footer from '@/components/Footer';
import { generateMeta } from '@/shared/lib';
import { useRouter } from 'next/router';
import { Trans, useTranslation } from 'next-i18next';
import Head from 'next/head';
import { Container, ContentBlock, Paragraph, SectionTitle } from '@/shared/ui/styled';
import styled from 'styled-components';
import { QuestionsWrapper } from '@/features/FAQSection/styled';
import Question from '@/features/FAQSection/Question';

const TextBlocksWrapper = styled(Container)`
  ${ContentBlock}:first-child {
    margin-top: 0;
  }

  ${SectionTitle} {
    font-size: 32px;
  }

  ${QuestionsWrapper} {
    margin-top: 50px;
  }

  .note {
    font-size: 14px;
    line-height: 16px;
    font-weight: bold;
  }
`;

function RandomPhoneNumberGenerator() {
  const { t, i18n } = useTranslation('random-number');
  const { asPath } = useRouter();

  const meta = generateMeta({
    supportedLangs: ['en'],
    asPath,
    language: i18n.language,
    description: t('meta:random_number_generator_description'),
    title: t('meta:random_number_generator_title'),
  });

  const questionsList = React.useMemo(
    () => [
      { question: t('faq_q_1'), answer: t('faq_a_1') },
      { question: t('faq_q_2'), answer: t('faq_a_2') },
      { question: t('faq_q_3'), answer: t('faq_a_3') },
      { question: t('faq_q_4'), answer: t('faq_a_4') },
    ],
    [t]
  );

  return (
    <>
      <Head>{meta}</Head>
      <Navbar />
      <FakeNumberGeneratorHeader />
      <TextBlocksWrapper maxWidth={900}>
        <ContentBlock>
          <SectionTitle>{t('what_is_a_fake_number_generator')}</SectionTitle>
          <Paragraph>{t('what_is_a_fake_number_generator_text')}</Paragraph>
        </ContentBlock>{' '}
        <ContentBlock>
          <SectionTitle>{t('where_to_use_fake_numbers')}</SectionTitle>
          <Paragraph as="div">
            <Trans
              i18nKey="random-number:where_to_use_fake_numbers_text"
              components={{
                ul: <ul />,
                li: <li />,
                small: <div className="note" />,
              }}
            />
          </Paragraph>
        </ContentBlock>
        <ContentBlock>
          <SectionTitle>{t('purchasing_real_numbers')}</SectionTitle>
          <Paragraph>{t('purchasing_real_numbers_text')}</Paragraph>
        </ContentBlock>
        <ContentBlock>
          <SectionTitle as="h3">{t('faq')}</SectionTitle>
          <QuestionsWrapper>
            {questionsList.map(({ question, answer }, idx) => (
              <Question key={question} id={`${idx}${question}`} title={question} text={answer} />
            ))}
          </QuestionsWrapper>
        </ContentBlock>
      </TextBlocksWrapper>
      <Footer />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'en', ['common', 'random-number', 'meta'])),
  },
});

export default RandomPhoneNumberGenerator;
