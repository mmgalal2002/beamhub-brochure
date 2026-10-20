import assert from "node:assert/strict";
import test from "node:test";
import { resolveSiteUrl, siteDescription, siteTitle } from "../lib/seo.ts";

test("SEO defaults to the deployed brochure, never localhost or the official platform", () => {
  assert.equal(resolveSiteUrl(), "https://beambrochure.procare.expert/");
});

test("a deployment origin is normalized consistently for canonical and crawl URLs", () => {
  const origin = resolveSiteUrl("https://BROCHURE.example.com");
  assert.equal(origin, "https://brochure.example.com/");
  assert.equal(new URL("sitemap.xml", origin).href, "https://brochure.example.com/sitemap.xml");
  assert.equal(new URL("opengraph-image", origin).href, "https://brochure.example.com/opengraph-image");
});

test("invalid or non-public SEO origins fail explicitly instead of emitting broken metadata", () => {
  const invalidOrigins = [
    "",
    "not a URL",
    "http://brochure.example.com",
    "https://localhost",
    "https://preview.localhost",
    "https://127.0.0.1",
    "https://[::1]",
    "https://user:password@brochure.example.com",
    "https://brochure.example.com/another-page",
    "https://brochure.example.com/?preview=true",
    "https://brochure.example.com/#home",
  ];

  for (const origin of invalidOrigins) {
    assert.throws(() => resolveSiteUrl(origin), { name: /Error/ }, origin);
  }
});

test("search snippets describe BeamHub and its real subject clearly", () => {
  assert.match(siteTitle, /^BeamHub \| Radiation Medicine/);
  assert.ok(siteTitle.length <= 60);
  assert.match(siteDescription, /medical physics courses/);
  assert.match(siteDescription, /radiotherapy/);
  assert.ok(siteDescription.length <= 160);
});
