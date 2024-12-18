export default function () {
  function loadScript() {
    // Load gtag
    const noscriptIframe = document.createElement("noscript");
    const iframe = document.createElement("iframe");
    iframe.setAttribute(
      "src",
      "https://www.googletagmanager.com/ns.html?id=GTM-5W4NDV2R"
    );
    iframe.setAttribute("height", "0");
    iframe.setAttribute("width", "0");
    iframe.setAttribute("style", "display:none;visibility:hidden");
    noscriptIframe.appendChild(iframe);
    document.body.appendChild(noscriptIframe);

    const script = document.createElement("script");
    script.setAttribute("async", "");
    script.setAttribute("custom-element", "amp-auto-ads");
    script.setAttribute(
      "src",
      "https://cdn.ampproject.org/v0/amp-auto-ads-0.1.js"
    );
    document.body.appendChild(script);

    const ampAutoAds = document.createElement("amp-auto-ads");
    ampAutoAds.setAttribute("type", "adsense");
    ampAutoAds.setAttribute("data-ad-client", "ca-pub-4198613489910321");
    document.body.appendChild(ampAutoAds, document.body.lastChild);
  }

  window.addEventListener("load", loadScript);
}
