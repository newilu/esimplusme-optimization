import React from "react";
import { useTranslation } from "next-i18next";
import styled from "styled-components";
import Footer from "components/Footer";
import { Container } from "shared/ui/styled";
import Navbar from "widgets/Navbar";
import { LANGS_LIST } from "shared/constants";
import { useRouter } from "next/router";
import Head from "next/head.js";
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
        <meta property="og:site_name" content="ESIM+" />
        <meta
          property="og:image"
          content="https://static.esimplus.net/storage/logos/logo.png"
        />
        <meta property="og:image:width" content="112" />
        <meta property="og:image:height" content="93" />
        <meta property="og:title" content={`ESIM+ | ${t("terms_of_use")}`} />
        <meta
          property="og:description"
          content={t("terms_of_use_page_description")}
        />
        <meta name="twitter:card" content="app" />
        <meta name="twitter:title" content={`ESIM+ | ${t("terms_of_use")}`} />
        <meta
          name="twitter:description"
          content={t("terms_of_use_page_description")}
        />
        <meta
          name="twitter:image"
          content="https://static.esimplus.net/storage/logos/logo.png"
        />
        <meta property="article:modified_time" content="2023-06-15" />
        <link
          rel="canonical"
          href={`https://esimplus.me${
            i18n.language.startsWith("en")
              ? ""
              : `/${i18n.language.slice(0, 2)}`
          }/terms`}
        />
        {LANGS_LIST.map((lng) => (
          <link
            key={lng.concat("2")}
            rel="alternate"
            href={`https://esimplus.me${
              lng.startsWith("en") ? "" : `/${lng.slice(0, 2)}`
            }/terms`}
            hrefLang={lng.toLowerCase()}
          />
        ))}
      </Head>
      <Wrapper>
        <Navbar />
        <Container>
          <h1>Terms of use</h1>
          <div>
            <strong>Terms of Use</strong>
            <br />
            <br />
            <strong>Last update: 18/06/2023</strong>
            <br />
            <br />
            <br />
            <br />
            These Terms of Use (&quot;Terms&quot;) and the &nbsp;
            <Link locale="en" href="/privacy" target="_blank" rel="noreferrer">
              Privacy Policy
            </Link>
            &nbsp; (collectively, &quot;Agreement&quot;) govern your
            relationship with UAB Appvillis, a company with registration number
            304930580 and its legal address: Šiaulių g. 10-56, Vilnius, 01134,
            Lithiania (&quot;ESIM+&quot;, &quot;we&quot; or &quot;us&quot;) as
            regards the Services provided by ESIM+.
            <br />
            <br />
            We recommend that you carefully read the Agreement since its terms
            are binding for you.
            <br />
            <br />
            <br />
            <strong>
              While ESIM+ is trying to ensure world-wide coverage, our Services
              are not yet available on the territory of all the countries.
            </strong>
            <br />
            <br />
            Please check the updated list of the supported countries as provided
            in the ESIM+ Application before ordering any Services.
            <br />
            <br />
            Moreover, you should ensure that your device supports ESIM
            technology. In case you have any doubts regarding the capabilities
            of your device, we recommend that you contact its seller and ask for
            needed clarifications.
            <br />
            <br />
            <br />
            <br />
            <strong>Definitions:</strong>
            <br />
            &quot;
            <strong>Account</strong>
            &quot;means a customer&apos;s profile within ESIM+ Application.
            &quot;
            <strong>Account Holder</strong>
            &quot; (or &quot;
            <strong>Customer</strong>
            &quot;, or &quot;
            <strong>you</strong>
            &quot;) is a person who has registered an account within ESIM+
            Application. &quot;
            <strong>Data Plan</strong>
            &quot; means a certain scope of ESIM+ Services available for the
            Account Holder for the defined period of time on conditions
            prescribed in the ESIM+ Application. &quot;ESIM+ Application&quot;
            or &quot;ESIM+ App&quot; means the proprietary software application
            offered by ESIM+ under the name &quot;ESIM+ Internet
            Worldwide&quot;;
            <br />
            &quot;
            <strong>ESIM</strong>
            &quot; means a subscriber identification module (&quot;SIM&quot;)
            embedded in your device with which you can use ESIM+ Services;
            <br />
            &quot;
            <strong>Participating Member Operator</strong>
            &quot; means each of the mobile network operators that are ESIM+
            partners and in whose networks the Account Holder may use the
            internet access Services of ESIM+;
            <br />
            &quot;
            <strong>Service(s)</strong>
            &quot; or &quot;
            <strong>ESIM+ Service(s)</strong>
            &quot; means internet access Services offered within ESIM+ data
            plan(s) or/and any other Services offered by ESIM+ in the ESIM+
            Application;
            <br />
            &quot;
            <strong>Top-Up</strong>
            &quot; means the purchase of extra Services in addition to the
            Services that already were or still are available for the Account
            Holder.
            <br />
            <br />
            <br />
            <br />
            <strong>General Conditions:</strong>
            <br />
            These Terms govern the use of ESIM+ Application, as well as ESIM+
            Services provision.
            <br />
            <br />
            ESIM+ Services may only be provided to persons who are 18 years old
            or older and only on the territory of the countries listed in the
            ESIM+ Application. Moreover, the Account Holder must have the ESIM
            embedded in their device to be able to benefit from ESIM+ Services.
            <br />
            <br />
            <strong>
              The Account Holder is responsible for ensuring that they are
              located in one of the supported countries and that their device
              has the ESIM embedded in it, so the Account Holder is able to use
              ESIM+ Services.
            </strong>
            <br />
            <br />
            A person wishing to register an Account, so to become an Account
            Holder, must provide their email address and other required details
            as stipulated in the ESIM+ Application. A confirmation letter will
            be sent to the email address provided by Account Holder after the
            completion of the Account registration. The Account Holder must
            confirm its email address by fulfilling steps described in the
            mentioned confirmation letter.
            <br />
            <br />
            Accounts with unconfirmed email addresses will be deleted in 30 days
            of the day when such Account was registered.
            <br />
            <br />
            If the Account Holder has not been using ESIM+ Services or ESIM+
            Application for any continuous period of one hundred eighty (180)
            days, ESIM+ reserves the right to invalidate such Account and
            terminate the Services provision to the respective Account Holder
            without a prior notice and any refund, repayment or compensation.
            <br />
            <br />
            ESIM+ provides its Services to the Account Holder only after the
            pre-payment is performed according to the conditions of the selected
            Data Plan or Top-Up option as prescribed in the ESIM+ Application.
            <br />
            <br />
            The Services ordered and paid by the Account Holder are
            non-transferable.
            <br />
            <br />
            The internet access services are the primary Services provided by
            ESIM+, while some other Services may be available in the ESIM+
            Application.
            <br />
            <br />
            <strong>
              Please pay attention to the fact that ESIM+ does not provide for a
              possibility to make direct voice calls send messages within Short
              Message Service (SMS) or Multimedia Messaging Service (MMS).
              Moreover, our Services should not be used to make emergency calls.
            </strong>
            <br />
            <br />
            In order to use ESIM+ Services, you should set an Access Point Name
            (APN). For device configuration, please read our
            <a href="https://esimplus.me" target="_blank" rel="noreferrer">
              FAQ.
            </a>
            <br />
            <br />
            <strong>No Refunds or Returns</strong>
            <p>
              Please note that once an eSIM or Virtual Phone Number is activated
              and working, we cannot offer refunds or accept returns. All sales
              are final. This is a change from our previous policy, and we ask
              all users to take note of this update.
            </p>
            <strong>SMS Delivery</strong>
            <p>
              If you use our eSIM or Virtual Phone Number for registration or
              authentication on online services, banks, etc., we cannot
              guarantee the delivery of SMS messages. Delivery may be
              interrupted on the sender's side, the mobile operator's side, or
              any other side. We are not responsible for any such interruptions.
              This is a new addition to our terms of service, and we ask all
              users to be aware of this potential issue.
            </p>
            <strong>No Returns for Working Numbers</strong>
            <p>
              We will not accept returns for working numbers that can receive
              SMS messages from another phone numb
            </p>
            <strong>Data plan, Top-Ups and Payments:</strong>
            <br />
            <br />
            In order to use Services, the Account Holder should choose the
            desired Data Plan and/or Top-Up option and pay for them.
            <br />
            <br />
            The information on all available Data Plans and Top-Up options, as
            well as their conditions, are provided for in the ESIM+ Application.
            <br />
            <br />
            At any moment, the Account Holder at their discretion may choose to
            change the selected Data Plan and/or Top-Up option. The conditions
            on which the Account Holder may change the Data Plan and/or Top-Up
            option are defined by ESIM+ in the ESIM+ Application.
            <br />
            <br />
            ESIM+ Services are provided only on a pre-payment basis.
            <br />
            <br />
            The scope of Services included in the Data Plan or Top-Up option are
            described in the ESIM+ App. These Services will be available for the
            Account Holder for a specified period such as a week, two weeks or a
            month as prescribed in the ESIM+ App.
            <br />
            <br />
            Some Services offered within ESIM+ Application may be provided on a
            subscription basis meaning that the available scope of Service will
            be automatically renewed, and the respective payment carried out
            unless the Account Holder decides to cancel such subscription.
            Services provided on a subscription basis are defined in the ESIM+
            App.
            <br />
            <br />
            When the Account Holder decides to use Services on a subscription
            basis, this Account Holder, by making the first payment for such
            Services, consents and authorizes ESIM+ to automatically debit their
            credit card (or another authorized payment method) used for such
            first payment in order to carry out future payments according to the
            conditions specified in the ESIM+ Application.
            <br />
            <br />
            The Account Holder is always entitled to change the payment method
            by configuring settings in the ESIM+ Application.
            <br />
            <br />
            The default transaction currency for the ESIM+ Services shall be
            Euro. The Account Holder may be able to perform the payment in
            another currency if such an option is displayed in the ESIM+
            Application.
            <br />
            <br />
            The Account Holder pays for the ESIM+ Services through the
            intermediary service such as Apple Pay. Available payment options
            are displayed in the ESIM+ Application.
            <br />
            <br />
            <br />
            <strong>
              We recommend that you carefully read the terms of service
              provision of the selected financial intermediary, as well as its
              privacy practices. Please pay attention to the fact that your
              relations with such financial intermediary are governed by a
              separate agreement.
            </strong>
            <br />
            <br />
            <br />
            <br />
            <strong>Returns policy and Cancellation:</strong>
            <br />
            <br />
            You have a right to cancel the Services ordered within a Data Plan
            or Top-up option during the withdrawal period of 14 days without
            giving any reason unless such Services have been already fully
            performed by ESIM+ or they concern the provision of some digital
            content that has been already provided to you.
            <br />
            <br />
            We do not issue refunds for purchases made under our referral
            program provided that the bonus has been used to purchase goods and
            services offered by us.
            <br />
            <br />
            The withdrawal period will expire after 14 days from the day when
            you performed the payment for a Data Plan or Top-up option for the
            first time.
            <br />
            <br />
            To meet the withdrawal deadline, it is sufficient for you to send
            your communication concerning your exercise of the right of
            withdrawal before the withdrawal period has expired.
            <br />
            <br />
            By paying for the Services, you agree and acknowledge that ESIM+
            provides you with access to such Services without undue delay.
            <br />
            <br />
            The provision of Services begins only when you expressly request so.
            <br />
            <br />
            <strong>
              By starting using such Services, e.g. by starting using your
              access to the Internet, you give your express consent to ESIM+ to
              begin the performance. Moreover, you acknowledge that you will
              lose your right of withdrawal once the requested Services have
              been fully performed by ESIM+.
            </strong>
            <br />
            <br />
            If you exercise your right of withdrawal, we shall reimburse to you
            all payments received from you without undue delay and in any event
            not later than 14 days from the day on which we are informed about
            your decision to withdraw from this contract. We will carry out such
            reimbursement using the same means of payment as you used for the
            initial transaction unless you have expressly agreed otherwise; in
            any event, you will not incur any fees as a result of such
            reimbursement.
            <br />
            <br />
            If you requested to begin the performance of Services during the
            withdrawal period, you shall pay ESIM+ an amount which is in
            proportion to what has been provided until you have communicated
            your withdrawal, in comparison with the full coverage of the ordered
            Services.
            <br />
            <br />
            To exercise the right of withdrawal, you must inform us of your
            decision by an unequivocal statement (e.g. a letter sent by post or
            email or means of communication available within ESIM+ Application).
            You may use our model withdrawal form, but it is not obligatory.
            <br />
            <br />
            If you want to cancel your Data Plan or Top-Up option after the
            withdrawal period ends, you must provide ESIM+ with a 14-day prior
            notice sent via email or means of communication available within
            ESIM+ Application. No reimbursements are made in such case, and the
            cancellation takes effect after the end of the pre-paid period
            calculated according to the conditions of the respective Data Plan
            or Top-Up option.
            <br />
            <br />
            Our contact details are provided
            <a href="https://esimplus.me" target="_blank" rel="noreferrer">
              below.
            </a>
            <br />
            <br />
            <br />
            <br />
            <strong>No Warranties:</strong>
            <br />
            <br />
            All Services provided by ESIM+ are provided &quot;as is&quot; and
            &quot;with all faults,&quot; and ESIM+ expressly disclaims all other
            warranties of any kind or nature, whether express, implied or
            statutory, including, but not limited to, any warranties of
            operability, condition, title, non-infringement, non-interference,
            quiet enjoyment, value, accuracy of data, or quality, as well as any
            warranties of merchantability, system integration, workmanship,
            suitability, fitness for a particular purpose, or the absence of any
            defects therein, whether latent or patent.
            <br />
            <br />
            The Services provided by ESIM+ and ESIM+ Application are not
            fault-tolerant and are not designed, manufactured or intended for
            use as on-line control equipment in hazardous environments requiring
            fail-safe performance, such as in the operation of nuclear
            facilities, aircraft navigation or aircraft communication systems,
            mass transit, direct life support machines, or weapon&apos;s
            systems, in which the failure of the products or Services could lead
            directly to death, personal injury, or severe physical or
            environmental damage (&quot;high-risk activities&quot;).
            Accordingly, ESIM+ disclaims any express or implied warranty of
            fitness for high-risk activities. The Account Holder agrees that
            ESIM+ shall not be liable for any claims or damages arising from or
            related to the use of ESIM+ Services or ESIM+ Application in
            high-risk activities or similar applications.
            <br />
            <br />
            <strong>Limitations of Liability:</strong>
            <br />
            <br />
            In no event shall ESIM+ be liable:
            <ul>
              <li>
                to Customer for any incidental, consequential, special,
                punitive, exemplary or indirect damages, or for any lost
                profits, even if advised of the possibility of such, however
                caused and regardless of theory of liability, whether tort,
                contract, or strict liability;
              </li>
              <li>
                to Customer or any third party for damages relating to personal
                injury caused by the installation or use of any ESIM+ product or
                service, or
              </li>
              <li>
                for any damages, the Customer may suffer from or in connection
                with the use or inability to use the ESIM+ App or Services,
                including the inability to make emergency service calls.
              </li>
            </ul>
            <br />
            <br />
            ESIM+&apos;s total aggregate liability for any other damages
            asserted by Customer shall be limited to the Customer&apos;s actual
            damages caused by any ESIM+ Service purchased, licensed, or used
            under this Agreement.
            <br />
            <br />
            In no event, ESIM+&apos;s total aggregate liability shall exceed the
            amounts paid to ESIM+ by Customer for any Services during three
            months preceding the date of the Customer&apos;s claim.
            <br />
            <br />
            To the extent that any products, services, or facilities provided
            hereunder, or in relation to this Agreement, are provided by third
            parties pursuant to an arrangement with ESIM+, the disclaimers and
            limitations of ESIM+&apos;s liability set forth herein, shall extend
            fully to such third parties. The disclaimers and exclusions
            contained herein are independent of any exclusive remedy and shall
            apply notwithstanding the failure of such an exclusive remedy.
            <br />
            <br />
            The above limitation includes, but is not limited to, damages
            resulting from loss or theft of data, transmission delays or
            failures, service interruptions, unauthorized access or damage to
            records, software programs or other information or property; loss of
            profits; cost of cover; or any other special, incidental,
            consequential, direct, indirect or punitive damages, however,
            caused. This limitation will apply even if ESIM+ has been advised
            of, or is aware of, the possibilities of such damages.
            <br />
            <br />
            ESIM+ does not and cannot control the quality of the participating
            member operator&apos;s networks in which Services may be used or
            interconnect with. Therefore, ESIM+ disclaims any and all liability
            that may arise from the performance, including failure, of the
            participating member operator&apos;s networks.
            <br />
            <br />
            The above-mentioned limitations apply to the extent allowed by the
            law.
            <br />
            <br />
            <strong>Changes to the Agreement:</strong>
            <br />
            <br />
            Account Holder and ESIM+ understand and agree that regulators of the
            Participating Member Operator&apos;s networks, or other bodies of
            competent legal jurisdiction, may impose new requirements or
            regulations on telecommunication services.
            <br />
            <br />
            The Account Holder acknowledges that if the new requirements or
            regulations are imposed upon ESIM+, then ESIM+ should be authorized
            to make changes to the Agreement accordingly.
            <br />
            <br />
            ESIM+ also reserves the right to review and amend the Agreement from
            time to time at its own discretion.
            <br />
            <br />
            The updated version of the Agreement will be posted on the ESIM+
            corporate website:
            <a href="https://esimplus.me/ " target="_blank" rel="noreferrer">
              https://esimplus.me/
            </a>
            <br />
            <br />
            ESIM+ will notify the Account Holder on such changes to the
            Agreement by posting respective information within the ESIM+
            Application. ESIM+ may also send notifications on updates to the
            Agreement at the email addresses provided during the registration.
            <br />
            <br />
            <strong> Consent of the Account Holder:</strong>
            <br />
            <br />
            By accessing ESIM+ Application, opening an Account or buying our
            Services, you agree to be bound by the Agreement.
            <br />
            <br />
            If you don&apos;t agree to be bound, please do not use the ESIM+
            Application or Services.
            <br />
            <br />
            The Account Holder may request the deletion of their account at any
            time by submitting a request to info@appvillis.com.
            <br />
            <br />
            <strong>Termination by ESIM+:</strong>
            <br />
            <br />
            ESIM+ shall be entitled to terminate Services or the Agreement if:
            <br />
            <br />
            <ul>
              <li>
                The Account Holder abuses ESIM+ Services or ESIM+ App by
                improper usage, including for illegal or unethical purposes;
              </li>
              <li>
                Any of the information provided by the Account Holder upon
                purchasing the ESIM+ Products is found to be false or
                unauthorized;
              </li>
              <li>
                ESIM+ deems it in the best interests of the public to terminate
                the ESIM+ Services sold;
              </li>
              <li>
                or the Account Holder breaches any of the Account Holder&apos;s
                obligations under the Agreement.
              </li>
            </ul>
            <br />
            Upon termination, ESIM+ shall have the right to disconnect the
            Account Holder&apos;s access to the Services and/or ESIM+
            Application.
            <br />
            <br />
            <strong>Force Majeure:</strong>
            <br />
            <br />
            ESIM+ shall be excused from the performance of its obligations under
            these Terms or Agreement if such a failure to perform results from:
            <br />
            <br />
            <ul>
              <li>
                compliance with any requirement of applicable law, regulation,
                or judicial order;
              </li>
              <li>
                any act of God, fire, explosion, flood, strike, embargo,
                terrorist attack, war, insurrection, or riot;
              </li>
              <li>
                shortage of, or inability to obtain, appropriate labour, fuel,
                power, or raw materials;
              </li>
              <li>
                any failure or malfunction of Account Holder&apos;s equipment,
                or of any equipment or Services used by or otherwise provided to
                Account Holder by a third-party provider;
              </li>
              <li>
                or without limiting the foregoing, any other cause beyond the
                reasonable control of the excused Party, whether of the class of
                causes hereinbefore enumerated or not (each of individually
                being a &quot;Force Majeure Event&quot;).
              </li>
            </ul>
            <br />
            Any delay resulting from a Force Majeure Event shall extend
            performance accordingly or excuse performance, in whole or in part,
            as may be reasonable under the circumstances.
            <br />
            <br />
            <strong>Fair Use Policy: </strong>
            <br />
            The use of the ESIM+ Application and purchased Service by an Account
            Holder is expected to be fair data usage free of any fraud or
            violations of their obligations defined by this Agreement and
            applicable laws. Excessive volume or duration of data use,
            determined at ESIM+&apos;s or Participating Member Operator&apos;s
            sole discretion, acting reasonably, will constitute abuse of data
            usage privileges by the Account Holder.
            <br />
            <br />
            ESIM+ reserves the right to monitor data usage and to withdraw the
            Services supplied to the Account Holder at any time in case of
            overuse or abuse of the Service by the Account Holder.
            <br />
            <br />
            ESIM+ will not be liable for reimbursement, compensation, or any
            subsequent loss of any ESIM+ Product or Service(s) that is
            suspended, withdrawn, or terminated under this Fair Use Policy.
            <br />
            <br />
            <strong>Jurisdiction and Dispute Resolution:</strong>
            <br />
            This Agreement shall be governed by the laws of Lithuania.
            <br />
            <br />
            Any dispute, controversy, or claim arising out of, or in relation to
            the Agreement, including the validity, invalidity, breach, or
            termination thereof, shall be resolved by the competent court
            according to the laws of Lithuania.
            <br />
            <br />
            <strong>Ownership:</strong>
            <br />
            <br />
            The Account Holder agrees that all rights, title, and interest in
            and to all intellectual property rights, including, without
            limitation, patents, copyright, trademark, trade secrets and all
            other related proprietary rights in the ESIM+ Application are vested
            in ESIM+ and/or its licensors and affiliates and ESIM+ and/or its
            licensors, and affiliates are the sole and exclusive owners thereof.
            <br />
            <br />
            Nothing in this Agreement or in the Parties&apos; course of dealing
            or performance hereunder shall transfer, assign, or grant to, or be
            claimed to transfer, assign, or grant any right, title, or interest
            in, or expressly or impliedly license, including by estoppel,
            statutory operation, or otherwise, other than as expressly granted,
            any Intellectual Property Rights of ESIM+, its Affiliates, or any
            third party.
            <br />
            <br />
            ESIM+ and its Affiliates and licensors reserve all rights thereto,
            except the limited rights expressly granted to Account Holder
            hereunder.
            <br />
            <br />
            All intellectual property rights in ESIM+ Application belong to
            ESIM+. The purchase or use of any ESIM+ Services by the Account
            Holder does not imply any transfer of intellectual property rights
            from ESIM+ to the Account Holder.
            <br />
            <br />
            Account Holder shall not engage in any act or omission that would
            impair the intellectual property rights of ESIM+ or its Affiliates
            or licensors in any ESIM+ product or service.
            <br />
            <br />
            In particular, the Account Holder shall not copy, republish, frame,
            download, transmit, modify, rent, lease, loan, sell, assign,
            distribute, license, sublicense, reverse engineer, or create
            derivative works based on the content of the ESIM+ Application,
            except as expressly authorized by ESIM+. Any use of the content,
            including its distribution, reproduction, modification, display or
            transmission without the prior written consent of ESIM+ is strictly
            prohibited.
            <br />
            <br />
            The Account Holder is entitled to access ESIM+&apos;s intellectual
            property and display it on their devices only to the extent
            necessary to use ESIM+&apos;s Services provided through the ESIM+
            Application.
            <br />
            <br />
            For the use of ESIM+ Trademarks and Brand, please contact us and we
            will consider the possibility of providing you with permission. If
            we decide that permission should be granted, we will provide you
            with needed Trademarks and Brand materials as well as with
            Guidelines as to their use.
            <br />
            <br />
            <br />
            <strong>Privacy Policy:</strong>
            <br />
            <br />
            ESIM+ is committed to providing the users of the ESIM+ App with a
            great experience but also protecting their privacy rights.
            <br />
            <br />
            ESIM+ takes the matter of privacy seriously. Please refer to
            ESIM+&apos;s Privacy Policy for further details.
            <br />
            <br />
            <strong>Contact Details:</strong>
            <br />
            <strong>UAB Appvillis</strong>
            <br />
            Šiaulių g. 10-56, Vilnius, 01134, Lithiania
            <br />
            info@appvillis.com
          </div>
        </Container>
        <Footer />
      </Wrapper>
    </>
  );
}

export default TermsOfUse;

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
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
