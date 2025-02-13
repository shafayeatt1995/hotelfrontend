<template>
  <div>
    <section
      class="flex flex-col w-full lg:px-4 lg:justify-between lg:items-center lg:flex-row mb-5"
    >
      <div>
        <h2 class="text-3xl font-medium text-gray-700">
          <i class="fas fa-hotel"></i> Hotels
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
        <template #image="{ value }">
          <img
            loading="lazy"
            :src="value"
            :alt="value"
            class="max-w-40 max-h-36"
          />
        </template>
        <template #locationID="{ value }">
          {{ getLocation(value)?.name || "" }}
        </template>
        <template #management="{ item }">
          <div class="flex flex-col">
            <p>Owner: {{ item.owners.length || 0 }}</p>
            <p>Manager: {{ item.managers.length || 0 }}</p>
          </div>
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
          <div class="grid grid-cols-2 gap-2 justify-center flex-1">
            <Button @click.native.prevent="manageUser(item)">
              <i class="fas fa-user" />
              Manage users
            </Button>
            <Button @click.native.prevent="editItem(item)">
              <i class="fas fa-pen-to-square" />
              Edit
            </Button>
            <Button
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
              title="No hotel found"
              buttonText="Add hotel"
              icon="far fa-circle-xmark"
              iconClass="rotate-45"
            />
          </div>
        </template>
      </TableResponsive>
      <Observer @load="fetchItems" v-if="items.length > 0">
        <Spinner
          class="text-green-600 h-7 w-7"
          v-if="items.length % perPage === 0"
        />
      </Observer>
    </section>

    <Modal v-model="modal">
      <template #title>
        <div class="flex justify-between items-center">
          <h1
            class="text-lg font-medium leading-6 text-gray-700 capitalize"
            id="modal-title"
          >
            {{ editMode ? "Edit" : "Create new" }} hotel
          </h1>
          <CloseButton @click.native.prevent="modal = false" />
        </div>
      </template>
      <template #body>
        <form @submit.prevent="submit">
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
              {{ editMode ? "Update" : "Create" }} hotel
            </Button>
          </div>
        </form>
      </template>
    </Modal>

    <Modal v-model="omModal">
      <template #title>
        <div class="flex justify-between items-center">
          <h1
            class="text-lg font-medium leading-6 text-gray-700 capitalize"
            id="modal-title"
          >
            Manager user
          </h1>
          <CloseButton @click.native.prevent="omModal = false" />
        </div>
      </template>
      <template #body>
        <div class="text-gray-700 mt-3">
          <h2 class="text-xl">Owners</h2>
          <div class="grid lg:grid-cols-3 gap-3">
            <div
              class="border-2 border-indigo-500 p-2 rounded-xl bg-indigo-100 shadow-md shadow-indigo-100 relative"
              v-for="(user, index) in om.owner"
              :key="user._id"
            >
              <p
                class="cursor-pointer size-5 rounded-full text-red-500 absolute top-1 right-1 flex justify-center items-center text-lg"
                @click="removeOm('owner', index)"
              >
                <i class="fa-regular fa-circle-xmark"></i>
              </p>

              <p class="truncate">{{ user.name }}</p>
              <p class="truncate cursor-pointer" @click="copyText(user.email)">
                {{ user.email }}
              </p>
            </div>
          </div>
        </div>
        <hr class="my-3" />
        <div class="text-gray-700">
          <h2 class="text-xl">Managers</h2>
          <div class="grid lg:grid-cols-3 gap-3">
            <div
              class="border-2 border-indigo-500 p-2 rounded-xl bg-indigo-100 shadow-md shadow-indigo-100 relative"
              v-for="(user, index) in om.manager"
              :key="user._id"
            >
              <p
                class="cursor-pointer size-5 rounded-full text-red-500 absolute top-1 right-1 flex justify-center items-center text-lg"
                @click="removeOm('manager', index)"
              >
                <i class="fa-regular fa-circle-xmark"></i>
              </p>

              <p>{{ user.name }}</p>
              <p>{{ user.email }}</p>
            </div>
          </div>
        </div>
        <hr class="mt-3" />
        <div>
          <h2 class="text-xl">Add users</h2>
          <Input
            v-for="(field, i) in omInputFields"
            :key="i"
            :field="field"
            v-model="omForm"
            :errors="errors"
          />
          <div class="h-96 border mt-2 rounded-lg overflow-y-auto mb-3">
            <TableResponsive :fields="omFields" :items="checkUsers">
              <template #actions="{ item }">
                <div class="grid grid-cols-2 gap-2">
                  <Button @click.native.prevent="addUser('manager', item)">
                    <i class="fas fa-plus" />
                    Add Manage
                  </Button>
                  <Button @click.native.prevent="addUser('owner', item)">
                    <i class="fas fa-plus" />
                    Add Owner
                  </Button>
                </div>
              </template>
              <template #empty v-if="checkUsers.length === 0">
                <div class="flex items-center text-center h-96 bg-white">
                  <EmptyMessage title="No users found" />
                </div>
              </template>
            </TableResponsive>
            <Observer @load="fetchUsers" v-if="users.length > 0">
              <Spinner
                class="text-green-600 h-7 w-7"
                v-if="users.length % perPage === 0"
              />
            </Observer>
          </div>
        </div>
        <div class="flex gap-3">
          <Button
            @click.native.prevent="omModal = false"
            variant="red"
            class="flex-1"
          >
            <i class="fas fa-xmark" />
            Close modal
          </Button>
          <Button @click.native.prevent="submitUser()" class="flex-1">
            <i class="fas fa-check-circle" />
            Update User
          </Button>
        </div>
      </template>
    </Modal>
    <KeyTrigger eventKey="/" @action="modal = true" />
    <KeyTrigger eventKey="Escape" @action="modal = false" />
  </div>
</template>

<script>
import { strSlug } from "@/utils";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "HotelPage",
  layout: "dashboard",
  head() {
    return {
      title: `Hotel - ${this.$pageTitle}`,
    };
  },
  data() {
    return {
      modal: false,
      form: {
        _id: "",
        name: "",
        slug: "",
        address: "",
        locationID: "",
        mapAddress: "",
        bankAccountNumber: "",
        bankAccountHolderName: "",
        bankName: "",
        accommodations: [],
        facilities: [],
        nid: true,
      },
      omForm: { email: "" },
      editMode: false,
      items: [],
      perPage: 30,
      loading: true,
      errors: {},
      search: "",
      searchTimeout: null,
      om: { _id: null, manager: [], owner: [] },
      omLoading: false,
      omModal: false,
      fetchUserLoading: false,
      users: [],
    };
  },
  computed: {
    ...mapGetters(["locations", "accommodationType", "facilities"]),
    fields() {
      const fields = [
        { key: "image", label: "Image", span: "minmax(175PX, 1fr)" },
        { key: "name", label: "Name", span: "minmax(200PX, 1fr)" },
        { key: "locationID", label: "Location", span: "minmax(200PX, 1fr)" },
        { key: "address", label: "Address", span: "minmax(200PX, 1fr)" },
        { key: "management", label: "Management", span: "minmax(200PX, 1fr)" },
        { key: "suspended", label: "Suspended", span: "minmax(120PX, 1fr)" },
        { key: "deleted", label: "Delete", span: "minmax(120PX, 1fr)" },
        {
          key: "actions",
          label: "Actions",
          span: "minmax(350px, 1fr)",
          hideSmLabel: true,
        },
      ];
      return fields;
    },
    omFields() {
      const fields = [
        { key: "name", label: "Name", span: "minmax(200PX, 1fr)" },
        { key: "email", label: "Email", span: "minmax(200PX, 1fr)" },
        { key: "actions", label: "Actions", span: "minmax(375px, 1fr)" },
      ];
      return fields;
    },
    inputFields() {
      const fields = [
        {
          type: "text",
          label: "Name",
          placeholder: "Name",
          icon: "fas fa-hotel",
          name: "name",
        },
        {
          type: "text",
          label: "Slug",
          placeholder: "Slug",
          icon: "fas fa-hotel",
          name: "slug",
        },
        {
          type: "text",
          label: "Address",
          placeholder: "Address",
          icon: "fas fa-location-dot",
          name: "address",
        },
        {
          type: "text",
          label: "Google map Address",
          placeholder: "Google map address",
          icon: "fas fa-location-dot",
          name: "mapAddress",
        },
        {
          type: "select",
          label: "Location",
          placeholder: "Location",
          icon: "fas fa-location-dot",
          name: "locationID",
          options: this.locations.map(({ _id, name }) => ({
            label: name,
            value: _id,
          })),
        },
        {
          type: "text",
          label: "Bank name",
          placeholder: "Bank name",
          icon: "fas fa-building-columns",
          name: "bankName",
        },
        {
          type: "text",
          label: "Bank account holder name",
          placeholder: "Bank account holder name",
          icon: "fas fa-building-columns",
          name: "bankAccountHolderName",
        },
        {
          type: "text",
          label: "Bank account number",
          placeholder: "Bank account number",
          icon: "fas fa-building-columns",
          name: "bankAccountNumber",
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
        {
          type: "multiSelect",
          label: "Accommodation",
          name: "accommodations",
          options: this.accommodationType.map(({ _id, name }) => ({
            label: name,
            value: _id,
          })),
        },
        {
          type: "multiSelect",
          label: "Facilities",
          name: "facilities",
          options: this.facilities.map(({ _id, name, icon }) => ({
            label: name,
            value: _id,
            icon,
          })),
        },
      ];

      return fields;
    },
    omInputFields() {
      const fields = [
        {
          type: "text",
          label: "Email / ID",
          placeholder: "Email / ID",
          icon: "fas fa-user",
          name: "email",
        },
      ];

      return fields;
    },
    checkUsers() {
      return this.users.filter(
        ({ _id }) =>
          ![
            ...this.om.manager.map(({ _id }) => _id),
            ...this.om.owner.map(({ _id }) => _id),
          ].includes(_id)
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
    "omForm.email"(val) {
      clearTimeout(this.searchTimeout);
      this.searchTimeout = setTimeout(() => {
        this.users = [];
        if (val.length !== 0) {
          this.fetchUsers();
        }
      }, 500);
    },
    modal(val) {
      if (!val) {
        this.form = {
          _id: "",
          name: "",
          slug: "",
          address: "",
          locationID: "",
          mapAddress: "",
          bankAccountNumber: "",
          bankAccountHolderName: "",
          bankName: "",
          accommodations: [],
          facilities: [],
          nid: true,
        };
        this.editMode = false;
        this.errors = {};
      }
    },
    omModal(val) {
      if (!val) {
        this.om = { _id: null, manager: [], owner: [] };
        this.omLoading = false;
        this.omModal = false;
        this.fetchUserLoading = false;
        this.omForm.email = "";
        this.errors = {};
        this.users = [];
      }
    },
    "form.name"(val) {
      this.form.slug = strSlug(val);
    },
  },
  mounted() {
    this.fetchItems();
    this.fetchData();
  },
  methods: {
    ...mapActions([
      "fetchAllAccommodationTypeOnce",
      "fetchAllFacilitiesOnce",
      "fetchAllLocationOnce",
    ]),
    async fetchData() {
      await Promise.all([
        this.fetchAllAccommodationTypeOnce(),
        this.fetchAllFacilitiesOnce(),
        this.fetchAllLocationOnce(),
      ]);
    },
    async fetchItems() {
      try {
        const params = {
          perPage: this.perPage,
          page: this.items.length / this.perPage + 1,
          search: this.search,
        };
        if (Number.isInteger(params.page)) {
          const { items } = await this.$adminApi.fetchHotel(params);
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
          await this.$adminApi.updateHotel(this.form);
        } else {
          await this.$adminApi.createHotel(this.form);
        }
        this.$nuxt.$emit(
          "success",
          `Hotel ${this.editMode ? "updated" : "created"} successfully`
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
        address: "",
        locationID: "",
        mapAddress: "",
        bankAccountNumber: "",
        bankAccountHolderName: "",
        bankName: "",
        accommodations: [],
        facilities: [],
        nid: true,
      };
      this.editMode = false;
      this.items = [];
      this.fetchItems();
    },
    editItem({
      _id,
      name,
      slug,
      address,
      locationID,
      mapAddress,
      accommodations = [],
      facilities = [],
      bankAccountNumber,
      bankAccountHolderName,
      bankName,
      nid = true,
    }) {
      this.form = {
        _id,
        name,
        slug,
        address,
        locationID,
        mapAddress,
        accommodations,
        facilities,
        bankAccountNumber,
        bankAccountHolderName,
        bankName,
        nid,
      };
      this.editMode = true;
      this.modal = true;
    },
    async deleteItem(_id, key) {
      if (confirm("Are you sure, you want to delete?")) {
        try {
          await this.$adminApi.deleteHotel({ _id });
          this.items[key].deleted = !this.items[key].deleted;
          this.$nuxt.$emit("success", "Hotel deleted successfully");
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
          await this.$adminApi.suspendHotel({ _id });
          this.items[key].suspended = !this.items[key].suspended;
          this.$nuxt.$emit("success", "Hotel suspended successfully");
        } catch (error) {
          this.$nuxt.$emit(
            "error",
            error.response.data?.message || error.message
          );
        }
      }
    },
    async manageUser({ managers, owners, _id }) {
      try {
        this.omLoading = true;
        this.omModal = true;
        const { manager, owner } = await this.$adminApi.fetchHotelOM({
          managers,
          owners,
        });
        this.om = { _id, manager, owner };
      } catch (error) {
      } finally {
        this.omLoading = false;
      }
    },
    removeOm(type, index) {
      if (type === "manager") {
        this.om.manager.splice(index, 1);
      } else {
        this.om.owner.splice(index, 1);
      }
    },
    async fetchUsers() {
      try {
        this.fetchUserLoading = true;
        const params = {
          perPage: this.perPage,
          page: this.users.length / this.perPage + 1,
          search: this.omForm.email,
        };
        if (Number.isInteger(params.page)) {
          const { items } = await this.$adminApi.fetchOMUsers(params);
          this.users = this.users.concat(items);
        }
        this.fetchUserLoading = false;
      } catch (error) {}
    },
    addUser(type, data) {
      const { name, email, _id } = data;
      if (type === "manager") {
        this.om.manager.push({ name, email, _id });
      } else {
        this.om.owner.push({ name, email, _id });
      }
    },
    async submitUser() {
      try {
        const managers = this.om.manager.map(({ _id }) => _id);
        const owners = this.om.owner.map(({ _id }) => _id);
        await this.$adminApi.updateOmUser({
          _id: this.om._id,
          managers,
          owners,
        });
        this.$nuxt.$emit("success", `Hotel management updated successfully`);
        this.omModal = false;
      } catch (error) {
        if (error?.response?.data?.email) {
          this.errors = error?.response?.data;
        }
      }
    },
    getLocation(id) {
      return this.locations.find(({ _id }) => _id === id);
    },
    async copyText(email) {
      try {
        await navigator.clipboard.writeText(email);
      } catch (err) {
        console.error("Failed to copy text: ", err);
      }
    },
  },
};
</script>
