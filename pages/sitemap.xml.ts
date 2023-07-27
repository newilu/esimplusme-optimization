import { NextApiResponse } from "next";
import { COUNTRY_LIST } from "@/shared/constants";
import { formatStringToKebabCase } from "@/shared/lib";

function SiteMap() {
  return null;
}

export async function getServerSideProps({ res }: { res: NextApiResponse }) {
  const sitemap = await fetch(
    "https://admin-blog.esimplus.me/api/sitemap"
  ).then((response) => response.text());

  const buildUrlElement = (url: string) =>
    `<url>
        <loc>https://esimplus.me/${url}</loc>
        <changefreq>weekly</changefreq>
        <priority>1</priority>
    </url>`;

  const updatedSitemap = sitemap
    .replace("</urlset>", "")
    .concat(buildUrlElement("virtual-phone-number/pricing"))
    .concat(buildUrlElement("virtual-phone-number/united-states/mobile"))
    .concat(
      COUNTRY_LIST.map((country) =>
        buildUrlElement(
          `virtual-phone-number/${formatStringToKebabCase(country.name)}`
        )
      ).join("")
    )
    .concat("</urlset>");

  res.setHeader("Content-Type", "text/xml");
  res.write(updatedSitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;
