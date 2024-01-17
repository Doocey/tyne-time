import { getCollection } from "astro:content";
import { slugify } from "../utils/slugify";

export async function GET({ request }) {
  const { url } = request;
  const { hostname, port, protocol } = new URL(url);

  const baseUrl = import.meta.env.PROD
    ? `https://www.tynetime.com`
    : `${protocol}//${hostname}:${port}`;

  console.log("baseurl", baseUrl);
  const posts = await getCollection("posts");

  const mostRecentPost = posts[posts.length - 1];

  const categories = [
    ...new Set(posts.map((post) => post.data.categories).flat()),
  ];

  const primaryPages = ["/about/", "/advertise/", "/contact/"];

  const primaryPagesXmlString = primaryPages.map(
    (page) => `<url>
  <loc>${baseUrl}${page}</loc>
  </url>`,
  );

  primaryPagesXmlString.push(`<url>
    <loc>${baseUrl}/</loc>
    <lastmod>${new Date(mostRecentPost.data.date).toISOString()}</lastmod>
    </url>`);

  const postsXmlString = posts.map(
    (singlePost) => `<url>
    <loc>${baseUrl}${singlePost.data.url}</loc>
    ${
      singlePost.data.image
        ? `<image:image>
      <image:loc>${singlePost.data.image}</image:loc>
    </image:image>`
        : ""
    }
    <lastmod>${new Date(singlePost.data.date).toISOString()}</lastmod>
    </url>`,
  );

  const categoriesXmlString = categories.map(
    (singleCategory) => `<url>
    <loc>${baseUrl}categories/${slugify(singleCategory)}/</loc>
    </url>`,
  );

  const completeXmlString = [
    ...primaryPagesXmlString,
    ...postsXmlString,
    ...categoriesXmlString,
  ];

  const xmlString = `<?xml version="1.0" encoding="UTF-8"?><?xml-stylesheet type="text/xsl" href="/sitemap.xsl" ?>
    <urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd http://www.google.com/schemas/sitemap-image/1.1 http://www.google.com/schemas/sitemap-image/1.1/sitemap-image.xsd" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${completeXmlString.join(" ").trim()}
    </urlset>`;

  return new Response(xmlString, {
    headers: new Headers({
      "Content-Type": "text/xml",
    }),
  });
}
