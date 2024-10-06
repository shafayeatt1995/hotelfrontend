<template>
  <div class="bg-white dark:bg-gray-900">
    <div class="container relative z-1 mx-auto z-10">
      <div class="grid px-2 md:px-0">
        <form
          class="md:p-6 p-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg"
          @submit.prevent="submit"
        >
          <div class="registration-form text-dark text-start">
            <div class="grid lg:grid-cols-5 md:grid-cols-2 grid-cols-1 gap-4">
              <div class="relative">
                <label
                  class="form-label font-medium text-grey-900 dark:text-white"
                >
                  Search:
                </label>
                <input
                  type="text"
                  class="block w-full py-2 text-gray-700 bg-white border rounded-lg focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40 disabled:bg-gray-200 px-4"
                  placeholder="Search"
                  v-model="form.search"
                  @focus="show = 'destination'"
                  @blur="showFalse"
                />
                <div
                  class="absolute bg-white md:w-[500px] w-full shadow-xl border rounded-lg flex max-h-[450px] z-10 overflow-y-auto p-2 gap-3"
                  v-if="show === 'destination'"
                >
                  <div class="flex-1">
                    <p class="font-semibold">Top Destination</p>
                    <div class="grid md:grid-cols-2 grid-cols-1 mt-2 gap-3">
                      <div
                        class="flex gap-3 cursor-pointer"
                        v-for="(location, _) in locations"
                        :key="`location-${_}`"
                        @click="form.search = location.name"
                      >
                        <nuxt-img
                          :src="location.image"
                          :alt="location.name"
                          width="96"
                          height="96"
                          format="webp"
                          class="size-12 rounded-lg object-cover"
                          loading="lazy"
                          decode="async"
                        />
                        <div class="flex-1">
                          <p class="font-semibold truncate max-w-44">
                            {{ location.name }}
                          </p>
                          <p class="text-sm text-gray-700 truncate max-w-44">
                            City
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <label
                  class="form-label font-medium text-grey-900 dark:text-white"
                >
                  Check in date:
                </label>
                <div class="relative">
                  <ClientOnly>
                    <DatePicker
                      v-model="form.checkIn"
                      type="date"
                      placeholder="Select check in date"
                      prefix-class="xmx"
                      :disabled-date="disabledCheckInDate"
                      format="DD MMM,YYYY"
                      :clearable="false"
                    />
                  </ClientOnly>
                </div>
              </div>
              <div>
                <label
                  class="form-label font-medium text-grey-900 dark:text-white"
                  >Check out date:</label
                >
                <div class="relative">
                  <ClientOnly>
                    <DatePicker
                      v-model="form.checkOut"
                      type="date"
                      placeholder="Select check out date"
                      prefix-class="xmx"
                      :disabled-date="disabledCheckOutDate"
                      format="DD MMM,YYYY"
                      :clearable="false"
                    />
                  </ClientOnly>
                </div>
              </div>
              <div class="relative">
                <label
                  class="form-label font-medium text-grey-900 dark:text-white"
                  >Guests & rooms:</label
                >
                <div
                  v-click-outside="
                    () => {
                      show === 'person' ? (show = '') : '';
                    }
                  "
                >
                  <input
                    type="text"
                    class="block w-full py-2 text-gray-700 bg-white border rounded-lg focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40 disabled:bg-gray-200 px-4"
                    placeholder="Search"
                    :value="guestAndRoom"
                    @click="show = 'person'"
                  />
                  <div
                    class="absolute bg-white min-w-60 w-full shadow-xl rounded-lg z-10 p-2 gap-3 divide-y divide-gray-200 border border-gray-200 right-0"
                    v-if="show === 'person'"
                  >
                    <div class="flex items-center justify-between flex-1 py-3">
                      <div>
                        <p class="font-bold text-gray-800">Adults</p>
                        <p class="text-xs text-gray-700">Ages 13 or above</p>
                      </div>
                      <Hstack v-model="form.adult" :min="1" />
                    </div>
                    <div class="flex items-center justify-between flex-1 py-1">
                      <div>
                        <p class="font-bold text-gray-800">Child</p>
                        <p class="text-xs text-gray-700">Ages 13 below</p>
                      </div>
                      <Hstack v-model="form.child" />
                    </div>
                    <div class="flex items-center justify-between flex-1 py-1">
                      <div>
                        <p class="font-bold text-gray-800">Rooms</p>
                        <p class="text-xs text-gray-700">Max room 5</p>
                      </div>
                      <Hstack v-model="form.room" :max="5" />
                    </div>
                  </div>
                </div>
              </div>
              <div class="lg:mt-6 mt-4 col-span-full lg:col-span-1">
                <Button class="w-full" type="submit">
                  <i class="fa-solid fa-magnifying-glass"></i> Search
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import vClickOutside from "v-click-outside";
import { mapActions, mapGetters } from "vuex";
import {
  addDate,
  compareDate,
  endDate,
  onlyDate,
  startDate,
  validateDate,
} from "@/utils";
export default {
  name: "Search",
  directives: { clickOutside: vClickOutside.directive },
  data() {
    return {
      show: "",
      form: {
        search: "",
        checkIn: addDate(2),
        checkOut: addDate(4),
        adult: 2,
        child: 0,
        room: 1,
      },
      errors: {},
      searchTimeout: null,
    };
  },
  computed: {
    ...mapGetters(["searchData"]),
    locations() {
      return this.searchData?.locations || [];
    },
    properties() {
      return this.searchData?.properties || [];
    },
    guestAndRoom() {
      const adult = this.form.adult > 0 ? `${this.form.adult} Adults` : "";
      const child = this.form.child > 0 ? `, ${this.form.child} Child` : "";
      const room = this.form.room > 0 ? `, ${this.form.room} Room` : "";
      return adult + child + room;
    },
  },
  watch: {
    "form.search"() {
      clearTimeout(this.searchTimeout);
      this.searchTimeout = setTimeout(() => {
        this.refetchDestinationProperty();
      }, 500);
    },
    "form.checkIn"(val) {
      if (endDate(val) >= endDate(this.form.checkOut))
        this.form.checkOut = addDate(1, val);
    },
    "form.checkOut"(val) {
      if (endDate(val) <= endDate(this.form.checkIn))
        this.form.checkIn = addDate(-1, val);
    },
  },
  mounted() {
    this.getSearchData();
    this.setData();
  },
  methods: {
    ...mapActions(["getSearchData"]),
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
    refetchDestinationProperty() {
      this.getSearchData(this.form.search);
    },
    showFalse() {
      setTimeout(() => {
        this.show === "destination" ? (this.show = "") : "";
      }, 300);
    },
    submit() {
      const targetRoute = {
        name: "search-hotels",
        query: {
          ...this.form,
          checkIn: onlyDate(this.form.checkIn),
          checkOut: onlyDate(this.form.checkOut),
        },
      };

      const { pathname, search } = window.location;
      const targetUrl = this.$router.resolve(targetRoute).href;
      const currentUrl = pathname + search;

      if (currentUrl !== targetUrl) {
        this.$router.push(targetRoute).catch((err) => {
          if (err.name !== "NavigationDuplicated") {
            console.error(err);
          }
        });
      }
    },
    setData() {
      const { name, query } = this.$route;
      if (name === "search-hotels") {
        const {
          search = "",
          adult = 1,
          child = 0,
          room = 1,
          checkIn = addDate(2),
          checkOut = addDate(4),
        } = query;
        this.form = {
          search,
          adult,
          child,
          room,
          checkIn: validateDate(checkIn, addDate(2)),
          checkOut: validateDate(checkOut, addDate(4)),
        };
      }
    },
  },
};
</script>
