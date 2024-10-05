<template>
  <div>
    <div class="w-full overflow-hidden px-3">
      <div class="grid grid-cols-4 grid-rows-2 gap-2 lg:h-[55vh] h-80">
        <template v-for="(image, key) in images">
          <div
            class="relative overflow-hidden rounded-xl"
            :class="imgGridClass(key)"
            :key="key"
            v-if="key < (isOnlyMobile ? 3 : 4)"
          >
            <div
              class="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-all duration-300 z-10 cursor-pointer flex justify-center items-center"
              :class="
                key === (isOnlyMobile ? 2 : 3) && images.length - (key + 1) > 0
                  ? 'opacity-100'
                  : ''
              "
              @click="$nuxt.$emit('preview', images)"
            >
              <p
                v-if="
                  key === (isOnlyMobile ? 2 : 3) &&
                  images.length - (key + 1) > 0
                "
                class="flex text-white items-center text-2xl font-bold"
              >
                +{{ images.length - (key + 1) }}
                <i class="far fa-images ml-2"></i>
              </p>
              <i
                v-else
                class="fa-solid fa-expand text-white text-5xl bg-white2 size-10 flex justify-center items-center rounded-lg"
              ></i>
            </div>
            <nuxt-img
              :src="image"
              :alt="image"
              format="webp"
              class="h-full w-full object-cover"
              width=""
              height=""
              loading="lazy"
              :key="image"
              decode="async"
              @click="$nuxt.$emit('preview', images)"
            />
          </div>
        </template>
      </div>
    </div>
    <div class="container mx-auto">
      <div class="flex md:mt-12 mt-4 gap-5 px-2 md:px-0">
        <div class="flex-1">
          <div class="flex justify-between flex-col-reverse md:flex-row">
            <h1 class="md:text-5xl text-3xl font-bold text-gray-800">
              {{ hotel?.name }}
            </h1>
            <div class="flex gap-2 justify-end">
              <Wishlist :hotelID="hotel._id" />
              <ShareButton :shareData="hotel" />
            </div>
          </div>
          <div
            class="font-semibold mt-3 text-gray-800 text-sm md:text-base flex gap-4"
          >
            <p><i class="fa-solid fa-location-dot"></i> {{ hotel.address }}</p>
            <p
              class="cursor-pointer text-indigo-600 w-[140px]"
              @click="mapModal = true"
            >
              <i class="fa-solid fa-eye"></i> View on map
            </p>
          </div>
          <Rating :rating="hotel.rating" basic class="mt-2" />
          <Alert v-if="hotel.nid" class="mt-3"
            >You have to show your National ID card at check-in time.</Alert
          >
          <div class="mt-10">
            <HotelFacility :hotel="hotel" />
          </div>
          <div class="mt-10">
            <h2 class="text-3xl font-bold text-gray-800">Room Options</h2>
            <hr class="mt-2 mb-4" />
            <WideRoom
              v-for="(room, key) in roomTypeLoading ? 3 : roomTypes"
              :key="`${key}-room`"
              :room="roomTypeLoading ? {} : room"
              :hotel="hotel"
              :loading="roomTypeLoading"
              class="mb-5"
              :form="form"
              @addRoom="addRoom"
            />
          </div>
          <CustomerReview :hotel="hotel" />
          <div class="mt-10">
            <h2 class="text-3xl font-bold text-gray-800">Hotel location</h2>
            <hr class="mt-2 mb-4" />
            <div
              v-html="hotel?.mapAddress"
              class="hotel-map-full rounded-xl overflow-hidden"
            ></div>
          </div>
          <div class="mt-10">
            <h2 class="text-3xl font-bold text-gray-800">About This Hotel</h2>
            <hr class="mt-2 mb-4" />
            <div v-safe="hotel?.about"></div>
          </div>
        </div>
        <div
          class="xl:w-[400px] lg:w-80 lg:sticky fixed lg:top-24 lg:max-h-[calc(100vh_-_120px)] max-h-[calc(100vh_-_90px)] rounded-xl bottom-0 z-30 lg:z-0 left-0 right-0 lg:translate-y-0 transition-all duration-300 overflow-y-auto"
          :class="
            showBookingForm
              ? 'translate-y-0'
              : 'translate-y-[calc(100%_-_63px)]'
          "
        >
          <BookingForm
            v-model="form"
            :roomTypes="roomTypes"
            :hotel="hotel"
            :selectedRooms.sync="selectedRooms"
            @toggle="showBookingForm = !showBookingForm"
          />
        </div>
      </div>
    </div>
    <Modal v-model="mapModal">
      <template #title>
        <div class="flex justify-between items-center">
          <h1
            class="text-2xl font-bold leading-6 text-gray-700 capitalize"
            id="modal-title"
          >
            View Our Hotel Location
          </h1>
          <CloseButton @click.native.prevent="mapModal = false" />
        </div>
      </template>
      <template #body>
        <div
          v-html="hotel.mapAddress"
          class="google-map-full"
          ref="googleMap"
        ></div>
      </template>
    </Modal>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
import {
  addDate,
  changeRoute,
  checkDate,
  compareDate,
  endDate,
  onlyDate,
  startDate,
} from "@/utils";
export default {
  name: "hotelPage",
  auth: false,
  head() {
    return { title: `${this.hotel?.name} - ${this.$pageTitle}` };
  },
  async asyncData({ error, store, route }) {
    try {
      const { slug } = route.params;
      const res = await axios.post(
        `${store.getters.baseUrl}/api/fetch/single-hotel-data`,
        { slug }
      );
      if (res.data) {
        const { hotel } = res.data;
        return {
          hotel,
          roomTypes: [],
          review: { rating: 5, message: "" },
          errors: {},
          mapModal: false,
        };
      } else {
        error({ statusCode: 404, message: "Not found" });
      }
    } catch (err) {
      error({ statusCode: 500, message: "Something wrong. Please try again" });
    }
  },
  data() {
    return {
      showBookingForm: false,
      fetchRoomTypeLoading: false,
      dataSet: false,
      mapModal: false,
      hotel: {},
      roomTypes: [],
      errors: {},
      form: {
        checkIn: addDate(2),
        checkOut: addDate(4),
        adult: 2,
        child: 0,
      },
      selectedRooms: [],
      fetchTimeout: null,
    };
  },
  computed: {
    ...mapGetters(["isOnlyMobile"]),
    images() {
      const images = [];
      if (this.hotel?.image) {
        images.push(this.hotel.image);
      }
      if (this.hotel?.images) {
        images.push(...this.hotel.images);
      }
      return images;
    },
    roomTypeLoading() {
      return this.roomTypes.length === 0;
    },
  },
  watch: {
    form: {
      deep: true,
      handler() {
        if (this.dataSet) this.updateRoute();
      },
    },
  },
  created() {
    this.setData();
  },
  methods: {
    async fetchHotelRoomTypes() {
      if (!this.fetchRoomTypeLoading) {
        this.fetchRoomTypeLoading = true;
        try {
          if (this.hotel?._id) {
            this.roomTypes = [];
            const body = {
              hotelID: this.hotel._id,
              ...this.form,
              checkIn: startDate(this.form.checkIn),
              checkOut: endDate(this.form.checkOut),
            };
            const { roomTypes } = await this.$commonApi.fetchHotelRoomTypes(
              body
            );
            this.roomTypes = roomTypes;
          }
        } catch (error) {
        } finally {
          this.fetchRoomTypeLoading = false;
        }
      }
    },
    imgGridClass(key) {
      if (key === 0) {
        return "md:col-span-2 col-span-full row-span-2 ";
      } else if (key === 1) {
        return "col-span-2";
      } else if (key === 2) {
        return "col-span-2 md:col-span-1";
      }
    },
    setData() {
      const { query } = this.$route;
      const { adult = 1, child = 0, checkIn, checkOut } = query;
      this.form = {
        ...this.form,
        adult,
        child,
        checkIn: this.getCheckIn(checkIn),
        checkOut: this.getCheckOut(checkOut),
      };
      this.dataSet = true;
      if (process.client) {
        this.fetchHotelRoomTypes();
      }
    },
    getCheckIn(checkIn) {
      return checkDate(checkIn) && endDate(checkIn) >= endDate()
        ? new Date(checkIn)
        : addDate(2);
    },
    getCheckOut(checkOut) {
      return checkDate(checkOut) && endDate(checkOut) >= endDate(addDate(1))
        ? new Date(checkOut)
        : addDate(4);
    },
    updateRoute() {
      this.selectedRooms = [];
      if (this.fetchTimeout) clearTimeout(this.fetchTimeout);
      this.fetchTimeout = setTimeout(() => {
        let route = {
          ...this.form,
          checkIn: onlyDate(this.form.checkIn),
          checkOut: onlyDate(this.form.checkOut),
        };
        changeRoute.call(this, route);
        this.fetchHotelRoomTypes();
      }, 500);
    },
    addRoom(val) {
      let existingRoom = this.selectedRooms.find(
        (room) => room._id === val._id
      );

      if (existingRoom) {
        const limit = existingRoom?.rooms?.length || 0;
        existingRoom.roomCount < limit ? existingRoom.roomCount++ : null;
      } else {
        let newRoom = [{ ...val, roomCount: 1 }];
        this.selectedRooms = newRoom;
      }
    },
  },
};
</script>

<style lang="scss">
.hotel-map-full {
  iframe {
    width: 100% !important;
    height: 550px !important;
  }
}
</style>
