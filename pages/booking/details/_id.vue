<template>
  <div class="container mx-auto text-gray-700 mb-10">
    <div class=" " v-if="loading"></div>
    <template v-else>
      <div class="pt-10" v-if="booking && !notFound">
        <div class="text-center">
          <i class="md:text-9xl text-8xl" :class="paymentStatusIcon"></i>
        </div>
        <h1
          class="md:text-5xl text-2xl font-black text-gray-800 text-center mt-5"
        >
          <template v-if="booking.status === 'complete'">
            🎊 Congratulations! 🎊
          </template>
          <template v-else-if="booking.status === 'pending'">
            😔 Pending for payment 😔
          </template>
          <template v-else-if="booking.status === 'refund'">
            💸 Booking amount refunded 💸
          </template>
          <template v-else> 🥺 Payment failed! 🥺 </template>
        </h1>
        <p
          class="text-center mt-2 md:text-xl text-indigo-600"
          v-if="booking.status === 'complete'"
        >
          Your room has been booked at
          <span class="font-semibold"
            >"{{ booking.hotel.name }}, {{ booking.locationName }}"</span
          >
        </p>
        <div class="xl:mx-28">
          <div
            class="grid md:grid-cols-2 gap-[1px] mt-5 bg-gray-300 border border-gray-300 mx-2 md:mx-0"
          >
            <div
              class="flex justify-between items-center bg-white px-5 py-3 gap-3"
              v-for="(
                { icon, title, value, values, date, amount, status }, key
              ) in bookingDetails"
              :key="key"
            >
              <p class="flex items-center gap-1">
                <i :class="icon"></i> {{ title }}:
              </p>
              <p class="font-semibold text-gray-800 break-all" v-if="value">
                {{ value }}
              </p>
              <p class="font-semibold text-gray-800" v-else-if="amount">
                {{ $taka }}{{ amount | currency }}
              </p>
              <p class="font-semibold text-gray-800" v-else-if="date">
                {{ date | fullDate }}
              </p>
              <p class="font-semibold text-gray-800" v-else-if="status">
                <Badge :variant="statusVariant(status)">
                  {{ status }}
                </Badge>
              </p>
              <template v-else-if="values">
                <div
                  class="flex flex-col justify-center font-semibold text-gray-800"
                >
                  <p v-for="(val, key) in values" :key="`${key}-val`">
                    {{ ++key }}. {{ val }}
                  </p>
                </div>
              </template>
            </div>
          </div>
          <div class="flex md:justify-end justify-center mt-5 gap-4">
            <Button :to="{ name: 'profile-booking' }">See all bookings</Button>
            <Button
              @click.native.prevent="downloadInvoice"
              :loading="downloadLoading"
              ><i class="fa-solid fa-download"></i> Download Invoice</Button
            >
          </div>
        </div>
      </div>
      <div
        class="h-[calc(100vh_-_200px)] flex flex-col justify-center items-center"
        v-else
      >
        <div class="text-center">
          <i class="fa-regular fa-circle-xmark text-9xl text-indigo-600"></i>
        </div>
        <h1 class="text-5xl font-black text-gray-800 text-center mt-5">
          😔 Not found! 😔
        </h1>
        <p class="text-center mt-2 text-xl text-indigo-600">
          We were unable to find your booking
        </p>
        <GoBackHome class="mt-6" />
      </div>
    </template>
  </div>
</template>

<script>
import { dateDifferent } from "@/utils";

export default {
  name: "BookingDetailsPage",
  data() {
    return {
      loading: true,
      downloadLoading: false,
      booking: {},
      notFound: false,
    };
  },
  computed: {
    nightCount() {
      return dateDifferent(this.booking.checkIn, this.booking.checkOut);
    },
    bookingDetails() {
      return [
        {
          icon: "fas fa-file-lines",
          title: "Booking ID",
          value: `#${this.booking.bookingNumber}`,
        },
        {
          icon: "fas fa-file-lines",
          title: "Booking date",
          date: this.booking.created_at,
        },
        {
          icon: "fas fa-calendar-days",
          title: "Check in",
          date: this.booking.checkIn,
        },
        {
          icon: "fas fa-calendar-days",
          title: "Check out",
          date: this.booking.checkOut,
        },
        {
          icon: "fas fa-users",
          title: "Guest & child",
          value: `${this.booking.adult} guest & ${this.booking.child} child`,
        },
        {
          icon: "fas fa-table-cells",
          title: "Total booked rooms",
          value: this.booking.rooms.reduce((t, val) => t + val.quantity, 0),
        },
        {
          icon: "fas fa-users",
          title: "All gests names",
          values: this.booking.guestNames,
        },
        {
          icon: "fas fa-users",
          title: "Rooms name",
          values: this.booking.rooms.map(({ name }) => name),
        },
        {
          icon: "fas fa-address-card",
          title: "Primary guest",
          value: this.booking.contactName,
        },
        {
          icon: "fas fa-address-card",
          title: "Primary guest phone",
          value: this.booking.contactNumber,
        },
        {
          icon: "fas fa-address-card",
          title: "Primary guest address",
          value: this.booking.contactAddress,
        },
        {
          icon: "fas fa-bed",
          title: "Night stay",
          value: `${this.nightCount} night${this.nightCount > 1 ? "s" : ""}`,
        },
        {
          icon: "fas fa-money-check-dollar",
          title: "Payment method",
          value: this.booking.paymentMethod,
        },
        {
          icon: "fas fa-money-check-dollar",
          title: "Transaction number",
          value: this.booking.transactionNumber,
        },
        {
          icon: "fas fa-bangladeshi-taka-sign",
          title: "Total payable",
          amount: this.booking.totalPayable,
        },
        {
          icon: "fas fa-file-invoice-dollar",
          title: "Payment status",
          status: this.booking.status,
        },
      ];
    },
    paymentStatusIcon() {
      if (this.booking.status === "complete") {
        return "far fa-circle-check text-green-500";
      } else if (this.booking.status === "pending") {
        return "far fa-clock text-amber-600";
      } else if (this.booking.status === "refund") {
        return "far fa-money-bill-1 text-pink-600";
      } else {
        return "far fa-circle-xmark text-red-600";
      }
    },
  },
  mounted() {
    this.fetchBookingDetails();
  },
  methods: {
    async fetchBookingDetails() {
      try {
        this.loading = true;
        const { id } = this.$route.params;
        const { booking } = await this.$userApi.fetchBookingDetails({ id });
        this.booking = booking;
      } catch (error) {
        this.notFound = true;
      } finally {
        this.loading = false;
      }
    },
    statusVariant(status) {
      if (status === "pending") {
        return "solidAmber";
      } else if (status === "complete") {
        return "solidGreen";
      } else if (status === "cancel") {
        return "solidRed";
      } else if (status === "refund") {
        return "solidPink";
      }
    },
    async downloadInvoice() {
      try {
        this.downloadLoading = true;
        const invoiceBlob = await this.$axios.$post(
          "/api/user/invoice",
          { _id: this.booking._id },
          { responseType: "blob" }
        );
        if (invoiceBlob) {
          const url = window.URL.createObjectURL(new Blob([invoiceBlob]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "Booking-invoice.pdf");
          document.body.appendChild(link);
          link.click();
          link.remove();
        }
      } catch (error) {
      } finally {
        this.downloadLoading = false;
      }
    },
  },
};
</script>
