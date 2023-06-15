import React from "react";
import styled from "styled-components";
import { useTranslation } from "next-i18next";
import { Container } from "shared/ui/styled";
import Footer from "components/Footer";
import Navbar from "widgets/Navbar";
import { LANGS_LIST } from "shared/constants";
import { useRouter } from "next/router";
import Head from "next/head.js";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Wrapper = styled.div`
  padding-top: 80px;
  background: ${(props) => props.theme.bg};
  color: ${(props) => props.theme.primaryText};
`;

function Privacy() {
  const { pathname } = useRouter();
  const { t, i18n } = useTranslation();

  return (
    <>
      <Head>
        <title>{t("privacy_policy")}</title>
        <meta
          name="description"
          content={t("privacy_policy_page_description")}
        />
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
        <meta property="og:title" content={`ESIM+ | ${t("privacy_policy")}`} />
        <meta
          property="og:description"
          content={t("privacy_policy_page_description")}
        />
        <meta name="twitter:card" content="app" />
        <meta name="twitter:title" content={`ESIM+ | ${t("privacy_policy")}`} />
        <meta
          name="twitter:description"
          content={t("privacy_policy_page_description")}
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
          }/privacy`}
        />
        {LANGS_LIST.map((lng) => (
          <link
            key={lng.concat("2")}
            rel="alternate"
            href={`https://esimplus.me${
              lng.startsWith("en") ? "" : `/${lng.slice(0, 2)}`
            }/privacy`}
            hrefLang={lng.toLowerCase()}
          />
        ))}
      </Head>
      <Wrapper>
        <Navbar />
        <Container>
          <p>
            <h1>Privacy policy</h1>
            <br />
            <br />
            <br />
            <br />
            Thank you for choosing to be part of our community at Appvillis, UAB
            (&quot;Company&quot;, &quot;we&quot;, &quot;us&quot;, or
            &quot;our&quot;). We are committed to protecting your personal
            information and your right to privacy. If you have any questions or
            concerns about our Policy, or our practices with regards to your
            personal information, please contact us at support@appvillis.com.
            <br />
            <br />
            When you visit our mobile application, and use our services, you
            trust us with your personal information. We take your privacy very
            seriously. In this privacy notice, we describe our Privacy Policy.
            We seek to explain to you in the clearest way possible what
            information we collect, how we use it and what rights you have in
            relation to it. We hope you take some time to read through it
            carefully, as it is important. If there are any terms in this
            Privacy Policy that you do not agree with, please discontinue use of
            our Apps and our services.
            <br />
            <br />
            This Privacy Policy applies to all information collected through our
            mobile application, (&quot;Apps&quot;), and/or any related services,
            sales, marketing or events (we refer to them collectively in this
            Privacy Policy as the &quot;Sites&quot;).
            <br />
            <br />
            Please read this Privacy Policy carefully as it will help you make
            informed decisions about sharing your personal information with us.
            <br />
            <br />
            <br />
            <br />
            1. WHAT INFORMATION DO WE COLLECT?
            <br />
            <br />
            Information automatically collected
            <br />
            <br />
            <em>
              In Short: Some information – such as IP address and/or browser and
              device characteristics – is collected automatically when you visit
              our Apps.
            </em>
            <br />
            <br />
            We automatically collect certain information when you visit, use or
            navigate the Apps. This information does not reveal your specific
            identity (like your name or contact information) but may include
            device and usage information, such as your IP address, browser and
            device characteristics, operating system, language preferences,
            referring URLs, device name, country, location, information about
            how and when you use our Apps and other technical information. This
            information is primarily needed to maintain the security and
            operation of our Apps, and for our internal analytics and reporting
            purposes.
            <br />
            <br />
            Like many businesses, we also collect information through cookies
            and similar technologies.
            <br />
            <br />
            Information collected through our Apps
            <br />
            <br />
            <em>
              In Short: We may collect information regarding your mobile device,
              push notifications, when you use our apps.
            </em>
            <br />
            <br />
            If you use our Apps, we may also collect the following information:
            <br />
            <br />
            <ul>
              <li>
                <em>Mobile Device Access.</em>
                We may request access or permission to certain features from
                your mobile device, including your mobile device&apos;s camera,
                and other features. If you wish to change our access or
                permissions, you may do so in your device&apos;s settings.
              </li>
              <li>
                <em>Mobile Device Data.</em>
                We may automatically collect device information (such as your
                mobile device ID, model and manufacturer), operating system,
                version information and IP address.
              </li>
              <li>
                <em>Push Notifications.</em>
                We may request to send you push notifications regarding your
                account or the mobile application. If you wish to opt-out from
                receiving these types of communications, you may turn them off
                in your device&apos;s settings.
              </li>
            </ul>
            <br />
            <br />
            Information collected from other sources
            <br />
            <br />
            <em>
              In Short: We may collect limited data from public databases,
              marketing partners, and other outside sources.
            </em>
            <br />
            <br />
            We may obtain information about you from other sources, such as
            public databases, joint marketing partners, as well as from other
            third parties. Examples of the information we receive from other
            sources include: social media profile information; marketing leads
            and search results and links, including paid listings (such as
            sponsored links).
            <br />
            <br />
            2. HOW DO WE USE YOUR INFORMATION?
            <br />
            <br />
            <em>
              In Short: We process your information for purposes based on
              legitimate business interests, the fulfillment of our contract
              with you, compliance with our legal obligations, and/or your
              consent.
            </em>
            <br />
            <br />
            We use personal information collected via our Apps for a variety of
            business purposes described below. We process your personal
            information for these purposes in reliance on our legitimate
            business interests, in order to enter into or perform a contract
            with you, with your consent, and/or for compliance with our legal
            obligations. We indicate the specific processing grounds we rely on
            next to each purpose listed below.
            <br />
            <br />
            We use the information we collect or receive:
            <br />
            <br />
            <ul>
              <li>
                To send you marketing and promotional communications. We and/or
                our third party marketing partners may use the personal
                information you send to us for our marketing purposes, if this
                is in accordance with your marketing preferences. You can
                opt-out of our marketing emails at any time (see the &quot; WHAT
                ARE YOUR PRIVACY RIGHTS &quot; below).
              </li>
              <li>
                To send administrative information to you. We may use your
                personal information to send you product, service and new
                feature information and/or information about changes to our
                terms, conditions, and policies.
              </li>
              <li>
                Fulfill and manage your orders. We may use your information to
                fulfill and manage your orders, payments, returns, and exchanges
                made through the Apps.
              </li>
              <li>
                To post testimonials. We post testimonials on our Apps that may
                contain personal information. Prior to posting a testimonial, we
                will obtain your consent to use your name and testimonial. If
                you wish to update, or delete your testimonial, please contact
                us at support@appvillis.com and be sure to include your name,
                testimonial location, and contact information.
              </li>
              <li>
                Deliver targeted advertising to you. We may use your information
                to develop and display content and advertising (and work with
                third parties who do so) tailored to your interests and/or
                location and to measure its effectiveness.
              </li>
              <li>
                Request Feedback. We may use your information to request
                feedback and to contact you about your use of our Apps.
              </li>
              <li>
                To protect our Sites. We may use your information as part of our
                efforts to keep our Apps safe and secure (for example, for fraud
                monitoring and prevention).
              </li>
              <li>To enforce our terms, conditions and policies.</li>
              <li>
                To respond to legal requests and prevent harm. If we receive a
                subpoena or other legal request, we may need to inspect the data
                we hold to determine how to respond.
              </li>
              <li>
                For other Business Purposes. We may use your information for
                other Business Purposes, such as data analysis, identifying
                usage trends, determining the effectiveness of our promotional
                campaigns and to evaluate and improve our Apps, products,
                services, marketing and your experience.
              </li>
            </ul>
            <br />
            <br />
            3. WILL YOUR INFORMATION BE SHARED WITH ANYONE?
            <br />
            <br />
            <em>
              In Short: We only share information with your consent, to comply
              with laws, to protect your rights, or to fulfill business
              obligations.
            </em>
            <br />
            <br />
            We may process or share data based on the following legal basis:
            <br />
            <br />
            <ul>
              <li>
                {" "}
                Consent: We may process your data if you have given us specific
                consent to use your personal information in a specific purpose.
              </li>
              <li>
                Legitimate Interests: We may process your data when it is
                reasonably necessary to achieve our legitimate business
                interests.
              </li>
              <li>
                Performance of a Contract: Where we have entered into a contract
                with you, we may process your personal information to fulfill
                the terms of our contract.
              </li>
              <li>
                Legal Obligations: We may disclose your information where we are
                legally required to do so in order to comply with applicable
                law, governmental requests, a judicial proceeding, court order,
                or legal process, such as in response to a court order or a
                subpoena (including in response to public authorities to meet
                national security or law enforcement requirements).
              </li>
              <li>
                Vital Interests: We may disclose your information where we
                believe it is necessary to investigate, prevent, or take action
                regarding potential violations of our policies, suspected fraud,
                situations involving potential threats to the safety of any
                person and illegal activities, or as evidence in litigation in
                which we are involved.
              </li>
            </ul>
            <br />
            <br />
            More specifically, we may need to process your data or share your
            personal information in the following situations:
            <br />
            <br />
            <ul>
              <li>
                Vendors, Consultants and Other Third-Party Service Providers. We
                may share your data with third party vendors, service providers,
                contractors or agents who perform services for us or on our
                behalf and require access to such information to do that work.
                Examples include: payment processing, data analysis, email
                delivery, hosting services, customer service and marketing
                efforts. We may allow selected third parties to use tracking
                technology on the Apps, which will enable them to collect data
                about how you interact with the Apps over time. This information
                may be used to, among other things, analyze and track data,
                determine the popularity of certain content and better
                understand online activity. Unless described in this Policy, we
                do not share, sell, rent or trade any of your information with
                third parties for their promotional purposes.
              </li>
              <li>
                Business Transfers. We may share or transfer your information in
                connection with, or during negotiations of, any merger, sale of
                company assets, financing, or acquisition of all or a portion of
                our business to another company.
              </li>
              <li>
                Affiliates. We may share your information with our affiliates,
                in which case we will require those affiliates to honor this
                Privacy Policy. Affiliates include our parent company and any
                subsidiaries, joint venture partners or other companies that we
                control or that are under common control with us.
              </li>
              <li>
                Business Partners. We may share your information with our
                business partners to offer you certain products, services or
                promotions.
              </li>
              <li>
                Other Users. When you share personal information or otherwise
                interact with public areas of the Apps, such personal
                information may be viewed by all users and may be publicly
                distributed outside the Apps in perpetuity. Similarly, other
                users will be able to view descriptions of your activity,
                communicate with you within our Apps, and view your profile.
              </li>
            </ul>
            <br />
            <br />
            4. WHO WILL YOUR INFORMATION BE SHARED WITH?
            <br />
            <br />
            <em>
              In Short: We only share information with the following third
              parties.
            </em>
            <br />
            <br />
            We only share and disclose your information with the following third
            parties. We have categorized each party so that you may be easily
            understand the purpose of our data collection and processing
            practices. If we have processed your data based on your consent and
            you wish to revoke your consent, please contact us.
            <ul>
              <li>
                Advertising, Direct Marketing, and Lead GenerationAdMob and
                Facebook Audience Network
              </li>
              <li>
                Functionality and Infrastructure OptimizationCloud Functions for
                Firebase
              </li>
              <li>Invoice and BillingApple Pay and Android Pay</li>
              <li>
                Web and Mobile Analytics, Appsflyer, Facebook Analytics, Google
                Analytics, Google Analytics for Firebase and TestFlight
              </li>
            </ul>
            <br />
            <br />
            5. DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?
            <br />
            <br />
            <em>
              In Short: We may use cookies and other tracking technologies to
              collect and store your information.
            </em>
            <br />
            <br />
            We may use cookies and similar tracking technologies (like web
            beacons and pixels) to access or store information. Specific
            information about how we use such technologies and how you can
            refuse certain cookies is set out in our Cookie Policy.
            <br />
            <br />
            6. IS YOUR INFORMATION TRANSFERRED INTERNATIONALLY?
            <br />
            <br />
            <em>
              In Short: We may transfer, store, and process your information in
              countries other than your own.
            </em>
            <br />
            <br />
            Our servers are located in EU and USA. If you are accessing our Apps
            from outside, please be aware that your information may be
            transferred to, stored, and processed by us in our facilities and by
            those third parties with whom we may share your personal information
            (see &quot; WILL YOUR INFORMATION BE SHARED WITH ANYONE? &quot;
            above) in other countries.
            <br />
            <br />
            If you are a resident in the European Economic Area, then these
            countries may not have data protection or other laws as
            comprehensive as those in your country. We will however take all
            necessary measures to protect your personal information in
            accordance with this Privacy Policy and applicable law.
            <br />
            <br />
            7. WHAT IS OUR STANCE ON THIRD-PARTY WEBSITES?
            <br />
            <br />
            <em>
              In Short: We are not responsible for the safety of any information
              that you share with third-party providers who advertise, but are
              not affiliated with, our websites.
            </em>
            <br />
            <br />
            The Apps may contain advertisements from third parties that are not
            affiliated with us and which may link to other websites, online
            services or mobile applications. We cannot guarantee the safety and
            privacy of data you provide to any third parties. Any data collected
            by third parties is not covered by this privacy policy. We are not
            responsible for the content or privacy and security practices and
            policies of any third parties, including other websites, services or
            applications that may be linked to or from the Apps. You should
            review the policies of such third parties and contact them directly
            to respond to your questions.
            <br />
            <br />
            8. HOW LONG DO WE KEEP YOUR INFORMATION?
            <br />
            <br />
            <em>
              In Short: We keep your information for as long as necessary to
              fulfill the purposes outlined in this privacy policy unless
              otherwise required by law.
            </em>
            <br />
            <br />
            We will only keep your personal information for as long as it is
            necessary for the purposes set out in this Privacy Policy, unless a
            longer retention period is required or permitted by law (such as
            tax, accounting or other legal requirements). No purpose in this
            Policy will require us keeping your personal information for longer
            than 2 years.
            <br />
            <br />
            When we have no ongoing legitimate business need to process your
            personal information, we will either delete or anonymize it, or, if
            this is not possible (for example, because your personal information
            has been stored in backup archives), then we will securely store
            your personal information and isolate it from any further processing
            until deletion is possible.
            <br />
            <br />
            9. HOW DO WE KEEP YOUR INFORMATION SAFE?
            <br />
            <br />
            <em>
              In Short: We aim to protect your personal information through a
              system of organizational and technical security measures.
            </em>
            <br />
            <br />
            We have implemented appropriate technical and organizational
            security measures designed to protect the security of any personal
            information we process. However, please also remember that we cannot
            guarantee that the internet itself is 100% secure. Although we will
            do our best to protect your personal information, transmission of
            personal information to and from our Apps is at your own risk. You
            should only access the services within a secure environment.
            <br />
            <br />
            10. DO WE COLLECT INFORMATION FROM MINORS?
            <br />
            <br />
            <em>
              In Short: We do not knowingly collect data from or market to
              children under 18 years of age.
            </em>
            <br />
            <br />
            We do not knowingly solicit data from or market to children under 18
            years of age. By using the Apps, you represent that you are at least
            18 or that you are the parent or guardian of such a minor and
            consent to such minor dependent&apos;s use of the Apps. If we learn
            that personal information from users less than 18 years of age has
            been collected, we will deactivate the account and take reasonable
            measures to promptly delete such data from our records. If you
            become aware of any data we have collected from children under age
            18, please contact us at support@appvillis.com.
            <br />
            <br />
            11. WHAT ARE YOUR PRIVACY RIGHTS?
            <br />
            <br />
            <em>
              In Short: In some regions, such as the European Economic Area, you
              have rights that allow you greater access to and control over your
              personal information. You may review, change, or terminate your
              account at any time.
            </em>
            <br />
            <br />
            In some regions (like the European Economic Area), you have certain
            rights under applicable data protection laws. These may include the
            right (i) to request access and obtain a copy of your personal
            information, (ii) to request rectification or erasure; (iii) to
            restrict the processing of your personal information; and (iv) if
            applicable, to data portability. In certain circumstances, you may
            also have the right to object to the processing of your personal
            information. To make such a request, please use the
            <a href="https://esimplus.me" target="_blank" rel="noreferrer">
              contact details
            </a>
            provided below. We will consider and act upon any request in
            accordance with applicable data protection laws.
            <br />
            <br />
            If we are relying on your consent to process your personal
            information, you have the right to withdraw your consent at any
            time. Please note however that this will not affect the lawfulness
            of the processing before its withdrawal.
            <br />
            <br />
            If you are resident in the European Economic Area and you believe we
            are unlawfully processing your personal information, you also have
            the right to complain to your local data protection supervisory
            authority. You can find their contact details here:
            <a href="http://ec.europa.eu/justice/data-protection/bodies/authorities/index_en.html">
              http://ec.europa.eu/justice/data-protection/bodies/authorities/index_en.html
            </a>
            <br />
            <br />
            Cookies and similar technologies: Most Web browsers are set to
            accept cookies by default. If you prefer, you can usually choose to
            set your browser to remove cookies and to reject cookies. If you
            choose to remove cookies or reject cookies, this could affect
            certain features or services of our Apps.
            <br />
            <br />
            12. CONTROLS FOR DO-NOT-TRACK FEATURES
            <br />
            <br />
            Most web browsers and some mobile operating systems and mobile
            applications include a Do-Not-Track (&quot;DNT&quot;) feature or
            setting you can activate to signal your privacy preference not to
            have data about your online browsing activities monitored and
            collected. No uniform technology standard for recognizing and
            implementing DNT signals has been finalized. As such, we do not
            currently respond to DNT browser signals or any other mechanism that
            automatically communicates your choice not to be tracked online. If
            a standard for online tracking is adopted that we must follow in the
            future, we will inform you about that practice in a revised version
            of this Privacy Policy.
            <br />
            <br />
            13. DELETION OF THE USER&apos;S PERSONAL INFORMATION AND
            DISCONNECTION OF THE USER&apos;S ACCOUNT FROM THE PROVISION OF
            SERVICES BY THE ESIM + SERVICE.
            <br />
            <br />
            The user&apos;s personal data can be deleted at the request of the
            user after contacting the support service via email
            support.esim@appvillis.com. Account data will be completely deleted,
            ESIMs and virtual numbers connected to the account will stop
            working. It will be impossible to restore data after deletion.
            <br />
            <br />
            14. DO CALIFORNIA RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?
            <br />
            <br />
            <em>
              In Short: Yes, if you are a resident of California, you are
              granted specific rights regarding access to your personal
              information.
            </em>
            <br />
            <br />
            California Civil Code Section 1798.83, also known as the &quot;Shine
            The Light&quot; law, permits our users who are California residents
            to request and obtain from us, once a year and free of charge,
            information about categories of personal information (if any) we
            disclosed to third parties for direct marketing purposes and the
            names and addresses of all third parties with which we shared
            personal information in the immediately preceding calendar year. If
            you are a California resident and would like to make such a request,
            please submit your request in writing to us using the contact
            information provided below.
            <br />
            <br />
            If you are under 18 years of age, reside in California, and have a
            registered account with the Apps, you have the right to request
            removal of unwanted data that you publicly post on the Apps. To
            request removal of such data, please contact us using the contact
            information provided below, and include the email address associated
            with your account and a statement that you reside in California. We
            will make sure the data is not publicly displayed on the Apps, but
            please be aware that the data may not be completely or
            comprehensively removed from our systems.
            <br />
            <br />
            15. DO WE MAKE UPDATES TO THIS POLICY?
            <br />
            <br />
            <em>
              In Short: Yes, we will update this policy as necessary to stay
              compliant with relevant laws.
            </em>
            <br />
            <br />
            We may update this Privacy Policy from time to time. The updated
            version will be indicated by an updated &quot;Revised&quot; date and
            the updated version will be effective as soon as it is accessible.
            If we make material changes to this privacy policy, we may notify
            you either by prominently posting a notice of such changes or by
            directly sending you a notification. We encourage you to review this
            privacy policy frequently to be informed of how we are protecting
            your information.
            <br />
            <br />
            16. HOW CAN YOU CONTACT US ABOUT THIS POLICY?
            <br />
            <br />
            If you have questions or comments about this policy, you may email
            us at support@appvillis.com or by post to: Šiaulių g. 10-56,
            Vilnius, 01134, Lithiania
          </p>
        </Container>
        <Footer />
      </Wrapper>
    </>
  );
}

export default Privacy;

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
