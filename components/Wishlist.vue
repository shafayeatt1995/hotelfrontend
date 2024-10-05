<template>
  <div @click="add">
    <slot>
      <Button :variant="variant ? 'indigo' : 'lightGray'" rounded>
        <i class="fa-heart" :class="variant ? 'fas' : 'far'"></i>
      </Button>
    </slot>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Wishlist",
  props: { hotelID: { type: String, default: "" } },
  computed: {
    ...mapGetters("wishlist", ["wishlists"]),
    variant() {
      return this.wishlists.some(({ hotelID }) => hotelID === this.hotelID);
    },
  },
  mounted() {
    this.fetchWishlistOnce();
  },
  methods: {
    ...mapActions("wishlist", [
      "toggleWishlist",
      "fetchWishlistOnce",
      "refetchWishlist",
    ]),
    async add() {
      try {
        if (this.$auth.loggedIn) {
          if (this.hotelID.length > 0) {
            await this.toggleWishlist(this.hotelID);
            await this.refetchWishlist();
          }
        } else {
          this.$nuxt.$emit("signInPopup");
        }
      } catch (error) {}
    },
  },
};
</script>
