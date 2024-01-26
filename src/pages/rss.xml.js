import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { SITE_TITLE, SITE_DESCRIPTION } from "../consts";

export async function GET(context) {
  const posts = await getCollection("posts");

  return rss({
    xmlns: { atom: "http://www.w3.org/2005/Atom" },
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    items: posts
      .map((post) => ({
        ...post.data,
        link: post.data.url,
        pubDate: post.data.date
      }))
      .reverse(),
    customData: [
      "<language>en-GB</language>",
      `<lastBuildDate>${posts.at(-1).data.date}</lastBuildDate>`,
      `<atom:link href="https://www.tynetime.com/rss.xml" rel="self" type="application/rss+xml" />`
    ].join(" ")
  });
}
