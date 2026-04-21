import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { buildSitemapXml } from "./scripts/buildSitemapXml.mjs";

/** Serve `/sitemap.xml` during `vite dev` (same URL list as post-build `generate-seo.mjs`). */
function sitemapDevPlugin(siteUrlBase) {
  return {
    name: "sitemap-dev",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const pathOnly = req.url?.split("?")[0] ?? "";
        if (pathOnly !== "/sitemap.xml") {
          next();
          return;
        }
        try {
          const xml = await buildSitemapXml(siteUrlBase, { allowPartial: true });
          res.setHeader("Content-Type", "application/xml; charset=utf-8");
          res.end(xml);
        } catch (e) {
          console.error("[vite] sitemap.xml:", e);
          res.statusCode = 500;
          res.setHeader("Content-Type", "text/plain; charset=utf-8");
          res.end(e instanceof Error ? e.message : "Sitemap generation failed");
        }
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const sitemapBase =
    (env.VITE_SITE_URL && String(env.VITE_SITE_URL).trim().replace(/\/+$/, "")) ||
    "http://localhost:5173";

  return {
    plugins: [react(), tailwindcss(), sitemapDevPlugin(sitemapBase)],
  };
});
