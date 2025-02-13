<template>
  <div>
    <section
      class="flex flex-col w-full lg:px-4 lg:justify-between lg:items-center lg:flex-row mb-5"
    >
      <div>
        <h2 class="text-3xl font-medium text-gray-700">
          <i class="fas fa-user"></i> Users
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
              title="No user found"
              buttonText="Add user"
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
            {{ editMode ? "Edit" : "Create new" }} user
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
              {{ editMode ? "Update" : "Create" }} user
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
export default {
  name: "UserPage",
  layout: "dashboard",
  head() {
    return {
      title: `User - ${this.$pageTitle}`,
    };
  },
  data() {
    return {
      modal: false,
      form: {
        _id: "",
        name: "",
        email: "",
        password: "",
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
    inputFields() {
      const fields = [
        {
          type: "text",
          placeholder: "Name",
          icon: "fas fa-user",
          name: "name",
          label: "Name",
        },
        {
          type: "text",
          placeholder: "email",
          icon: "fas fa-envelope",
          name: "email",
          label: "Email",
        },
        {
          type: "password",
          placeholder: "Password",
          icon: "fas fa-key",
          name: "password",
          label: "Password",
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
          email: "",
          password: "",
        };
        this.editMode = false;
        this.errors = {};
      }
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
          const { items } = await this.$adminApi.fetchUser(params);
          this.items = this.items.concat(items);
        }
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    async submit() {
      try {
        if (this.editMode) {
          await this.$adminApi.updateUser(this.form);
        } else {
          await this.$adminApi.createUser(this.form);
        }
        this.$nuxt.$emit(
          "success",
          `User ${this.editMode ? "updated" : "created"} successfully`
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
        email: "",
        password: "",
        type: "user",
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
  },
};
</script>
