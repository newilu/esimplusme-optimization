import { format } from "date-fns";
import { LANGUAGE_OPTIONS, BASE_APP_URL } from "../utils/constants";

const langList = LANGUAGE_OPTIONS.map((el) => el.value).filter(
  (el) => el !== "en"
);

function generateSiteMap(posts) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <!--We manually set the two URLs we know already-->
     <url>
       <loc>${BASE_APP_URL}/</loc>
       <lastmod>${format(new Date(), "yyyy-MM-dd")}</lastmod>
       <changefreq>weekly</changefreq>
       <priority>1</priority>
     </url>
     <url>
       <loc>${BASE_APP_URL}/virtual-numbers</loc>
       <lastmod>${format(new Date(), "yyyy-MM-dd")}</lastmod>
       <changefreq>weekly</changefreq>
       <priority>1</priority>
     </url>
     <url>
       <loc>${BASE_APP_URL}/esim-supported-devices</loc>
       <lastmod>${format(new Date(), "yyyy-MM-dd")}</lastmod>
       <changefreq>weekly</changefreq>
       <priority>1</priority>
     </url>
     <url>
       <loc>${BASE_APP_URL}/blog</loc>
       <lastmod>${format(new Date(), "yyyy-MM-dd")}</lastmod>
       <changefreq>weekly</changefreq>
       <priority>1</priority>
     </url>
     <url>
       <loc>${BASE_APP_URL}/authors</loc>
       <lastmod>${format(new Date(), "yyyy-MM-dd")}</lastmod>
       <changefreq>weekly</changefreq>
       <priority>1</priority>
     </url>
     <url>
       <loc>${BASE_APP_URL}/privacy</loc>
       <lastmod>${format(new Date(), "yyyy-MM-dd")}</lastmod>
       <changefreq>weekly</changefreq>
       <priority>1</priority>
     </url>
     <url>
       <loc>${BASE_APP_URL}/terms</loc>
       <lastmod>${format(new Date(), "yyyy-MM-dd")}</lastmod>
       <changefreq>weekly</changefreq>
       <priority>1</priority>
     </url>
     ${langList.map((el) => {
       return `
       <url>
           <loc>${`${BASE_APP_URL}/${el}`}</loc>
           <lastmod>${format(new Date(), "yyyy-MM-dd")}</lastmod>
           <changefreq>weekly</changefreq>
           <priority>1</priority>
       </url>
       <url>
           <loc>${`${BASE_APP_URL}/${el}`}/virtual-numbers</loc>
           <lastmod>${format(new Date(), "yyyy-MM-dd")}</lastmod>
           <changefreq>weekly</changefreq>
           <priority>1</priority>
       </url>
        <url>
           <loc>${`${BASE_APP_URL}/${el}`}/esim-supported-devices</loc>
           <lastmod>${format(new Date(), "yyyy-MM-dd")}</lastmod>
           <changefreq>weekly</changefreq>
           <priority>1</priority>
       </url>
       
     `;
     })}
     ${posts
       .map(({ id }) => {
         return `
       <url>
           <loc>${`${BASE_APP_URL}/blog/${id}`}</loc>
           <lastmod>${format(new Date(), "yyyy-MM-dd")}</lastmod>
           <changefreq>weekly</changefreq>
           <priority>1</priority>
       </url>
     `;
       })
       .join("")}
   </urlset>
 `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
  return null;
}

export async function getServerSideProps({ res }) {
  // We make an API call to gather the URLs for our site
  // const posts = ...

  const sitemap = generateSiteMap([]);

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;
