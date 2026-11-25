// Standalone adapter for the application system extracted from portal v2.2.1.
function applicationAssets(env) {
  return {
    async fetch(input, init) {
      const request = input instanceof Request ? input : new Request(input, init);
      const assetUrl = new URL(request.url);
      assetUrl.pathname = "/apply" + assetUrl.pathname;
      const get = (url) => env.ASSETS.fetch(new Request(url, {
        method: request.method === "HEAD" ? "HEAD" : "GET",
        headers: request.headers,
        redirect: "manual",
      }));
      let response = await get(assetUrl);
      for (let count = 0; count < 2 && response.status >= 300 && response.status < 400; count++) {
        const location = response.headers.get("Location");
        if (!location) break;
        const target = new URL(location, assetUrl);
        if (target.origin !== assetUrl.origin || !target.pathname.startsWith("/apply/")) break;
        response = await get(target);
      }
      return response;
    },
  };
}

const worker = {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname.startsWith("/api/ai/")) return fqaiRoute(request, env, url);
    if (url.pathname === "/__portal") {
      let site = String(env.SITE_URL || "").replace(/\/+$/, "");
      if (!site) {
        const host = url.hostname.toLowerCase();
        const domain = host.replace(/^apply\./, "");
        site = url.protocol + "//" + (domain === host || /pages\.dev$/.test(host) ? host : "www." + domain);
        if (url.port) site += ":" + url.port;
      }
      return Response.redirect(site + "/portal", 302);
    }
    return $t.fetch(request, {
      DB: env.APPLY_DB,
      ASSETS: applicationAssets(env),
      SETUP_KEY: env.APPLY_SETUP_KEY,
      PBKDF2_ITERATIONS: env.PBKDF2_ITERATIONS,
      SITE_URL: env.SITE_URL,
    });
  },
};
export default worker;
