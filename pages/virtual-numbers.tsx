import React from "react";
import { GetServerSideProps } from "next";

function VirtualNumbers() {
  return <div></div>;
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    redirect: {
      statusCode: 301,
      destination: `${
        locale === "en" ? "" : `/${locale}`
      }/virtual-phone-number`,
    },
  };
};

export default VirtualNumbers;
