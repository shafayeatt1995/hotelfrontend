<template>
  <div>
    <section
      class="flex flex-col w-full lg:px-4 lg:justify-between lg:items-center lg:flex-row mb-5"
    >
      <div>
        <h2 class="text-3xl font-medium text-gray-700">
          <i class="fas fa-user"></i> Blog
        </h2>
      </div>

      <div class="flex mt-4 md:mt-0 gap-2">
        <input
          v-model="search"
          class="border px-2 rounded-md border-gray-300 h-9 w-full"
          placeholder="Search"
        />
        <Button @click.native.prevent="modal = true">
          <div class="flex items-center justify-center -mx-1">
            <i class="fas fa-plus" />
          </div>
        </Button>
      </div>
    </section>

    <section class="lg:px-4">
      <TableResponsive
        :fields="fields"
        :items="loading ? 10 : items"
        :skeleton="loading"
      >
        <template #avatar="{ value }">
          <img
            :src="value"
            :alt="value"
            class="max-w-14 max-h-14"
            loading="lazy"
          />
        </template>
        <template #deleted="{ value }">
          <Badge
            variant="red"
            title="Deleted"
            v-if="value"
            icon="fas fa-xmark"
          />
          <Badge variant="green" title="Active" icon="fas fa-check" v-else />
        </template>
        <template #suspended="{ value }">
          <Badge
            variant="red"
            title="Suspended"
            v-if="value"
            icon="fas fa-xmark"
          />
          <Badge variant="green" title="Active" icon="fas fa-check" v-else />
        </template>
        <template #actions="{ item, index }">
          <div class="flex gap-2 justify-between lg:justify-start flex-1">
            <Button @click.native.prevent="editItem(item)">
              <i class="fas fa-pen-to-square" />

              Edit </Button
            ><Button
              :variant="item.deleted ? 'green' : 'red'"
              @click.native.prevent="deleteItem(item._id, index)"
            >
              <i class="fas fa-user-xmark" />

              {{ item.deleted ? "Active" : "Delete" }}
            </Button>
            <Button
              :variant="item.suspended ? 'green' : 'red'"
              @click.native.prevent="suspendItem(item._id, index)"
            >
              <i class="fas fa-user-slash" />
              {{ item.suspended ? "Active" : "Suspend" }}
            </Button>
          </div>
        </template>
        <template #empty v-if="items.length === 0 && !loading">
          <div class="flex items-center text-center h-96 bg-white">
            <EmptyMessage
              @action="modal = true"
              title="No post found"
              buttonText="Add post"
              icon="far fa-circle-xmark"
              iconClass="rotate-45"
            />
          </div>
        </template>
      </TableResponsive>
      <Observer @load="fetchItems" v-if="items.length > 0">
        <Spinner class="text-green-600 h-7 w-7" v-if="items % perPage === 0" />
      </Observer>
    </section>

    <Modal v-model="modal" size="xl">
      <template #title>
        <div class="flex justify-between items-center">
          <h1
            class="text-lg font-medium leading-6 text-gray-700 capitalize"
            id="modal-title"
          >
            {{ editMode ? "Edit" : "Create new" }} Blog post
          </h1>
          <CloseButton @click.native.prevent="modal = false" />
        </div>
      </template>
      <template #body>
        <form class="mt-4" @submit.prevent="submit">
          <div class="grid grid-cols-2 gap-5">
            <div>
              <label id="division">Division</label>
              <select
                class="w-full border p-2 rounded-lg"
                placeholder="Select division"
                v-model="form.division"
                for="division"
              >
                <option v-for="(d, i) in divisions" :key="i" :value="d._id">
                  {{ d.name }}
                </option>
              </select>
            </div>
            <div>
              <label for="district">District ({{ selectDistrict }})</label>
              <select
                class="w-full border p-2 rounded-lg"
                placeholder="Select district"
                v-model="form.district"
                id="district"
              >
                <option
                  v-for="(d, i) in districts"
                  :key="i + 'a'"
                  :value="d._id"
                >
                  {{ d.name }}
                </option>
              </select>
            </div>
            <div>
              <label label="title">Post title</label>
              <input
                type="text"
                v-model="form.title"
                placeholder="title"
                class="w-full border p-2 rounded-lg"
              />
            </div>
            <div>
              <label label="title">Post slug</label>
              <input
                type="text"
                v-model="form.slug"
                placeholder="slug"
                class="w-full border p-2 rounded-lg"
              />
            </div>
            <div>
              <label for="map">Map</label>
              <div
                v-html="form.map"
                v-if="form.map"
                class="w-full fullmap"
              ></div>
              <input
                class="w-full border p-2 rounded-lg"
                v-model="form.map"
                placeholder="map url"
                id="map"
              />
            </div>
            <div>
              <div class="flex justify-between">
                <label for="content">Content {{ contentLength }} </label>
              </div>
              <textarea
                class="w-full border p-2 rounded-lg"
                v-model="form.content"
                placeholder
                rows="12"
                id="content"
              ></textarea>
              <div class="flex gap-1" v-if="gptContent">
                <Button class="w-full" @click.native.prevent="copy(1)"
                  >Copy Part 1</Button
                >
                <Button class="w-full" @click.native.prevent="copy(2)"
                  >Copy Part 2</Button
                >
              </div>
            </div>
          </div>
          <div class="mt-4 flex items-center gap-3">
            <Button
              variant="red"
              type="button"
              class="w-full tracking-wide flex-1"
              @click.native.prevent="modal = false"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              class="w-full tracking-wide flex-1"
              :disabled="!available"
            >
              {{ editMode ? "Update" : "Create" }} post
            </Button>
          </div>
        </form>
      </template>
    </Modal>

    <KeyTrigger eventKey="/" @action="modal = true" />
    <KeyTrigger eventKey="Escape" @action="modal = false" />
  </div>
</template>

<script>
import { strSlug } from "~/utils";

export default {
  name: "blogPage",
  layout: "dashboard",
  head() {
    return {
      title: `Blog - ${this.$pageTitle}`,
    };
  },
  data() {
    return {
      modal: true,
      form: {
        title: "",
        slug: "",
        map: "",
        content: "",
        division: null,
        district: null,
      },
      editMode: false,
      items: [],
      perPage: 30,
      loading: true,
      errors: {},
      search: "",
      searchTimeout: null,
      divisions: [],
      districts: [],
    };
  },
  computed: {
    fields() {
      const fields = [
        { key: "avatar", label: "Avatar", span: "minmax(75PX, 1fr)" },
        { key: "name", label: "Name", span: "minmax(200PX, 1fr)" },
        { key: "email", label: "Email", span: "minmax(350PX, 1fr)" },
        { key: "suspended", label: "Suspended", span: "minmax(120PX, 1fr)" },
        { key: "deleted", label: "Delete", span: "minmax(120PX, 1fr)" },
        {
          key: "actions",
          label: "Actions",
          hideSmLabel: true,
          span: "minmax(400px, 1fr)",
        },
      ];
      return fields;
    },
    selectDivision() {
      return (
        this.divisions.find((d) => d._id === this.form.division)?.name || ""
      );
    },
    selectDistrict() {
      return (
        this.districts.find((d) => d._id === this.form.district)?.name || ""
      );
    },
    contentLength() {
      if (typeof window === "undefined") return 0;
      const parser = new DOMParser();
      const doc = parser.parseFromString(this.form.content, "text/html");
      return doc.body.innerHTML.length;
    },
    gptContent() {
      return (
        this.selectDistrict.length > 0 &&
        this.selectDivision.length > 0 &&
        this.form.title.length > 0
      );
    },
    available() {
      return (
        this.gptContent &&
        this.form.content.length > 0 &&
        this.form.map.length > 0
      );
    },
  },
  watch: {
    search() {
      clearTimeout(this.searchTimeout);
      this.searchTimeout = setTimeout(() => {
        this.refetch();
      }, 500);
    },
    modal(val) {
      if (!val) {
        this.form = {
          _id: "",
          name: "",
          email: "",
          password: "",
        };
        this.editMode = false;
        this.errors = {};
      }
    },
    "form.division"() {
      this.fetchDistrict();
    },
    "form.title"(val) {
      this.form.slug = strSlug(val);
    },
  },
  mounted() {
    this.fetchDivision();
    this.fetchItems();
  },
  methods: {
    async fetchItems() {
      try {
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    async submit() {
      try {
        if (this.editMode) {
          // await this.$adminApi.updateUser(this.form);
        } else {
          await this.$adminApi.createDemoBlogPost({
            ...this.form,
            divisionName: this.selectDivision,
            districtName: this.selectDivision,
          });
        }
        location.reload();
      } catch (error) {
        this.errors = error?.response?.data?.errors;
      }
    },
    refetch() {
      this.form = {
        title: "",
        slug: "",
        map: "",
        content: "",
        division: null,
        district: null,
      };
      this.editMode = false;
      this.items = [];
      this.fetchItems();
    },
    editItem({ _id, name, email }) {
      this.form = { _id, name, email };
      this.editMode = true;
      this.modal = true;
    },
    async deleteItem(_id, key) {
      if (confirm("Are you sure, you want to delete?")) {
        try {
          await this.$adminApi.deleteUser({ _id });
          this.items[key].deleted = !this.items[key].deleted;
          this.$nuxt.$emit("success", "User deleted successfully");
        } catch (error) {
          this.$nuxt.$emit(
            "error",
            error.response.data?.message || error.message
          );
        }
      }
    },
    async suspendItem(_id, key) {
      if (confirm("Are you sure, you want to delete?")) {
        try {
          await this.$adminApi.suspendUser({ _id });
          this.items[key].suspended = !this.items[key].suspended;
          this.$nuxt.$emit("success", "User suspended successfully");
        } catch (error) {
          this.$nuxt.$emit(
            "error",
            error.response.data?.message || error.message
          );
        }
      }
    },
    async fetchDivision() {
      try {
        const { divisions } = await this.$adminApi.fetchDivision();
        this.divisions = divisions;
      } catch (error) {
        console.error(error);
      }
    },
    async fetchDistrict() {
      try {
        if (this.form.division.length === 0) return;
        const { districts } = await this.$adminApi.fetchDistrict(
          this.form.division
        );
        this.districts = districts;
      } catch (error) {
        console.error(error);
      }
    },
    addContent() {
      try {
        this.form.content.push(JSON.parse(this.content));
        this.content = "";
      } catch (error) {
        console.error(error);
      }
    },
    copy(val) {
      try {
        const part1 = `please give me an array of objects based on "${this.form.title}, ${this.selectDistrict}" in its topics Introduction, Accessibility, Cost and Fees, Food and dishes, Attractions and Activities, Amenities and Services, Safety and Health. output should be in HTML format h2 and article tag only where h2 is the title and make it short title and article is content. in this article tag, you can use p tag, ul li, table, etc and whatever html element you want and make content detailed minimum 5000 character each content and use as much as possible with related and valid details. do not return anything else like JSON, XML, or anything else.`;
        const part2 = `please give me an array of objects based on "${this.form.title}, ${this.selectDistrict}" in its topics Weather and Best Time to Visit, Reviews and Recommendations, Local Culture and Etiquette, Nearby Accommodations, Seasonal Events. output should be in HTML format h2 and article tag only where h2 is the title and make it short title and article is content. in this article tag, you can use p tag, ul li, table, etc and whatever html element you want and content should be detailed. do not return anything else like JSON, XML, or anything else.`;
        const textArea = document.createElement("textarea");
        textArea.value = val === 1 ? part1 : part2;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
        this.$nuxt.$emit("success", "Copied successfully");
      } catch (err) {
        this.$nuxt.$emit("error", "Failed to copy text: " + err);
        console.error("Failed to copy text: ", err);
      }
    },
  },
};
</script>

<style>
.fullmap iframe {
  width: 100% !important;
  height: 310px !important;
}
</style>
