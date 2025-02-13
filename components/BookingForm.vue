<template>
  <div
    class="w-full bg-white shadow-lg lg:border border-gray-300 rounded-xl relative"
  >
    <div
      class="flex justify-between items-center text-white lg:p-5 p-4 bg-indigo-600 text-2xl font-bold rounded-t-xl sticky top-0 z-10"
      @click="open"
    >
      <h2>
        Booking form
        <span v-if="roomCount">({{ roomCount }})</span>
      </h2>
      <i
        class="fas fa-chevron-down lg:hidden transition-all duration-300"
        :class="show ? 'rotate-0' : 'rotate-180'"
      ></i>
    </div>
    <div class="h-full overflow-y-auto">
      <div class="px-5 pb-1">
        <div class="flex flex-col divide-y divide-gray-200">
          <div class="flex items-center justify-between flex-1 py-3">
            <p class="font-bold text-gray-800 w-28">Check In</p>
            <ClientOnly>
              <DatePicker
                v-model="form.checkIn"
                type="date"
                placeholder="Select check in date"
                prefix-class="xmx"
                :disabled-date="disabledCheckInDate"
                format="DD MMM,YYYY"
                :clearable="false"
                class="flex-1"
              />
            </ClientOnly>
          </div>
          <div class="flex items-center justify-between flex-1 py-3">
            <p class="font-bold text-gray-800 w-28">Check Out</p>
            <ClientOnly>
              <DatePicker
                v-model="form.checkOut"
                type="date"
                placeholder="Select check out date"
                prefix-class="xmx"
                :disabled-date="disabledCheckOutDate"
                format="DD MMM,YYYY"
                :clearable="false"
                class="flex-1"
              />
            </ClientOnly>
          </div>
          <div class="flex items-center justify-between flex-1 py-3">
            <div>
              <p class="font-bold text-gray-800">Adults</p>
              <p class="text-xs text-gray-700">Ages 13 or above</p>
            </div>
            <Hstack v-model="form.adult" :min="1" />
          </div>
          <div class="flex items-center justify-between flex-1 py-3">
            <div>
              <p class="font-bold text-gray-800">Child</p>
              <p class="text-xs text-gray-700">Ages 13 below</p>
            </div>
            <Hstack v-model="form.child" />
          </div>
        </div>
      </div>
      <hr />
      <div class="px-5 py-3 text-gray-800" v-if="selectedRooms.length">
        <div class="text-center font-bold text-2xl">
          Selected room details
          <!-- for {{ nightCount }} night{{ nightCount > 1 ? "s" : "" }} -->
        </div>
        <div
          v-for="(room, key) in selectedRooms"
          :key="`room-${key}`"
          class="mt-3"
        >
          <div class="flex justify-between items-center font-semibold">
            <p class="flex-1">{{ room.name }}</p>
            <div class="grid grid-cols-2 justify-items-end items-center">
              <Hstack
                v-model="room.roomCount"
                :min="1"
                :max="room?.rooms?.length || 0"
                @minLimit="updateRoom"
              />
              <p>
                {{ $taka
                }}{{
                  ((room.price + room.discount) * room.roomCount * nightCount)
                    | currency
                }}
              </p>
            </div>
          </div>
        </div>
        <hr class="mt-1" />
        <div class="flex justify-between text-lg font-bold mb-1">
          <p>Sub total</p>
          <p>{{ $taka }}{{ totalAmount.totalDiscountPrice | currency }}</p>
        </div>
        <div class="flex justify-between font-semibold">
          <p>Discount</p>
          <p>- {{ $taka }}{{ totalAmount.totalDiscount | currency }}</p>
        </div>
        <div class="flex justify-between font-semibold">
          <p>Tax</p>
          <p>+ {{ $taka }}{{ (totalAmount.totalTax || 0) | currency }}</p>
        </div>
        <hr class="mt-1" />
        <div class="flex justify-between text-lg font-bold">
          <p>Total payable</p>
          <p>{{ $taka }}{{ totalAmount.totalPayable | currency }}</p>
        </div>
        <p class="mt-5 text-center text-sm">
          You have selected {{ roomCount }} room{{
            roomCount > 1 ? "s" : ""
          }}
          for {{ nightCount }} night{{ nightCount > 1 ? "s" : "" }} for
          {{ form.adult }} guest{{ form.adult > 1 ? "s" : "" }} &
          {{ form.child }} {{ form.child > 1 ? "children" : "child" }}
        </p>
        <Button class="w-full my-2" @click.native.prevent="booking"
          >Book your room</Button
        >
      </div>
      <div v-else class="text-center text-2xl font-bold py-5 text-gray-800">
        <i class="fa-solid fa-ban"></i>
        <h2>No room selected</h2>
      </div>
    </div>
  </div>
</template>

<script>
import {
  addDate,
  addMinutesToDate,
  compareDate,
  dateDifferent,
  endDate,
  setItem,
  startDate,
} from "@/utils";

export default {
  name: "BookingForm",
  props: {
    roomTypes: { type: Array, default: [] },
    selectedRooms: { type: Array, default: [] },
    hotel: Object,
  },
  data() {
    return {
      show: false,
    };
  },
  computed: {
    form: {
      get() {
        return this.$attrs.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
    nightCount() {
      return dateDifferent(this.form.checkIn, this.form.checkOut);
    },
    totalAmount() {
      const totals = this.selectedRooms.reduce(
        (acc, room) => {
          const { price, discount, tax, roomCount } = room;
          const totalPrice = price * roomCount * this.nightCount;
          const totalDiscount = discount * roomCount * this.nightCount;
          const totalDiscountPrice = totalPrice + totalDiscount;
          const totalTax = Math.round((totalPrice * (tax || 0)) / 100);
          const totalPricePerNight = totalPrice / this.nightCount;
          const totalPayable = totalPrice + totalTax;

          acc.totalPrice += totalPrice;
          acc.totalDiscountPrice += totalDiscountPrice;
          acc.totalDiscount += totalDiscount;
          acc.totalTax += totalTax;
          acc.totalPricePerNight += totalPricePerNight;
          acc.totalPayable += totalPayable;
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
      return this.selectedRooms.reduce((t, val) => t + val.roomCount, 0);
    },
  },
  watch: {
    "form.checkIn"(val) {
      if (endDate(val) >= endDate(this.form.checkOut))
        this.form.checkOut = addDate(1, val);
    },
    "form.checkOut"(val) {
      if (endDate(val) <= endDate(this.form.checkIn))
        this.form.checkIn = addDate(-1, val);
    },
  },
  methods: {
    disabledDate(date) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const maxDate = new Date();
      maxDate.setDate(today.getDate() + 180);
      maxDate.setHours(23, 59, 59, 999);

      return date < today || date > maxDate;
    },
    async aggregateRooms(rooms, roomIds) {
      const roomMap = new Map();
      for (const id of roomIds) {
        const room = rooms.find((r) => r._id === id);

        if (room) {
          if (roomMap.has(id)) {
            const existing = roomMap.get(id);
            existing.count += 1;
            existing.price += room.price;
            existing.discount += room.discount;
          } else {
            roomMap.set(id, {
              count: 1,
              name: room.name,
              price: room.price,
              discount: room.discount,
            });
          }
        }
      }

      const result = Array.from(roomMap.values());
      return result;
    },
    updateRoom() {
      this.$emit("update:selectedRooms", []);
    },
    booking() {
      const { address, image, name, _id } = this.hotel;
      const selectedRooms = this.selectedRooms.map(
        ({
          cancelFee,
          checkIn,
          checkOut,
          discount,
          name,
          price,
          roomCount,
          _id,
          tax,
        }) => ({
          cancelFee,
          checkIn,
          checkOut,
          discount,
          name,
          price,
          roomCount,
          _id,
          tax,
        })
      );
      const stringify = {
        ...this.form,
        selectedRooms,
        hotel: { address, image, name, _id },
        expTime: addMinutesToDate(),
      };
      setItem("bookingDetails", JSON.stringify(stringify));
      this.$router.push({ name: "booking" });
    },
    disabledCheckInDate(date) {
      const today = startDate();
      const maxDate = endDate(addDate(180));

      return date < today || date > maxDate;
    },
    disabledCheckOutDate(date) {
      const today = startDate(addDate(1));
      const maxDate = endDate(addDate(180));

      return date < today || date > maxDate;
    },
    open() {
      this.show = !this.show;
      this.$emit("toggle");
    },
  },
};
</script>
