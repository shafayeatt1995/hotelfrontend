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
  }

  window.addEventListener("load", loadScript);
}
