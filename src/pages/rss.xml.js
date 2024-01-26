import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { SITE_TITLE, SITE_DESCRIPTION } from "../consts";

export async function GET(context) {
  const posts = await getCollection("posts");

  return rss({
    xmlns: {
      atom: "http://www.w3.org/2005/Atom",
      media: "http://search.yahoo.com/mrss/"
    },
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    items: posts
      .map((post) => ({
        ...post.data,
        link: post.data.url,
        pubDate: post.data.date,
        ...(post.data.image && {
          customData: `<media:content
          type="image/${post.data.image.format == "jpg" ? "jpeg" : "png"}"
          width="${post.data.image.width}"
          height="${post.data.image.height}"
          medium="image"
          url="https://www.tynetime.com${post.data.image.src}" />`
        })
      }))
      .reverse(),
    customData: [
      "<language>en-GB</language>",
      `<lastBuildDate>${posts.at(-1).data.date.toUTCString()}</lastBuildDate>`,
      `<atom:link href="https://www.tynetime.com/rss.xml" rel="self" type="application/rss+xml" />`
    ].join(" ")
  });
}
