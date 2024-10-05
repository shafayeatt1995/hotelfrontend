<template>
  <div>
    <section
      class="flex flex-col w-full lg:px-4 lg:justify-between lg:items-center lg:flex-row mb-5"
    >
      <div>
        <h2 class="text-3xl font-medium text-gray-700">
          <i class="fas fa-hotel"></i> Bed Type
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
        <template #icon="{ value }">
          <div v-html="value"></div>
        </template>
        <template #actions="{ item, index }">
          <div class="flex gap-2">
            <Button @click.native.prevent="editItem(item)">
              <i class="fas fa-pen-to-square" />
              Edit
            </Button>
            <Button
              :variant="item.deleted ? 'green' : 'red'"
              @click.native.prevent="deleteItem(item._id, index)"
            >
              <i class="fas fa-xmark" />Delete
            </Button>
          </div>
        </template>
        <template #empty v-if="items.length === 0 && !loading">
          <div class="flex items-center text-center h-96 bg-white">
            <EmptyMessage
              @action="modal = true"
              title="No Bed Type found"
              buttonText="Add Bed Type"
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

    <Modal v-model="modal">
      <template #title>
        <div class="flex justify-between items-center">
          <h1
            class="text-lg font-medium leading-6 text-gray-700 capitalize"
            id="modal-title"
          >
            {{ editMode ? "Edit" : "Create new" }} Bed Type
          </h1>
          <CloseButton @click.native.prevent="modal = false" />
        </div>
      </template>
      <template #body>
        <form class="mt-4" @submit.prevent="submit">
          <Input
            v-for="(field, i) in inputFields"
            :key="i"
            :field="field"
            v-model="form"
            :errors="errors"
          />
          <div class="mt-4 flex items-center gap-3">
            <Button
              variant="red"
              type="button"
              class="w-full tracking-wide flex-1"
              @click.native.prevent="modal = false"
            >
              Cancel
            </Button>
            <Button type="submit" class="w-full tracking-wide flex-1">
              {{ editMode ? "Update" : "Create" }} Bed Type
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
import { strSlug } from "@/utils";

export default {
  name: "BedTypePage",
  layout: "dashboard",
  middleware: "superAdmin",
  head() {
    return {
      title: `Bed Type - ${this.$pageTitle}`,
    };
  },
  data() {
    return {
      modal: false,
      form: {
        _id: "",
        name: "",
        slug: "",
        icon: "",
      },
      editMode: false,
      items: [],
      perPage: 30,
      loading: true,
      errors: {},
      search: "",
      searchTimeout: null,
    };
  },
  computed: {
    fields() {
      const fields = [
        { key: "name", label: "Name", span: "minmax(200PX, 1fr)" },
        { key: "slug", label: "Slug", span: "minmax(200PX, 1fr)" },
        { key: "icon", label: "Icon", span: "minmax(200PX, 1fr)" },
        { key: "actions", label: "Actions", span: "minmax(250px, 1fr)" },
      ];
      return fields;
    },
    inputFields() {
      const fields = [
        {
          type: "text",
          placeholder: "Name",
          name: "name",
          label: "Name",
        },
        {
          type: "text",
          placeholder: "Slug",
          name: "slug",
          label: "Slug",
        },
        {
          type: "text",
          placeholder: "Icon",
          name: "icon",
          label: "Icon",
        },
      ];
      return fields;
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
          slug: "",
          icon: "",
        };
        this.editMode = false;
        this.errors = {};
      }
    },
    "form.name"(val) {
      this.form.slug = strSlug(val);
    },
  },
  mounted() {
    this.fetchItems();
  },
  methods: {
    async fetchItems() {
      try {
        const params = {
          perPage: this.perPage,
          page: this.items.length / this.perPage + 1,
          search: this.search,
        };
        if (Number.isInteger(params.page)) {
          const { items } = await this.$adminApi.fetchBedType(params);
          this.items = this.items.concat(items);
        }
      } catch (error) {
      } finally {
        this.loading = false;
      }
    },
    async submit() {
      try {
        if (this.editMode) {
          await this.$adminApi.updateBedType(this.form);
        } else {
          await this.$adminApi.createBedType(this.form);
        }
        this.$nuxt.$emit(
          "success",
          `Bed type ${this.editMode ? "updated" : "created"} successfully`
        );
        this.refetch();
        this.modal = false;
      } catch (error) {
        this.errors = error?.response?.data?.errors;
      }
    },
    refetch() {
      this.form = {
        _id: "",
        name: "",
        slug: "",
        icon: "",
      };
      this.editMode = false;
      this.items = [];
      this.fetchItems();
    },
    editItem(form) {
      this.form = { ...form };
      this.editMode = true;
      this.modal = true;
    },
    async deleteItem(_id, key) {
      if (confirm("Are you sure, you want to delete?")) {
        try {
          await this.$adminApi.deleteBedType({ _id });
          this.items.splice(key, 1);
          this.$nuxt.$emit("success", "Bed type deleted successfully");
        } catch (error) {
          this.$nuxt.$emit(
            "error",
            error.response.data?.message || error.message
          );
        }
      }
    },
  },
};
</script>
