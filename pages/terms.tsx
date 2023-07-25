/* eslint react/no-unescaped-entities: 0 */

import React from "react";
import { useTranslation } from "next-i18next";
import styled from "styled-components";
import Footer from "components/Footer";
import { Container } from "shared/ui/styled";
import Navbar from "widgets/Navbar";
import { useRouter } from "next/router";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";

const Wrapper = styled.div`
  padding-top: 80px;
  background: ${(props) => props.theme.bg};
  color: ${(props) => props.theme.primaryText};
`;

function TermsOfUse() {
  const { t, i18n } = useTranslation();
  const { pathname } = useRouter();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Head>
        <title>{t("terms_of_use")}</title>
        <meta name="description" content={t("terms_of_use_page_description")} />
        <meta property="og:locale" content={i18n.language} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://esimplus.me${pathname}`} />
        <meta property="og:site_name" content="ESIM Plus" />
        <meta
          property="og:image"
          content="https://static.esimplus.net/storage/logos/logo.png"
        />
        <meta property="og:image:width" content="112" />
        <meta property="og:image:height" content="93" />
        <meta
          property="og:title"
          content={`ESIM Plus | ${t("terms_of_use")}`}
        />
        <meta
          property="og:description"
          content={t("terms_of_use_page_description")}
        />
        <meta name="twitter:card" content="summary" />
        <meta
          name="twitter:title"
          content={`ESIM Plus | ${t("terms_of_use")}`}
        />
        <meta
          name="twitter:description"
          content={t("terms_of_use_page_description")}
        />
        <meta
          name="twitter:image"
          content="https://static.esimplus.net/storage/logos/logo.png"
        />
        <link
          rel="canonical"
          href={`https://esimplus.me${
            i18n.language.startsWith("en")
              ? ""
              : `/${i18n.language.slice(0, 2)}`
          }/terms`}
        />
        <link rel="alternate" href="https://esimplus.me/terms" hrefLang="en" />
      </Head>
      <Wrapper>
        <Navbar />
        <Container>
          <h1>ESIM Plus Terms of Service</h1>

          <p>
            <strong>Last update: 18/06/2023</strong>
          </p>

          <p>
            These Terms of Use ("Terms") and the Privacy Policy (collectively,
            "Agreement") govern your relationship with ESIM Plus, a service
            provided by UAB Appvillis, a company with registration number
            304930580 and its legal address: Šiaulių g. 10-56, Vilnius, 01134,
            Lithuania ("ESIM Plus", "we" or "us") as regards the Services
            provided by ESIM Plus.
          </p>

          <p>
            We recommend that you carefully read the Agreement since its terms
            are binding for you.
          </p>

          <h2>Service Description</h2>

          <p>
            ESIM Plus provides users with eSIM plans that include mobile data
            for any country in the world. We also offer virtual phone numbers.
            While ESIM Plus is trying to ensure world-wide coverage, our
            Services are not yet available on the territory of all the
            countries. Please check the updated list of the supported countries
            as provided in the ESIM Plus Application before ordering any
            Services. Moreover, you should ensure that your device supports ESIM
            technology. In case you have any doubts regarding the capabilities
            of your device, we recommend that you contact its seller and ask for
            needed clarifications.
          </p>

          <h2>No Refunds or Returns</h2>

          <p>
            Please note that once an eSIM or Virtual Phone Number is activated
            and working, we cannot offer refunds or accept returns. All sales
            are final. This is a change from our previous policy, and we ask all
            users to take note of this update.
          </p>

          <h2>SMS Delivery</h2>

          <p>
            If you use our eSIM or Virtual Phone Number for registration or
            authentication on online services, banks, etc., we cannot guarantee
            the delivery of SMS messages. Delivery may be interrupted on the
            sender's side, the mobile operator's side, or any other side. We are
            not responsible for any such interruptions. This is a new addition
            to our terms of service, and we ask all users to be aware of this
            potential issue.
          </p>

          <h2>No Returns for Working Numbers</h2>

          <p>
            We will not accept returns for working numbers that can receive SMS
            messages from another phone number but can't receive from virtual
            phone numbers. This is a new policy, and we ask all users to take
            note.
          </p>

          <h2>Data Plan, Top-Ups, and Payments</h2>

          <p>
            Services are provided on a pre-payment basis. Some services may be
            provided on a subscription basis. The default transaction currency
            is Euro.
          </p>

          <h2>Returns Policy and Cancellation</h2>

          <p>
            Account Holders have a right to cancel the Services ordered within a
            Data Plan or Top-up option during the withdrawal period of 14 days
            without giving any reason unless such Services have been already
            fully performed by ESIM Plus.
          </p>

          <h2>No Warranties</h2>

          <p>
            All Services provided by ESIM Plus are provided "as is" and "with
            all faults," and ESIM Plus expressly disclaims all other warranties
            of any kind or nature.
          </p>

          <h2>Limitations of Liability</h2>

          <p>
            ESIM Plus disclaims any and all liability that may arise from the
            performance, including failure, of the participating member
            operator's networks.
          </p>

          <h2>Changes to the Agreement</h2>

          <p>
            ESIM Plus reserves the right to review and amend the Agreement from
            time to time at its own discretion.
          </p>

          <h2>Termination by ESIM Plus</h2>

          <p>
            ESIM Plus can terminate Services or the Agreement under certain
            conditions, such as if the Account Holder abuses ESIM Plus Services
            or ESIM Plus App by improper usage, including for illegal or
            unethical purposes.
          </p>

          <h2>Ownership</h2>

          <p>
            All intellectual property rights in ESIM Plus Application belong to
            ESIM Plus. The purchase or use of any ESIM Plus Services by the
            Account Holder does not imply any transfer of intellectual property
            rights from ESIM Plus to the Account Holder.
          </p>

          <h2>Privacy Policy</h2>

          <p>
            ESIM Plus is committed to providing the users of the ESIM Plus App
            with a great experience but also protecting their privacy rights.
            ESIM Plus takes the matter of privacy seriously. Please refer to
            ESIM Plus's Privacy Policy for further details.
          </p>

          <h2>Contact Details</h2>

          <p>
            UAB Appvillis
            <br />
            Šiaulių g. 10-56, Vilnius, 01134, Lithuania
            <br />
            <Link
              target="_blank"
              rel="noreferrer"
              href="mailto:info@appvillis.com"
            >
              info@appvillis.com
            </Link>
          </p>
          <p>
            By accessing the ESIM Plus Application, opening an Account, or
            buying our Services, you agree to be bound by this Agreement. If you
            don't agree to be bound, please do not use the ESIM Plus Application
            or Services.
          </p>
        </Container>
        <Footer />
      </Wrapper>
    </>
  );
}

export default TermsOfUse;

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  if (locale !== "en") {
    return { redirect: { destination: "/terms", statusCode: 301 } };
  }

  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", [
        "common",
        "navbar",
        "footer",
      ])),
    },
  };
};
