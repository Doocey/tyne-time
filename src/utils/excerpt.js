import MarkdownIt from "markdown-it";

const parser = new MarkdownIt();

export const createExcerpt = ({ body, stringLimit }) => {
  return parser
    .render(body)
    .split("\n")
    .map((str) => str.replace(/<\/?[^>]+(>|$)/g, "").split("\n"))
    .flat()
    .join(" ")
    .slice(0, stringLimit)
    .split(" ")
    .slice(0, -1)
    .join(" ");
};
