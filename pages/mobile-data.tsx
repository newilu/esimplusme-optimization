import React from "react";
import { GetServerSideProps } from "next";

function MobileData() {
  return <div />;
}

export default MobileData;

export const getServerSideProps: GetServerSideProps = async () => ({
  redirect: {
    destination: "/",
    statusCode: 301,
  },
});
