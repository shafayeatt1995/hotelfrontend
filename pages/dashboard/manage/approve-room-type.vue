<template>
  <div>
    <section
      class="flex flex-col w-full lg:px-4 lg:justify-between lg:items-center lg:flex-row mb-5"
    >
      <div>
        <h2 class="text-3xl font-medium text-gray-700">
          <i class="fas fa-hotel"></i> Approve Room Type
        </h2>
      </div>

      <div class="flex mt-4 md:mt-0 gap-2">
        <input
          v-model="search"
          class="border px-2 rounded-md border-gray-300 h-9 w-full"
          placeholder="Search"
        />
      </div>
    </section>

    <section class="lg:px-4">
      <TableResponsive
        :fields="fields"
        :items="loading ? 10 : items"
        :skeleton="loading"
      >
        <template #approved="{ value }">
          <Badge
            :title="value ? 'Approved' : 'Not approved'"
            :variant="value ? 'green' : 'red'"
          />
        </template>
        <template #hotel="{ item }">
          {{ item?.hotel?.name }}
        </template>
        <template #actions="{ item, index }">
          <div class="flex gap-2" v-if="!item.approved">
            <Button @click.native.prevent="toggleApprovedRoomType(item)">
              <i class="fas fa-check" />
              Approved
            </Button>
            <Button
              :variant="item.deleted ? 'green' : 'red'"
              @click.native.prevent="rejectItem(item._id, index)"
            >
              <i class="fas fa-xmark" />Reject
            </Button>
          </div>
        </template>
        <template #empty v-if="items.length === 0 && !loading">
          <div class="flex items-center text-center h-96 bg-white">
            <EmptyMessage
              @action="modal = true"
              title="No Room Type found"
              buttonText="Add Room Type"
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
  </div>
</template>

<script>
export default {
  name: "ApproveRoomTypePage",
  layout: "dashboard",
  middleware: "admin",
  head() {
    return {
      title: `Approve Room Type - ${this.$pageTitle}`,
    };
  },
  data() {
    return {
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
        { key: "hotel", label: "Hotel", span: "minmax(200PX, 1fr)" },
        { key: "approved", label: "approved", span: "minmax(200PX, 1fr)" },
        { key: "actions", label: "Actions", span: "minmax(250px, 1fr)" },
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
          const { items } = await this.$adminApi.fetchNotApproveRoomType(
            params
          );
          this.items = this.items.concat(items);
        }
      } catch (error) {
      } finally {
        this.loading = false;
      }
    },
    async toggleApprovedRoomType({ _id }) {
      try {
        if (confirm("Are you sure, you want to approve?")) {
          await this.$adminApi.toggleApprovedRoomType({ _id });
          const index = this.items.findIndex((_) => _._id === _id);
          if (index !== -1) {
            this.items[index].approved = !this.items[index].approved;
          }
        }
        this.$nuxt.$emit("success", `Room type approved successfully`);
      } catch (error) {
        this.$nuxt.$emit("error", `Room type isn't approved`);
      }
    },
    async rejectItem(_id, key) {
      if (confirm("Are you sure, you want to delete?")) {
        try {
          await this.$adminApi.deleteRoomType({ _id });
          this.items.splice(key, 1);
          this.$nuxt.$emit("success", "Room type reject successfully");
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
