/** Stable Unsplash CDN URLs (`auto=format` avoids many 404s from old query styles). */
export function buildUnsplashUrl(
  photo: string,
  width: number,
  height?: number,
): string {
  const h = height ?? width;
  return `https://images.unsplash.com/${photo}?auto=format&fit=crop&w=${width}&h=${h}&q=80`;
}
