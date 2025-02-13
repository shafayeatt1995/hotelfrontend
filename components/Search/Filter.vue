<template>
  <div
    class="w-full bg-white shadow-lg border border-gray-300 lg:rounded-xl sticky top-24 lg:max-h-[calc(100vh_-_115px)] h-dvh overflow-y-auto"
  >
    <div
      class="flex justify-between p-4 items-center sticky top-0 bg-white border-b border-gray-300 z-10"
    >
      <h2 class="text-gray-800 font-bold text-2xl">Filter</h2>
      <button class="text-indigo-600" @click="reset()">Reset</button>
    </div>
    <div class="divide-y divide-gray-200 px-4">
      <div class="pt-2 pb-4">
        <h3 class="text-gray-800 font-semibold text-lg">Price range</h3>
        <div class="flex items-center gap-2">
          <input
            type="number"
            class="border border-gray-300 w-full h-[42px] rounded-lg px-2"
            placeholder="Min"
            v-model="form.minPrice"
          />
          <p>to</p>
          <input
            type="number"
            class="border border-gray-300 w-full h-[42px] rounded-lg px-2"
            v-model="form.maxPrice"
            placeholder="Max"
          />
          <Button
            class="h-[42px]"
            variant="lightIndigo"
            @click.native.prevent="updateRoute"
          >
            <i class="fa-solid fa-chevron-right"></i>
          </Button>
        </div>
      </div>
      <div class="pt-2 pb-4">
        <h3 class="text-gray-800 font-semibold text-lg">Rating</h3>
        <div class="flex flex-col gap-2 mt-2">
          <Checkbox
            v-for="r in 5"
            :key="`rating${r}`"
            :id="r"
            :val="r"
            v-model="form.ratings"
          >
            <div class="flex text-amber-400 gap-1 cursor-pointer">
              <template v-for="s in 5">
                <i v-if="r >= s" class="fas fa-star" :key="`s${s}`"></i>
              </template>
            </div>
          </Checkbox>
        </div>
      </div>
      <div class="pt-2 pb-4">
        <h3 class="text-gray-800 font-semibold text-lg">
          Accommodation Type
          <span v-if="form.accommodation.length > 0"
            >({{ form.accommodation.length }})</span
          >
        </h3>
        <div class="inline-flex flex-col gap-2 mt-2">
          <Checkbox
            v-for="acc in accommodationType"
            :key="acc._id"
            :id="acc._id"
            :val="acc._id"
            v-model="form.accommodation"
          >
            <div class="flex text-gray-700 gap-2 cursor-pointer">
              <p>{{ acc.name }}</p>
            </div>
          </Checkbox>
        </div>
      </div>
      <div class="pt-2 pb-4">
        <h3 class="text-gray-800 font-semibold text-lg">
          Facilities
          <span v-if="form.facilities.length > 0"
            >({{ form.facilities.length }})</span
          >
        </h3>
        <div class="inline-flex flex-col gap-2 mt-2">
          <template v-for="(facility, key) in sortFacilities">
            <Checkbox
              v-if="key < 5"
              :key="`f-${key}`"
              :id="facility._id"
              :val="facility._id"
              v-model="form.facilities"
            >
              <div class="flex text-gray-700 gap-2 cursor-pointer">
                <div class="flex items-center gap-2">
                  <div
                    class="w-6 flex justify-center"
                    v-safe="facility.icon"
                  ></div>
                  <p>{{ facility.name }}</p>
                </div>
              </div>
            </Checkbox>
          </template>
        </div>
        <slide-up-down
          :active="allFacility"
          :duration="300"
          class="inline-flex flex-col gap-2"
          :class="allFacility ? 'mt-2' : ''"
        >
          <template v-for="(facility, key) in sortFacilities">
            <Checkbox
              v-if="key > 4"
              :key="`f-${key}`"
              :id="facility._id"
              :val="facility._id"
              v-model="form.facilities"
            >
              <div class="flex text-gray-700 gap-1 cursor-pointer">
                <div class="flex items-center gap-2">
                  <div
                    class="w-6 flex justify-center"
                    v-safe="facility.icon"
                  ></div>
                  <p>{{ facility.name }}</p>
                </div>
              </div>
            </Checkbox>
          </template>
        </slide-up-down>
        <div class="flex justify-center">
          <button
            class="text-indigo-600 flex items-center gap-1"
            @click="allFacility = !allFacility"
          >
            See more
            <p
              class="transition-all duration-200"
              :class="allFacility ? 'rotate-180' : 'rotate-0'"
            >
              <i class="fa-solid fa-chevron-down"></i>
            </p>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { arrayConverter, changeRoute } from "@/utils";
export default {
  name: "SearchFilter",
  data() {
    return {
      form: {
        minPrice: this.$route.query?.minPrice || "",
        maxPrice: this.$route.query?.maxPrice || "",
        ratings: arrayConverter(this.$route.query?.ratings),
        accommodation: arrayConverter(this.$route.query?.accommodation),
        facilities: arrayConverter(this.$route.query?.facilities),
      },
      allFacility: false,
    };
  },
  computed: {
    ...mapGetters(["accommodationType", "facilities"]),
    sortFacilities() {
      const facility = [...this.facilities];
      return facility.sort((a, b) => a.name.localeCompare(b.name));
    },
  },
  watch: {
    "form.ratings"() {
      this.updateRoute();
    },
    "form.accommodation"() {
      this.updateRoute();
    },
    "form.facilities"() {
      this.updateRoute();
    },
  },
  mounted() {
    this.loadFilterData();
  },
  methods: {
    ...mapActions(["fetchAllAccommodationTypeOnce", "fetchAllFacilitiesOnce"]),
    async loadFilterData() {
      await Promise.all([
        this.fetchAllAccommodationTypeOnce(),
        this.fetchAllFacilitiesOnce(),
      ]);
    },
    updateRoute() {
      changeRoute.call(this, this.form);
    },
    reset() {
      this.form = {
        minPrice: "",
        maxPrice: "",
        ratings: [],
        accommodation: [],
        facilities: [],
      };
    },
  },
};
</script>
