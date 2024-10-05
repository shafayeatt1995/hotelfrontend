<template>
  <div>
    <div class="bg-indigo-50 fixed inset-0 -z-10"></div>
    <div class="container mx-auto">
      <div
        class="h-dvh -mt-28 flex justify-center items-center"
        v-show="showSelectMessage"
      >
        <div class="text-center">
          <div class="relative w-[550px] mt-12" ref="booking"></div>

          <p class="font-medium text-2xl">Please select a hotel room first</p>
          <div class="flex items-center justify-center mt-6 gap-x-3">
            <Button @click.native.prevent="goBack" variant="transparent">
              <i class="fas fa-arrow-left-long"></i>
              <span>Go back</span>
            </Button>

            <Button :to="{ name: 'index' }"> Take me home </Button>
          </div>
        </div>
      </div>
      <div
        class="flex my-12 gap-5 flex-col-reverse lg:flex-row"
        v-if="!showSelectMessage"
      >
        <div class="flex-1 text-gray-800 px-2">
          <div class="bg-white shadow-md rounded-lg md:p-5 p-2">
            <h1 class="font-black md:text-4xl text-3xl">Review your booking</h1>
            <hr class="mt-2" />
            <div>
              <h2 class="mt-3 text-2xl font-bold">Guest details</h2>
              <div class="grid md:grid-cols-2 grid-cols-1 gap-x-5 mt-1">
                <Input
                  v-for="(field, i) in guestInputFields"
                  :key="i"
                  :field="field"
                  v-model="guest"
                  :errors="errors"
                  class="w-full"
                />
              </div>
            </div>
            <hr class="mt-2" />

            <div>
              <h2 class="mt-3 text-2xl font-bold">Contact details</h2>
              <p class="text-sm mb-2">
                Please enter the contact details for the person who should
                receive the confirmation and be contacted if required.
              </p>
              <div class="grid md:grid-cols-2 grid-cols-1 gap-x-5">
                <Input
                  v-for="(field, i) in contactInputFields"
                  :key="i"
                  :field="field"
                  v-model="contact"
                  :errors="errors"
                  class="w-full"
                />
              </div>
            </div>
          </div>
          <div class="bg-white shadow-md rounded-lg p-5 my-5">
            <span
              class="underline cursor-pointer"
              @click="showCoupon = !showCoupon"
            >
              Have a coupon ?
            </span>
            <slide-up-down :active="showCoupon" :duration="300">
              <div class="flex gap-5 pt-3">
                <Input
                  v-for="(field, i) in inputFields"
                  :key="i"
                  :field="field"
                  v-model="form"
                  :errors="errors"
                  class="w-full"
                />
                <Button class="mb-3">Apply</Button>
              </div>
            </slide-up-down>
          </div>
          <div class="bg-white shadow-md rounded-lg px-5 pb-5 pt-1 my-5">
            <h2 class="mt-3 text-2xl font-bold">Select a payment method</h2>
            <div class="flex flex-wrap items-center gap-5 mt-3">
              <div
                class="border-2 px-3 py-2 rounded-xl flex items-center justify-between gap-4 cursor-pointer"
                :class="
                  selectPayment === 'bkash'
                    ? 'border-indigo-600 bg-indigo-50'
                    : 'border-gray-300'
                "
                @click="selectPayment = 'bkash'"
              >
                <nuxt-img
                  src="/images/payment/bkash.webp"
                  alt="bkash image"
                  class="h-16"
                  format="webp"
                  loading="lazy"
                  decode="async"
                />
              </div>
              <p>Other payment systems will added soon</p>
            </div>
            <small
              class="text-rose-700"
              v-if="
                errors &&
                errors.selectPayment &&
                typeof errors.selectPayment === 'object'
              "
            >
              <i>{{ errors.selectPayment.msg }}</i>
            </small>
          </div>
          <Button
            class="w-full"
            @click.native.prevent="confirmBooking"
            :loading="paymentLoading"
            >Confirm Booking</Button
          >
        </div>
        <div class="lg:w-[400px] px-2 md:px-0">
          <div
            class="w-full bg-white shadow-lg border border-gray-300 rounded-xl sticky top-24 max-h-[calc(100vh_-_120px)] overflow-y-auto md:p-4 p-2 text-gray-800"
          >
            <div>
              <div class="flex gap-3 md:items-start items-center">
                <nuxt-img
                  v-if="hotel?.image"
                  :src="hotel?.image"
                  :alt="hotel?.name"
                  height="112"
                  width="112"
                  class="size-28 rounded-lg"
                  format="webp"
                  loading="lazy"
                  decode="async"
                />
                <div class="flex-1">
                  <p class="font-semibold text-xl">{{ hotel.name }}</p>
                  <p class="text-sm">{{ hotel.address }}</p>
                </div>
              </div>
              <hr class="mt-2" />
              <div class="mb-2 mt-1">
                <p class="font-semibold text-lg">Booking summary</p>
                <div
                  class="grid grid-cols-3 gap-[1px] border border-gray-300 bg-gray-300"
                >
                  <div class="bg-white px-2 py-1">
                    <p class="text-sm text-gray-700">Check-in</p>
                    <p>{{ form.checkIn | fullDate }}</p>
                  </div>
                  <div class="bg-white px-2 py-1">
                    <p class="text-sm text-gray-700">Check-out</p>
                    <p>{{ form.checkOut | fullDate }}</p>
                  </div>
                  <div
                    class="flex items-center justify-center bg-white px-2 py-1 row-span-2"
                  >
                    <p>{{ nightCount }} Night{{ nightCount > 1 ? "s" : "" }}</p>
                  </div>
                  <div class="bg-white px-2 py-1">
                    <p class="text-sm text-gray-700">Adult</p>
                    <p>{{ form.adult }}</p>
                  </div>
                  <div class="bg-white px-2 py-1">
                    <p class="text-sm text-gray-700">child</p>
                    <p>{{ form.child }}</p>
                  </div>
                </div>
              </div>
              <hr class="mt-2" />
              <div class="mb-2 mt-1">
                <p class="font-semibold text-lg">Room details</p>
                <div
                  class="flex justify-between"
                  v-for="(selectRoom, key) in form.selectedRooms"
                  :key="`selectRoom-${key}`"
                >
                  <p class="text-gray-700">{{ selectRoom.name }}</p>
                  <p>{{ selectRoom.roomCount }}x</p>
                </div>
              </div>
              <hr />
              <div>
                <div class="flex justify-between">
                  <p>Room price</p>
                  <p>
                    {{ $taka }}{{ totalAmount.totalDiscountPrice | currency }}
                  </p>
                </div>
                <div class="flex justify-between">
                  <p>Discount</p>
                  <p>-{{ $taka }}{{ totalAmount.totalDiscount | currency }}</p>
                </div>
                <div class="flex justify-between">
                  <p>Tax</p>
                  <p>
                    +{{ $taka }}{{ (totalAmount.totalTax || 0) | currency }}
                  </p>
                </div>
                <hr />
                <div class="flex justify-between font-semibold">
                  <p>Total payable</p>
                  <p>{{ $taka }}{{ totalAmount.totalPayable | currency }}</p>
                </div>
              </div>
              <p class="my-2 text-center text-xs">
                You have selected {{ roomCount }} room{{
                  roomCount > 1 ? "s" : ""
                }}
                for {{ nightCount }} night{{ nightCount > 1 ? "s" : "" }} for
                {{ form.adult }} guest{{ form.adult > 1 ? "s" : "" }} &
                {{ form.child }} {{ form.child > 1 ? "children" : "child" }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  addDate,
  addMinutesToDate,
  dateDifferent,
  encode,
  endDate,
  getItem,
  initLottie,
  removeItem,
  setItem,
  startDate,
} from "@/utils";

export default {
  name: "BookingPage",
  auth: false,
  data() {
    return {
      paymentLoading: false,
      showSelectMessage: false,
      showCoupon: false,
      selectPayment: "bkash",
      coupon: { code: "" },
      guest: {},
      contact: { guestName: "", number: "", address: "", note: "" },
      form: {
        checkIn: addDate(2),
        checkOut: addDate(4),
        adult: 2,
        child: 0,
        selectedRooms: [],
      },
      hotel: { name: "", image: "", address: "" },
      errors: {},
    };
  },
  computed: {
    guestInputFields() {
      return [...Array(+this.form.adult)].map((val, _) => ({
        type: "text",
        placeholder: `Name of guest ${_ + 1} `,
        name: `guestName${_ + 1}`,
        label: `Name of guest ${_ + 1} `,
      }));
    },
    inputFields() {
      return [{ type: "text", placeholder: "Coupon code", name: "code" }];
    },
    contactInputFields() {
      return [
        {
          type: "select",
          placeholder: "Select primary Guest",
          name: "guestName",
          label: "Select primary Guest",
          options: this.guests.map((value) => ({
            value,
            label: value,
          })),
        },
        {
          type: "text",
          placeholder: "Primary guest active number",
          name: "number",
          label: "Primary guest active number",
        },
        {
          type: "text",
          placeholder: "Primary guest address",
          name: "address",
          label: "Primary guest address",
        },
        {
          type: "textarea",
          placeholder: "Leave a note (optional)",
          name: "note",
          label: "Leave a note (optional)",
          textarea: { rows: 3 },
        },
      ];
    },
    guests() {
      return Object.values(this.guest ?? {}).filter(
        (val) => (val && val.length) ?? false
      );
    },
    nightCount() {
      return dateDifferent(this.form.checkIn, this.form.checkOut);
    },
    totalAmount() {
      const totals = this.form.selectedRooms.reduce(
        (acc, room) => {
          const { price, discount, tax, roomCount } = room;
          const totalPrice = price * roomCount * this.nightCount;
          const totalDiscount = discount * roomCount * this.nightCount;
          const totalDiscountPrice = totalPrice + totalDiscount;
          const totalTax = Math.round((totalPrice * (tax || 0)) / 100);
          const totalPricePerNight = totalPrice / this.nightCount;
          const totalPayable = totalPrice + totalTax;

          acc.totalPrice += Math.round(totalPrice);
          acc.totalDiscountPrice += Math.round(totalDiscountPrice);
          acc.totalDiscount += Math.round(totalDiscount);
          acc.totalTax += Math.round(totalTax);
          acc.totalPricePerNight += Math.round(totalPricePerNight);
          acc.totalPayable += Math.round(totalPayable);
          return acc;
        },
        {
          totalPrice: 0,
          totalDiscountPrice: 0,
          totalDiscount: 0,
          totalTax: 0,
          totalPricePerNight: 0,
          totalPayable: 0,
        }
      );

      return totals;
    },
    roomCount() {
      return this.form.selectedRooms.reduce((t, val) => t + val.roomCount, 0);
    },
  },
  watch: {
    showSelectMessage(val) {
      val ? removeItem("bookingDetails") : "";
    },
  },
  async mounted() {
    this.setData();
    if (this.showSelectMessage) {
      initLottie(this.$refs.booking, "/lottie/empty.json");
    }
  },
  methods: {
    setData() {
      const bookingDetails = getItem("bookingDetails");
      if (bookingDetails) {
        const {
          checkIn,
          checkOut,
          adult,
          child,
          selectedRooms,
          hotel,
          expTime,
        } = JSON.parse(bookingDetails);
        if (new Date(expTime) > new Date()) {
          this.updateBookingDetails();
          if (
            startDate(checkIn) >= startDate() &&
            startDate(checkOut) > startDate(checkIn)
          ) {
            this.form = { checkIn, checkOut, adult, child, selectedRooms };
          }

          if (hotel) this.hotel = hotel;
          this.setGuest();
        } else {
          this.showSelectMessage = true;
        }
      } else {
        this.showSelectMessage = true;
      }
    },
    setGuest() {
      if (!this.$auth.loggedIn) {
        this.$nuxt.$emit("signInPopup");
      }

      const guest = {};
      Array.from({ length: this.form.adult }).map((_, i) => {
        guest[`guestName${i + 1}`] =
          i === 0 ? this.$auth?.user?.name ?? "" : "";
      });

      this.guest = guest;
    },
    confirmBooking() {
      if (this.$auth.loggedIn) {
        this.errors = {};
        const errors = {};
        const guest = Object.values(this.guest ?? {});
        const emptyIndex = guest
          .map((item, index) => (item === "" ? index : -1))
          .filter((index) => index !== -1);
        if (emptyIndex.length) {
          emptyIndex.forEach(
            (_) =>
              (errors[`guestName${_ + 1}`] = { msg: "Guest name required" })
          );
        }
        if (
          !this.contact.guestName ||
          !guest.includes(this.contact.guestName)
        ) {
          errors[`guestName`] = { msg: "Please select a guest" };
        }
        if (!this.contact.number) {
          errors[`number`] = { msg: "Contact number required" };
        }
        if (!this.contact.address) {
          errors[`address`] = { msg: "Contact address required" };
        }
        if (!this.selectPayment) {
          errors[`selectPayment`] = { msg: "Please select a payment methods" };
        }
        if (Object.values(errors).length) {
          this.errors = errors;
        } else {
          this.processPayment();
        }
      } else {
        this.$nuxt.$emit("signInPopup");
      }
    },
    async processPayment() {
      try {
        this.paymentLoading = true;
        const checkIn = endDate(this.form.checkIn);
        const checkOut = endDate(this.form.checkOut);

        const guestNames = Object.values(this.guest ?? {});
        const rooms = this.form.selectedRooms.map(
          ({
            _id: roomTypeID,
            name,
            roomCount: quantity,
            price,
            discount,
            tax,
          }) => ({
            roomTypeID,
            name,
            quantity,
            price,
            discount,
            tax,
          })
        );

        const body = {
          hotelID: this.hotel._id,
          adult: this.form.adult,
          child: this.form.child,
          checkIn,
          checkOut,
          contactName: this.contact.guestName,
          contactNumber: this.contact.number,
          contactAddress: this.contact.address,
          contactNote: this.contact.note,
          guestNames,
          paymentMethod: this.selectPayment,
          totalRoomPrice: this.totalAmount.totalDiscountPrice,
          totalDiscount: this.totalAmount.totalDiscount,
          totalTax: this.totalAmount.totalTax,
          totalPayable: this.totalAmount.totalPayable,
          rooms,
          today: endDate(),
        };
        const data = await this.$userApi.bookingInitiate(body);
        if (this.selectPayment === "bkash") {
          setItem("bkashPaymentID", encode(data.paymentID));
          window.open(data.bkashURL, "_self");
        }
      } catch (error) {
        console.error("Error occurred:", error);
        this.$nuxt.$emit(
          "error",
          error.response?.data?.message || "Something wrong please try again"
        );
      } finally {
        this.paymentLoading = false;
      }
    },
    goBack() {
      history.back();
    },
    updateBookingDetails() {
      const bookingDetails = getItem("bookingDetails");
      if (bookingDetails) {
        const stringify = {
          ...JSON.parse(bookingDetails),
          expTime: addMinutesToDate(),
        };
        setItem("bookingDetails", JSON.stringify(stringify));
      }
    },
  },
};
</script>
