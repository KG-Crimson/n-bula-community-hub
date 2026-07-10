// Convert a Lovable asset .asset.json url (relative /__l5e/...) into an absolute URL
// so it also works when the app is hosted outside Lovable (e.g. Vercel).
const LOVABLE_CDN_ORIGIN = "https://de898129-ca4e-4195-a14a-67caaa6c3dea.lovableproject.com";

export function assetUrl(url: string): string {
  if (!url) return url;
  if (/^https?:\/\//i.test(url)) return url;
  return `${LOVABLE_CDN_ORIGIN}${url}`;
}
