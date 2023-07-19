import slug from "slug";

function slugify(text) {
  const timestamp = Date.now();
  const newText = slug(text, { lower: true });
  return `${newText}-${timestamp}`;
}

export function slugifyUpdate(newText,oldSlug) {
  const sluggedText = slug(newText, { lower: true });
  const oldParts = oldSlug.split("-");
  const lastPart = oldParts[oldParts.length - 1];
  const updatedText = sluggedText + "-" + lastPart;
  return updatedText;
}

export default slugify;
