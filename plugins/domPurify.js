import Vue from "vue";
import DOMPurify from "dompurify";

Vue.directive("safe", {
  bind(el, binding) {
    el.innerHTML = DOMPurify.sanitize(
      removeBangladeshiPhoneNumbers(binding.value)
    );
  },
  update(el, binding) {
    el.innerHTML = DOMPurify.sanitize(
      removeBangladeshiPhoneNumbers(binding.value)
    );
  },
});

function removeBangladeshiPhoneNumbers(content) {
  if (typeof content !== "string") {
    return "";
  }
  const bangladeshiPhoneRegex =
    /(\+880[\s-]*1[\s-]*\d{2}[\s-]*\d{6})|(01[\s-]*\d{2}[\s-]*\d{6})|(\+8801[\s-]*\d{2}[\s-]*\d{6})|(0[\s-]*1[\s-]*\d{2}[\s-]*\d{6})/g;
  return content.replace(bangladeshiPhoneRegex, "");
}
