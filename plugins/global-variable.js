import Vue from "vue";
import { mapGetters } from "vuex";

const globalVal = {
  install(Vue) {
    Vue.mixin({
      computed: {
        ...mapGetters({ $pageTitle: "pageTitle" }),
        $taka: () => "৳",
      },
    });
  },
};

Vue.use(globalVal);
