<template>
  <div>
    <h2 class="text-3xl font-bold text-gray-800">Facilities</h2>
    <hr class="mt-2 mb-4" />
    <div
      class="grid 2xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-3"
    >
      <div
        v-for="(facility, _) in loading ? 10 : getFacilities"
        :key="`${_}facility`"
        class="flex items-center gap-1 text-gray-700"
      >
        <Skeleton v-if="loading" class="w-full h-5" />
        <template v-else>
          <p v-safe="facility?.icon"></p>
          <p class="text-gray-800">
            {{ facility?.name }}
          </p>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "HotelFacility",
  props: { hotel: Object },
  computed: {
    ...mapGetters(["facilities"]),
    getFacilities() {
      return this.facilities.filter(({ _id }) =>
        (this.hotel.facilities || []).some((id) => _id === id)
      );
    },
    loading() {
      return this.getFacilities.length === 0;
    },
  },
  mounted() {
    this.fetchAllFacilitiesOnce();
  },
  methods: {
    ...mapActions(["fetchAllFacilitiesOnce"]),
  },
};
</script>
