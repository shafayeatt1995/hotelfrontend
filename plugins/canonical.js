import Vue from "vue";

const stripWww = (host = "") => host.replace(/^www\./i, "");

const getServerOrigin = (req) => {
  const forwardedProto = req?.headers?.["x-forwarded-proto"];
  const protocol = (Array.isArray(forwardedProto) ? forwardedProto[0] : forwardedProto || "https").split(",")[0].trim();
  const host = (req?.headers?.host || "").split(",")[0].trim();

  if (!host) return "";
  return `${protocol}://${stripWww(host)}`;
};

const getClientOrigin = () => {
  if (typeof window === "undefined") return "";

  const url = new URL(window.location.href);
  url.hostname = stripWww(url.hostname);
  return url.origin;
};

export default (context) => {
  const getCanonicalHref = (path = "/") => {
    const origin = process.server ? getServerOrigin(context.req) : getClientOrigin();
    const fallbackOrigin = (process.env.CANONICAL_ORIGIN || process.env.BASE_URL || "").replace(/\/+$/, "");
    const safeOrigin = (origin || fallbackOrigin).replace(/\/+$/, "");
    const normalizedPath = path || "/";

    if (!safeOrigin) return "";
    return `${safeOrigin}${normalizedPath}`;
  };

  Vue.mixin({
    head() {
      const href = getCanonicalHref(this?.$route?.path);
      if (!href) return {};

      return {
        link: [{ hid: "canonical", rel: "canonical", href }],
      };
    },
  });
};
