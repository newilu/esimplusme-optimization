import React from "react";
import { GetServerSideProps } from "next";

function MobileData() {
  return <></>;
}

export default MobileData;

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: "/",
      statusCode: 301,
    },
  };
};
