export const slugify = (category: string): string => {
  return category
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, "")
    .replace(/\s+/g, "-");
};

export const unslugify = (category: string): string => {
  return category
    .replace(/\-/g, " ")
    .replace(
      /\w\S*/g,
      (text) => text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
    );
};
