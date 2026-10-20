const productionSiteUrl = "https://beambrochure.procare.expert/";

export function resolveSiteUrl(value: string = productionSiteUrl): string {
  const url = new URL(value);
  const isLoopback =
    url.hostname === "localhost" ||
    url.hostname.endsWith(".localhost") ||
    url.hostname.startsWith("127.") ||
    url.hostname === "[::1]";

  if (
    url.protocol !== "https:" ||
    isLoopback ||
    url.username ||
    url.password ||
    url.pathname !== "/" ||
    url.search ||
    url.hash
  ) {
    throw new Error(
      "SITE_URL must be the public HTTPS origin of the brochure, without credentials, a path, a query or a fragment.",
    );
  }

  return `${url.origin}/`;
}

export const siteUrl = resolveSiteUrl(process.env.SITE_URL);
export const siteTitle = "BeamHub | Radiation Medicine Courses & Community";
export const siteDescription =
  "Explore BeamHub's radiation medicine community: medical physics courses, radiotherapy learning, expert-led events, podcasts and professional connections.";
