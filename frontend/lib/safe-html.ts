export function sanitizeHtml(html: string) {
  if (typeof window === "undefined") return "";
  const parser = new DOMParser();
  const document = parser.parseFromString(html, "text/html");
  document.querySelectorAll("script, iframe, object, embed").forEach((node) => node.remove());
  document.querySelectorAll("*").forEach((node) => {
    [...node.attributes].forEach((attribute) => {
      const name = attribute.name.toLowerCase();
      const value = attribute.value.toLowerCase();
      if (name.startsWith("on") || value.startsWith("javascript:")) node.removeAttribute(attribute.name);
    });
  });
  return document.body.innerHTML;
}

export function isSafeUrl(url?: string) {
  if (!url) return false;
  try {
    const parsed = new URL(url);
    return ["http:", "https:"].includes(parsed.protocol);
  } catch {
    return false;
  }
}
