import { NextApiResponse } from "next";

function SiteMap() {
  return null;
}

export async function getServerSideProps({ res }: { res: NextApiResponse }) {
  const sitemap = await fetch(
    "https://admin-blog.esimplus.me/api/sitemap"
  ).then((response) => response.text());

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;
