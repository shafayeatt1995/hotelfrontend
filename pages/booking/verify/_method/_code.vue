<template>
  <div class="container mx-auto">
    <div class="h-[calc(100vh_-_250px)] flex justify-center items-center">
      <div class="text-center">
        <div class="relative w-[550px] mt-12" ref="verify"></div>
        <p class="font-medium text-2xl">
          Don't close the browser! We are verifying your payment
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { decode, getItem, initLottie } from "@/utils";

export default {
  name: "BookingVerifyPage",
  data() {
    return { errorMessage: "" };
  },
  async mounted() {
    this.verifyPayment();
    initLottie(this.$refs.verify, "/lottie/social-login.json");
  },
  methods: {
    async verifyPayment() {
      try {
        const { query, params } = this.$route;
        const { code, method } = params;
        if (method === "bkash") {
          const transactionNumber = decode(getItem("bkashPaymentID"));
          if (transactionNumber === query.paymentID) {
            const { _id, otp, id_token } = JSON.parse(decode(code));
            const body = { _id, otp, id_token, method, transactionNumber };
            await this.$userApi.bookingVerify(body);
            this.redirect(_id);
          } else {
            this.errorMessage = `Payment id isn't matched`;
          }
        }
      } catch (err) {
        if (method === "bkash") {
          const { code } = params;
          const { _id } = JSON.parse(decode(code));
          this.redirect(_id);
        } else {
          this.errorMessage = `Payment id isn't matched`;
        }
      }
    },
    redirect(id) {
      this.$router.push({
        name: "booking-details-id",
        params: { id },
      });
    },
  },
};
</script>
