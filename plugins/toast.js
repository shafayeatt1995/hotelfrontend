import "vue-toastification/dist/index.css";

export default async ({ app }) => {
  if (process.client) {
    const Vue = (await import("vue")).default;
    const Toast = (await import("vue-toastification")).default;

    const options = {
      transition: "Vue-Toastification__bounce",
      maxToasts: 10,
      newestOnTop: true,
      position: "bottom-center",
      timeout: 3000,
      closeOnClick: true,
      pauseOnFocusLoss: true,
      pauseOnHover: true,
      draggable: true,
      draggablePercent: 0.6,
      showCloseButtonOnHover: false,
      hideProgressBar: true,
      closeButton: "button",
      icon: true,
      rtl: false,
    };

    Vue.use(Toast, options);
  }
};
