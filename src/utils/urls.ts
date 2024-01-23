export const stripFirstForwardSlash = (url: string): string =>
  url.replace(/^\/+/, "");
