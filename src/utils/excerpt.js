import { micromark } from "micromark";

export const createExcerpt = ({ body, characterLimit }) => {
  // Allow the ampersand (&) symbol in the <PostCard />
  return micromark(body)
    .replaceAll("&amp;", "&")
    .split("\n")
    .map((str) => str.replace(/<\/?[^>]+(>|$)/g, "").split("\n"))
    .flat()
    .join(" ")
    .slice(0, characterLimit)
    .split(" ")
    .slice(0, -1)
    .join(" ");
};
