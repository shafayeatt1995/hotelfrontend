<template>
  <div>
    <form @submit.prevent="updateProfile">
      <Input
        v-for="(field, i) in inputFields"
        :key="i"
        :field="field"
        v-model="form"
        :errors="errors"
      />
      <div class="grid grid-cols-2 gap-8">
        <div>
          <p class="mt-3 text-gray-700">Hotel main image</p>
          <imageModalSelector
            :image="form.image"
            @action="imageModal = true"
            placeholder="Select Hotel Main image"
            class="!mt-0"
          />
        </div>
        <div>
          <p class="mt-3 text-gray-700">Hotel images</p>
          <imageModalSelector
            :image="form.images"
            @action="imagesModal = true"
            placeholder="Select Hotel feature images"
            class="!mt-0"
            multiple
          />
        </div>
      </div>
      <div class="my-5">
        <p class="mt-3 text-gray-700">
          Facilities ({{ form.facilities.length }})
        </p>
        <div class="flex flex-wrap gap-x-3 gap-y-2">
          <div v-for="(data, i) in sortFacilities" :key="i">
            <Badge
              :variant="checkFacility(data) ? 'solidIndigo' : 'gray'"
              @click.native.prevent="selectFacilities(data)"
              class="cursor-pointer"
            >
              <span v-safe="data.icon" class="size-5" />
              <p>{{ data.name }}</p>
            </Badge>
          </div>
        </div>
      </div>
      <div class="flex justify-end mt-3">
        <Button type="submit" :loading="loading">Update Profile</Button>
      </div>
    </form>
    <ImageModal v-model="imageModal" :selected.sync="form.image" />
    <ImageModal v-model="imagesModal" :selected.sync="form.images" multiple />
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "SettingsProfile",
  data() {
    return {
      form: {
        name: this.$auth.user?.hotel?.name || "",
        slug: this.$auth.user?.hotel?.slug || "",
        address: this.$auth.user?.hotel?.address || "",
        image: this.$auth.user?.hotel?.image || "",
        images: this.$auth.user?.hotel?.images
          ? [...this.$auth.user.hotel.images]
          : [],
        facilities: [...this.$auth.user?.hotel?.facilities] || [],
        about: this.$auth.user?.hotel?.about || "",
        nid: this.$auth.user?.hotel?.nid || true,
      },
      errors: {},
      loading: false,
      imageModal: false,
      imagesModal: false,
    };
  },
  computed: {
    ...mapGetters(["facilities"]),
    sortFacilities() {
      const facility = [...this.facilities];
      return facility.sort((a, b) => a.name.localeCompare(b.name));
    },
    inputFields() {
      return [
        {
          type: "text",
          placeholder: "Hotel name",
          name: "name",
          label: "Hotel name",
        },
        {
          type: "text",
          placeholder: "Hotel slug",
          name: "slug",
          label: "Hotel slug",
        },
        {
          type: "text",
          placeholder: "Hotel address",
          name: "address",
          label: "Hotel address",
        },
        {
          type: "editor",
          placeholder: "About hotel",
          name: "about",
          label: "About hotel",
        },
        {
          type: "select",
          label: "NID card required",
          placeholder: "NID card required",
          icon: "far fa-address-card",
          name: "nid",
          options: [
            { label: "Yes", value: true },
            { label: "no", value: false },
          ],
        },
      ];
    },
  },
  watch: {
    "form.name"(val) {
      this.form.slug = strSlug(val);
    },
  },
  mounted() {
    this.fetchAllFacilitiesOnce();
  },
  methods: {
    ...mapActions(["fetchAllFacilitiesOnce"]),
    async updateProfile() {
      try {
        this.loading = true;
        this.errors = {};
        const about = this.form.about.replace(/\s+/g, " ").trim();

        await this.$userApi.updateHotelProfile({ ...this.form, about });
        await this.$auth.fetchUser();
        this.$nuxt.$emit("success", "Profile updated successfully");
      } catch (error) {
        this.errors = error?.response?.data?.errors;
      } finally {
        this.loading = false;
      }
    },
    checkFacility({ _id }) {
      return this.form.facilities.includes(_id);
    },
    selectFacilities({ _id }) {
      const index = this.form.facilities.findIndex((data) => _id === data);
      if (index === -1) {
        this.form.facilities.push(_id);
      } else {
        this.form.facilities.splice(index, 1);
      }
    },
  },
};
</script>
