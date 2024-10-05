<template>
  <div
    class="relative rounded-r-2xl rounded-l-lg shadow-lg border border-gray-200"
  >
    <div class="flex flex-col md:flex-row">
      <div class="xl:w-[350px] md:w-72 w-full">
        <div class="grid grid-cols-2 gap-2">
          <template v-for="(image, key) in loading ? 3 : images">
            <Skeleton
              :key="key + 'skeleton'"
              v-if="loading"
              :class="[imgGridClass(key), key === 0 ? 'h-48' : 'h-24']"
            />
            <div
              class="relative overflow-hidden rounded-lg"
              :class="[imgGridClass(key), key === 0 ? 'h-48' : 'h-24']"
              :key="key"
              v-else-if="key < 3"
            >
              <div
                class="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-all duration-300 z-10 cursor-pointer flex justify-center items-center"
                :class="
                  key === 2 && images.length > key + 1 ? 'opacity-100' : ''
                "
                @click="$nuxt.$emit('preview', images)"
              >
                <p
                  v-if="key === 2 && images.length > 3"
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
                :alt="room.name"
                :loop="true"
                width="540"
                height="420"
                format="webp"
                class="object-cover cursor-pointer h-full w-full"
                loading="lazy"
                decode="async"
                @click="$nuxt.$emit('preview', images)"
              />
            </div>
          </template>
        </div>
        <div class="md:pl-3 pl-2 md:py-5 py-3 text-gray-800">
          <div class="md:hidden pr-2">
            <Rating :rating="room.rating" basic v-if="!loading" />
            <Skeleton v-if="loading" class="w-full h-10 mb-2" />
            <p v-else class="text-2xl font-bold text-gray-800">
              {{ room.name }}
            </p>
          </div>
          <div class="mb-3 md:hidden" v-if="!loading">
            <p class="text-red-600 text-sm">Cancellation not available</p>
          </div>
          <div class="flex gap-1">
            <p class="font-semibold">Room Capacity:</p>
            <Skeleton v-if="loading" class="flex-1 pl-4 h-5" />
            <p v-else>
              <i class="fa-solid fa-user-group"></i>
              {{ room.adult }} Adult, {{ room.child }} child
            </p>
          </div>
          <div class="flex gap-1">
            <p class="font-semibold">Bed info:</p>
            <Skeleton v-if="loading" class="flex-1 pl-4 h-5" />
            <div class="flex" v-else>
              <p
                v-for="(bed, key) in allBeds"
                :key="`bed-${key}`"
                class="flex gap-1 ml-3"
              >
                <span v-safe="bed?.icon"></span>{{ bed?.name
                }}{{ key + 1 !== allBeds.length ? "," : "" }}
              </p>
            </div>
          </div>
          <div class="flex gap-1">
            <p class="font-semibold">Accommodation Type:</p>

            <Skeleton v-if="loading" class="flex-1 pl-4 h-5" />
            <p v-else>{{ accommodation?.name }}</p>
          </div>
          <div class="flex gap-1">
            <p class="font-semibold">Available rooms:</p>

            <Skeleton v-if="loading" class="flex-1 pl-4 h-5" />
            <p
              v-else-if="room?.rooms?.length"
              :class="
                room?.rooms?.length > 2 ? 'text-green-600' : 'text-red-500'
              "
            >
              {{ room?.rooms?.length }} room{{
                room?.rooms?.length > 0 ? "s" : ""
              }}
            </p>
            <p v-else class="text-red-500">No rooms available</p>
          </div>
        </div>
      </div>
      <div class="bg-white flex-1 flex flex-col relative md:p-4 px-2 pb-2">
        <div class="flex-1">
          <div class="flex flex-col justify-between">
            <div>
              <div class="hidden md:block">
                <Skeleton v-if="loading" class="w-full h-10" />
                <template v-else>
                  <div
                    class="justify-between items-center gap-5 hidden md:flex"
                  >
                    <p class="text-2xl font-bold text-gray-800 flex-1">
                      {{ room.name }}
                    </p>
                    <Rating :rating="room.rating" basic />
                  </div>
                </template>
              </div>
              <div class="hidden md:block">
                <Skeleton v-if="loading" class="w-28 h-5 mt-2" />
                <div v-else>
                  <p
                    class="text-sm"
                    :class="
                      room.cancelStatus ? 'text-green-600' : 'text-red-600'
                    "
                  >
                    {{
                      room.cancelStatus
                        ? "Cancellation available"
                        : "Cancellation not available"
                    }}
                    <i
                      class="fas fa-circle-info cursor-pointer"
                      v-tooltip.bottom="cancelText"
                      v-if="room.cancelStatus"
                    ></i>
                  </p>
                </div>
              </div>
              <div class="md:mt-4">
                <p class="font-semibold">Facilities:</p>
                <div class="flex gap-x-4 gap-y-2 flex-wrap text-sm">
                  <template
                    v-for="(facility, _) in loading ? 10 : getFacilities"
                  >
                    <Skeleton
                      v-if="loading"
                      class="w-20 h-10"
                      :key="`${_}skeleton`"
                    />
                    <div
                      v-else-if="_ < showItems"
                      :key="`${_}facility`"
                      class="flex items-center gap-1"
                    >
                      <p v-safe="facility?.icon" class="text-gray-800"></p>
                      <p class="text-gray-800">{{ facility?.name }}</p>
                    </div>
                  </template>
                  <p
                    class="text-indigo-600 cursor-pointer font-semibold"
                    @click="showAll"
                    v-if="getFacilities.length > 10"
                  >
                    <span v-if="showItems === 999"> Show less </span>
                    <span v-else>
                      +{{ getFacilities.length - showItems }} see more
                    </span>
                  </p>
                </div>
              </div>
              <div v-if="room?.complement?.length" class="mt-4 text-gray-800">
                <Skeleton v-if="loading" class="w-28 h-5 mt-2" />
                <p class="font-semibold">Complements:</p>
                <p
                  class="text-sm"
                  v-for="(complement, key) in room?.complement"
                  :key="key"
                >
                  <i class="fas fa-check"></i>
                  {{ complement.name }} ({{ complement.item }})
                </p>
              </div>
              <div v-if="room?.bedroom" class="mt-4 text-gray-800">
                <Skeleton v-if="loading" class="w-28 h-5 mt-2" />
                <p class="font-semibold">Bedroom details:</p>
                <p class="text-sm">
                  {{ room.bedroom }}
                </p>
              </div>
              <div v-if="room?.bathroom" class="mt-4 text-gray-800">
                <Skeleton v-if="loading" class="w-28 h-5 mt-2" />
                <p class="font-semibold">Bathroom details:</p>
                <p class="text-sm">
                  {{ room.bathroom }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <Skeleton v-if="loading" class="w-full h-10" />
        <template v-else>
          <div class="flex justify-between items-center mt-3">
            <div class="flex items-end text-gray-700 text-center">
              <p class="xl:text-2xl md:text-xl font-black">
                <del
                  class="text-red-500 mr-1"
                  v-if="room?.discount && room.discount > 0"
                >
                  {{ $taka }}{{ room.price + room.discount || 0 | currency }}
                </del>

                {{ $taka }}{{ room.price || 0 | currency }}
              </p>
              <p>Per night</p>
            </div>
            <div class="relative">
              <Button
                class="absolute active-animation z-10 lg:hidden"
                v-for="(_, i) in showAnimation"
                :key="`animation-${i}`"
                @click.native.prevent="addRoom(room)"
                :disabled="room?.disabled || room?.rooms?.length === 0"
              >
                Add room <i class="fas fa-add"></i>
              </Button>
              <Button
                @click.native.prevent="addRoom(room)"
                :disabled="room?.disabled || room?.rooms?.length === 0"
              >
                Add room <i class="fas fa-add"></i>
              </Button>
            </div>
          </div>
          <div class="flex justify-end">
            <p class="text-gray-700 text-xs mt-1" v-if="room.tax">
              +Tax: {{ $taka }}{{ calculateTax | currency }} per night
            </p>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { addDate, arrayConverter, fullDateFormat } from "@/utils";
export default {
  name: "WideRoom",
  props: { room: Object, hotel: Object, loading: Boolean, form: Object },
  data() {
    return {
      showItems: 10,
      showAnimation: [],
    };
  },
  computed: {
    ...mapGetters(["facilities", "beds", "accommodationType"]),
    images() {
      return [
        ...arrayConverter(this.room.image),
        ...arrayConverter(this.room.images),
      ];
    },
    getFacilities() {
      return this.facilities.filter(({ _id }) =>
        (this.room.facilities || []).some((id) => _id === id)
      );
    },
    calculateTax() {
      return this.room.price * (this.room.tax / 100);
    },
    allBeds() {
      return (
        this.room?.bedPerRoomType?.map((id) =>
          this.beds.find(({ _id }) => _id === id)
        ) || []
      );
    },
    accommodation() {
      return this.accommodationType.find(
        ({ _id }) => _id === this.room.accommodationType
      );
    },
    cancelText() {
      const { checkIn } = this.form;
      return `
      <ul class="list-disc">
        <li>Free cancellation until 00:01 on ${fullDateFormat(
          addDate(-3, this.form?.checkIn)
        )}.</li>
        <li>Cancellation fee ${this.$taka}${
        this.room.cancelFee
      } per room from 00:01 on ${fullDateFormat(
        addDate(-3, this.form?.checkIn)
      )}.</li>
        <li>No refund from 00:01 on ${fullDateFormat(
          addDate(-1, this.form?.checkIn)
        )}.</li>
      </ul>
      `;
    },
  },
  mounted() {
    this.fetchAllFacilitiesOnce();
    this.fetchAllBedsOnce();
    this.fetchAllAccommodationTypeOnce();
    this.$nextTick(() => {
      this.showNav();
    });
  },
  methods: {
    ...mapActions([
      "fetchAllFacilitiesOnce",
      "fetchAllBedsOnce",
      "fetchAllAccommodationTypeOnce",
    ]),
    showNav() {
      const prevButton = this.$refs.prevButton;
      const nextButton = this.$refs.nextButton;

      if (prevButton) {
        const prevSpan = prevButton.closest("span");
        if (prevSpan) {
          prevSpan.removeAttribute("style");
        }
      }

      if (nextButton) {
        const nextSpan = nextButton.closest("span");
        if (nextSpan) {
          nextSpan.removeAttribute("style");
        }
      }
    },
    showAll() {
      this.showItems = this.showItems === 999 ? 10 : 999;
    },
    imgGridClass(key) {
      if (key === 0) {
        return "col-span-2";
      }
    },
    addRoom(room) {
      this.showAnimation.push(this.showAnimation.length);
      this.$emit("addRoom", room);
    },
  },
};
</script>
