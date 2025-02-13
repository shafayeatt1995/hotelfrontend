<template>
  <div class="border border-gray-300 rounded-xl text-gray-700">
    <div
      class="flex items-center justify-between gap-4 md:p-4 p-2 flex-col md:flex-row"
    >
      <div class="flex w-full md:items-center gap-4 flex-col md:flex-row">
        <div class="flex justify-center">
          <p
            class="size-16 rounded-full bg-indigo-50 text-indigo-600 flex justify-center items-center text-2xl"
          >
            <i class="fa-solid fa-hotel"></i>
          </p>
        </div>
        <div>
          <nuxt-link
            :to="{ name: 'hotel-slug', params: { slug: booking.hotel.slug } }"
            class="text-xl font-bold leading-5 text-indigo-600 transition-all duration-200"
          >
            {{ booking.hotel.name }}
            <span class="text-base font-normal block md:inline-block"
              >({{ booking?.locationName }})</span
            >
          </nuxt-link>
          <p v-for="(room, i) in booking?.rooms" :key="i" class="">
            {{ room.name }} <span class="mx-1">X</span>
            <span>{{ room.quantity }}</span>
          </p>
          <p class="text-sm mt-3">
            Booking ID:
            <span class="font-semibold">#{{ booking?.bookingNumber }}</span>
          </p>
          <p class="text-sm">
            Booking Time:
            <span class="font-semibold">{{
              booking?.created_at | fullDate("/")
            }}</span>
          </p>
        </div>
      </div>
      <div class="flex flex-col min-w-48 gap-2">
        <Button
          variant="lightIndigo"
          @click.native.prevent="makePayment"
          v-if="booking?.status === 'pending' && checkPaymentDate"
        >
          <i class="fa-solid fa-bangladeshi-taka-sign"></i> Make payment
        </Button>
        <Button
          variant="lightIndigo"
          :to="{ name: 'booking-details-id', params: { id: booking?._id } }"
        >
          <i class="fa-regular fa-file-lines"></i>
          See booking details
        </Button>
        <Button
          variant="lightIndigo"
          @click.native.prevent="modal = true"
          v-if="booking?.status === 'complete' && checkDate && !bookingReview"
        >
          <i class="far fa-star"></i>
          Submit a review
        </Button>
        <p class="text-center text-sm mt-1">
          Payment status:
          <span class="font-semibold capitalize" :class="paymentClass">{{
            booking?.status
          }}</span>
        </p>
      </div>
    </div>
    <hr class="border-gray-300" />
    <div class="grid md:grid-cols-4 grid-cols-2 md:p-4 p-2 gap-x-1 gap-y-2">
      <div>
        <p>Check in & out:</p>
        <div class="font-semibold text-gray-800 xl:text-base lg:text-sm">
          <p>
            <i class="fa-solid fa-person-walking-luggage"></i>
            <span class="mx-1"> - </span>
            {{ booking?.checkIn | fullDate("/") }}
          </p>
          <p>
            <i
              class="fa-solid fa-person-walking-luggage transform scale-x-[-1]"
            ></i>
            <span class="mx-1"> - </span>
            {{ booking?.checkOut | fullDate("/") }}
          </p>
        </div>
      </div>
      <div>
        <p>Contact information:</p>
        <div class="font-semibold text-gray-800 xl:text-base lg:text-sm">
          <p>
            {{ booking?.contactName }}
          </p>
          <p>
            {{ booking?.contactNumber }}
          </p>
        </div>
      </div>
      <div>
        <p>Booked for:</p>
        <p class="font-semibold text-gray-800 xl:text-base lg:text-sm">
          {{ roomCount }} Room{{ roomCount > 1 ? "s" : "" }} for
          {{ nightCount }} Night{{ nightCount > 1 ? "s" : "" }}
          <br />
          {{ booking?.adult }} Guest{{ booking?.adult > 1 ? "s" : "" }} &
          {{ booking?.child }} {{ booking?.child > 1 ? "Children" : "Child" }}
        </p>
      </div>
      <div>
        <p>Payment Amount:</p>
        <div class="font-semibold text-gray-800 xl:text-base lg:text-sm">
          <p>
            {{ $taka }}{{ booking?.totalPayable | currency }}
            <span class="text-xs text-gray-600" v-if="booking?.totalTax > 0">
              (Tax included)
            </span>
          </p>
          <p class="capitalize">{{ booking?.paymentMethod }}</p>
        </div>
      </div>
    </div>
    <template v-if="bookingReview">
      <hr class="border-gray-300" />
      <div class="grid md:grid-cols-2 gap-4 p-4">
        <div class="grid grid-cols-2 gap-y-4">
          <Rating
            basic
            :rating="bookingReview.bedRoom"
            label="Room condition"
          />
          <Rating
            basic
            :rating="bookingReview.washroom"
            label="Washrooms & Toilets"
          />
          <Rating basic :rating="bookingReview.staff" label="Staff behavior" />
          <Rating
            basic
            :rating="bookingReview.facility"
            label="Overall facilities"
          />
          <Rating basic :rating="bookingReview.location" label="Location" />
          <Rating
            basic
            :rating="bookingReview.valueForMoney"
            label="Value for money"
          />
        </div>
        <div>
          <div class="flex items-center gap-2 mb-3">
            Overall Rating:
            <Rating :rating="bookingReview.rating" basic mode="badge" />
          </div>
          <p>Review Message:</p>
          <div class="font-semibold text-gray-800">
            <p>
              {{ bookingReview.message }}
            </p>
          </div>
        </div>
      </div>
    </template>
    <Modal v-model="modal" size="fixed">
      <template #title>
        <div class="flex justify-between items-center">
          <h1 class="text-3xl font-bold leading-6 text-gray-700 capitalize">
            Submit your review
          </h1>
          <CloseButton @click.native.prevent="modal = false" />
        </div>
      </template>
      <template #body>
        <form @submit.prevent="postReview">
          <div class="font-semibold mb-2">
            {{ booking.hotel?.name }}
            <span class="px-2">|</span>
            <span>
              <i class="fa-solid fa-person-walking-luggage"></i>
              <span> - </span>
              {{ booking?.checkIn | fullDate("/") }}
            </span>
            <span class="px-2">|</span>
            <span>
              <i
                class="fa-solid fa-person-walking-luggage transform scale-x-[-1]"
              ></i>
              <span> - </span>
              {{ booking?.checkOut | fullDate("/") }}
            </span>
          </div>
          <hr class="my-2" />
          <div class="grid grid-cols-2">
            <Input
              v-for="(field, i) in inputFields"
              :key="i"
              :field="field"
              v-model="review"
              :errors="errors"
            />
          </div>
          <div class="flex justify-end">
            <Button variant="indigo" type="submit"
              >Post review <i class="fa-solid fa-arrow-right-long"></i
            ></Button>
          </div>
        </form>
      </template>
    </Modal>
  </div>
</template>

<script>
import { dateDifferent, encode, endDate, setItem } from "@/utils";
export default {
  name: "ProfileBooking",
  props: { booking: Object },
  data() {
    return {
      modal: false,
      review: {
        bookingID: this.booking._id,
        hotelID: this.booking.hotelID,
        roomID: this.booking?.rooms[0]?.roomTypeID,
        staff: 0,
        facility: 0,
        location: 0,
        valueForMoney: 0,
        bedRoom: 0,
        washroom: 0,
        message: "",
      },
      errors: {},
    };
  },
  computed: {
    roomCount() {
      return this.booking?.rooms.reduce((t, val) => t + val.quantity, 0);
    },
    nightCount() {
      return dateDifferent(this.booking?.checkIn, this.booking?.checkOut);
    },
    paymentClass() {
      if (this.booking.status === "pending") {
        return "text-amber-600";
      } else if (this.booking.status === "complete") {
        return "text-green-600";
      } else if (this.booking.status === "refund") {
        return "text-pink-600";
      } else {
        return "text-red-600";
      }
    },
    inputFields() {
      return [
        {
          type: "star",
          name: "bedRoom",
          label: "Room condition",
        },
        {
          type: "star",
          name: "washroom",
          label: "Washrooms & Toilets",
        },
        {
          type: "star",
          name: "staff",
          label: "Staff behavior",
        },
        {
          type: "star",
          name: "facility",
          label: "Overall facilities",
        },
        {
          type: "star",
          name: "location",
          label: "Location",
        },
        {
          type: "star",
          name: "valueForMoney",
          label: "Value for money",
        },
        {
          type: "textarea",
          placeholder: "Type your message",
          name: "message",
          label: "Review message",
          textarea: { rows: 5, characterLimit: 350 },
          span: "full",
        },
      ];
    },
    checkDate() {
      return endDate() > endDate(this.booking.checkOut);
    },
    checkPaymentDate() {
      return endDate() < endDate(this.booking.checkIn);
    },
    bookingReview() {
      return this.booking?.review[0] ?? false;
    },
  },
  watch: {
    modal(val) {
      !val ? this.reset() : "";
    },
  },
  methods: {
    async makePayment() {
      try {
        const { _id } = this.booking;
        const { paymentID, bkashURL } = await this.$userApi.makePayment({
          _id,
        });
        setItem("bkashPaymentID", encode(paymentID));
        window.open(bkashURL, "_self");
      } catch (error) {}
    },
    async postReview() {
      try {
        await this.$userApi.submitReview(this.review);
        this.modal = false;
        this.$emit("refetch");
        this.$nuxt.$emit("success", "Review submit successfully");
      } catch (error) {
        this.errors = error?.response?.data?.errors;
      }
    },
    reset() {
      this.review = {
        bookingID: this.booking._id,
        hotelID: this.booking.hotelID,
        roomID: this.booking?.rooms[0]?.roomTypeID,
        staff: 0,
        facility: 0,
        location: 0,
        valueForMoney: 0,
        bedRoom: 0,
        washroom: 0,
        message: "",
      };
    },
  },
};
</script>
