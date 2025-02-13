<template>
  <div>
    <section
      class="flex flex-col w-full lg:px-4 lg:justify-between lg:items-center lg:flex-row mb-5"
    >
      <div>
        <h2 class="text-3xl font-medium text-gray-700">
          <i class="fas fa-hotel"></i> Room
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
        <template #roomType="{ item }">
          {{ item?.roomType?.name }}
        </template>
        <template #status="{ value, item }">
          <ToggleSwitch
            :value="value"
            @click.native.prevent.stop="toggleStatus(item)"
          />
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
              <i class="fas fa-xmark" /> Delete
            </Button>
          </div>
        </template>
        <template #empty v-if="items.length === 0 && !loading">
          <div class="flex items-center text-center h-96 bg-white">
            <EmptyMessage
              @action="modal = true"
              title="No Room found"
              buttonText="Add room"
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
            {{ editMode ? "Edit" : "Create new" }} Room
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
              {{ editMode ? "Update" : "Create" }} room
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
  name: "RoomPage",
  layout: "dashboard",
  middleware: "owner",
  head() {
    return {
      title: `Room - ${this.$pageTitle}`,
    };
  },
  data() {
    return {
      modal: false,
      form: {
        _id: "",
        name: "",
        roomTypeID: "",
      },
      editMode: false,
      items: [],
      perPage: 30,
      loading: true,
      errors: {},
      search: "",
      searchTimeout: null,
      roomType: [],
    };
  },
  computed: {
    fields() {
      const fields = [
        { key: "name", label: "Name", span: "minmax(200PX, 1fr)" },
        { key: "roomType", label: "Room type", span: "minmax(200PX, 1fr)" },
        { key: "status", label: "Status", span: "minmax(120PX, 1fr)" },
        { key: "actions", label: "Actions", span: "minmax(250px, 1fr)" },
      ];
      return fields;
    },
    inputFields() {
      const fields = [
        {
          type: "text",
          placeholder: "Room name",
          name: "name",
          label: "Room name",
        },
        {
          type: "select",
          placeholder: "Room type",
          name: "roomTypeID",
          label: "Room type",
          options: this.roomType.map(({ _id, name }) => ({
            label: name,
            value: _id,
          })),
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
        this.editMode = false;
        this.form = {
          _id: "",
          name: "",
          roomTypeID: "",
        };
        this.errors = {};
      }
    },
  },
  mounted() {
    this.fetchItems();
    this.fetchApproveRoomType();
  },
  methods: {
    async fetchApproveRoomType() {
      try {
        const { roomType } = await this.$ownerApi.fetchApproveRoomType();
        this.roomType = roomType;
      } catch (error) {}
    },
    async fetchItems() {
      try {
        const params = {
          perPage: this.perPage,
          page: this.items.length / this.perPage + 1,
          search: this.search,
        };
        if (Number.isInteger(params.page)) {
          const { items } = await this.$ownerApi.fetchRoom(params);
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
          await this.$ownerApi.updateRoom(this.form);
        } else {
          await this.$ownerApi.createRoom(this.form);
        }
        this.$nuxt.$emit(
          "success",
          `Room ${this.editMode ? "updated" : "created"} successfully`
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
        roomTypeID: "",
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
          await this.$ownerApi.deleteRoom({ _id });
          this.items.splice(key, 1);
          this.$nuxt.$emit("success", "Room deleted successfully");
        } catch (error) {
          this.$nuxt.$emit(
            "error",
            error.response.data?.message || error.message
          );
        }
      }
    },
    async toggleStatus({ _id }) {
      try {
        await this.$ownerApi.toggleRoomStatus({ _id });
        const index = this.items.findIndex((_) => _._id === _id);
        if (index !== -1) {
          this.items[index].status = !this.items[index].status;
        }
      } catch (error) {}
    },
  },
};
</script>
