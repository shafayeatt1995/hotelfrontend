<template>
  <div>
    <section
      class="flex flex-col w-full lg:px-4 lg:justify-between lg:items-center lg:flex-row mb-5"
    >
      <div>
        <h2 class="text-3xl font-medium text-gray-700">
          <i class="fas fa-hotel"></i> Room Type
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
        <template #commissionAmount="{ value }">
          {{ value | cleanDecimal }}
        </template>
        <template #status="{ value, item }">
          <ToggleSwitch
            :value="value"
            @click.native.prevent.stop="toggleStatus(item)"
          />
        </template>
        <template #approved="{ value }">
          <Badge
            :title="value ? 'Approved' : 'Not approved'"
            :variant="value ? 'green' : 'red'"
          />
        </template>
        <template #actions="{ item }">
          <div class="flex gap-2">
            <Button @click.native.prevent="editItem(item)">
              <i class="fas fa-pen-to-square" />
              Edit
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

    <Modal v-model="modal">
      <template #title>
        <div class="flex justify-between items-start">
          <div class="text-gray-700">
            <h1
              class="text-lg font-medium leading-6 capitalize"
              id="modal-title"
            >
              {{ editMode ? "Edit" : "Create new" }} Room Type
            </h1>
            <div class="flex justify-between gap-4">
              <p>+ User Price:</p>
              <p>
                <del class="text-red-500" v-if="form.discount > 0">{{
                  form.dealingAmount
                }}</del>
                {{ totalPriceWithDiscount }}
              </p>
            </div>
            <div class="flex justify-between gap-4 border-b border-gray-300">
              <p>- Commission:</p>
              <p>
                {{ myCommission | cleanDecimal }}
              </p>
            </div>
            <div class="flex justify-between gap-4">
              <p>= My profit:</p>
              <p>{{ myProfit | cleanDecimal }}</p>
            </div>
            <div class="border-b border-gray-300 flex justify-between gap-4">
              <p>+ Tax:</p>
              <p>{{ taxAmount | cleanDecimal }}</p>
            </div>
            <div class="flex justify-between gap-4">
              <p>= Total Amount:</p>
              <p>{{ (+myProfit + +taxAmount) | cleanDecimal }}</p>
            </div>
          </div>
          <CloseButton @click.native.prevent="modal = false" />
        </div>
      </template>
      <template #body>
        <form class="mt-4" @submit.prevent="submit">
          <div class="grid lg:grid-cols-2 grid-cols-1 gap-x-4">
            <Input
              v-for="(field, i) in inputFields"
              :key="i"
              :field="field"
              v-model="form"
              :errors="errors"
            />
          </div>
          <hr class="my-5" />
          <div>
            <label class="text-gray-700"
              >Complements ({{ form.complements.length }})</label
            >
            <div class="flex flex-wrap gap-x-3 gap-y-2">
              <div v-for="(data, i) in complements" :key="i">
                <Badge
                  :variant="checkComplements(data) ? 'indigo' : 'gray'"
                  @click.native.prevent="selectComplements(data)"
                  class="cursor-pointer"
                >
                  <p>{{ data.name }}</p>
                  <p>({{ data.item }})</p>
                </Badge>
              </div>
            </div>
          </div>
          <hr class="my-5" />
          <div>
            <h2 class="text-lg font-semibold text-gray-700">Bed information</h2>
            <small
              class="text-rose-700"
              v-if="
                errors &&
                errors.bedPerRoomType &&
                typeof errors.bedPerRoomType === 'object'
              "
            >
              <i>{{ errors.bedPerRoomType.msg }}</i>
            </small>
            <div class="grid lg:grid-cols-2 grid-cols-1 gap-4">
              <div
                v-for="(_, key) in form.bedPerRoomType"
                :key="`_${key}`"
                class="flex gap-2"
              >
                <select
                  class="block w-full py-2 text-gray-700 bg-white border rounded-lg focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40 capitalize"
                  v-model="form.bedPerRoomType[key]"
                >
                  <option
                    :value="option._id"
                    v-for="(option, i) in beds"
                    :key="i"
                  >
                    {{ option.name }}
                  </option>
                </select>
                <Button
                  v-if="form.bedPerRoomType.length > 1"
                  variant="red"
                  @click.native.prevent="form.bedPerRoomType.splice(key, 1)"
                  ><i class="fa-solid fa-xmark"></i
                ></Button>
              </div>
              <Button
                @click.native.prevent="form.bedPerRoomType.push('')"
                class="w-full"
                ><i class="fa-solid fa-plus"></i> Add room</Button
              >
            </div>
          </div>
          <div
            @click="imageModal = true"
            class="border rounded-lg mt-3 h-60 cursor-pointer flex-1"
          >
            <div
              class="flex flex-wrap h-full overflow-y-auto"
              v-if="form.images.length"
            >
              <img
                v-for="(data, i) in form.images"
                :key="i"
                loading="lazy"
                :src="data"
                :alt="data"
                class="object-cover size-40 p-3"
              />
            </div>
            <div
              class="flex flex-col items-center justify-center size-full"
              v-else
            >
              <i class="far fa-image text-8xl text-indigo-600" />
              <p class="text-lg px-10 text-gray-700">Select room images</p>
            </div>
          </div>
          <small
            class="text-rose-700"
            v-if="errors && errors.images && typeof errors.images === 'object'"
          >
            <i>{{ errors.images.msg }}</i>
          </small>
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
              {{ editMode ? "Update" : "Create" }} Room Type
            </Button>
          </div>
        </form>
      </template>
    </Modal>

    <ImageModal v-model="imageModal" :selected.sync="form.images" multiple />
    <KeyTrigger eventKey="/" @action="modal = true" />
    <KeyTrigger eventKey="Escape" @action="modal = false" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { strSlug } from "@/utils";

export default {
  name: "RoomTypePage",
  layout: "dashboard",
  middleware: "owner",
  head() {
    return {
      title: `Room Type - ${this.$pageTitle}`,
    };
  },
  data() {
    return {
      modal: false,
      imageModal: false,
      form: {
        _id: "",
        name: "",
        slug: this.$auth.user.hotel.slug,
        accommodationType: "",
        dealingAmount: 0,
        commission: 10,
        cancelFee: 0,
        cancelStatus: true,
        coin: 0,
        bathroom: "1 Bedroom, 1 Bed",
        bedroom: "1 Shower, 1 Commode",
        checkIn: "12:00 PM",
        checkOut: "11:00 AM",
        adult: 0,
        child: 0,
        tax: 0,
        discount: 0,
        facilities: [],
        complements: [],
        bedPerRoomType: [""],
        images: [],
      },
      editMode: false,
      items: [],
      perPage: 30,
      loading: true,
      errors: {},
      search: "",
      searchTimeout: null,
      complements: [],
    };
  },
  computed: {
    ...mapGetters(["facilities", "beds", "accommodationType"]),
    sortFacilities() {
      const facility = [...this.facilities];
      return facility.sort((a, b) => a.name.localeCompare(b.name));
    },
    fields() {
      const fields = [
        { key: "name", label: "Name", span: "minmax(200PX, 1fr)" },
        { key: "price", label: "price", span: "minmax(150PX, 1fr)" },
        {
          key: "commissionAmount",
          label: "commission Amount",
          span: "minmax(150PX, 1fr)",
        },
        { key: "cancelFee", label: "Cancel fee", span: "minmax(150PX, 1fr)" },
        {
          key: "cancelStatus",
          label: "Cancel status",
          span: "minmax(150PX, 1fr)",
        },
        { key: "status", label: "status", span: "minmax(150PX, 1fr)" },
        { key: "approved", label: "approved", span: "minmax(150PX, 1fr)" },
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
          span: "full",
        },
        {
          type: "text",
          placeholder: "Slug",
          name: "slug",
          label: "Slug",
        },
        {
          type: "select",
          placeholder: "Accommodation type",
          name: "accommodationType",
          label: "Accommodation type",
          options: this.accommodationType.map(({ _id, name }) => ({
            label: name,
            value: _id,
          })),
        },
        {
          type: "number",
          placeholder: "Dealing amount",
          name: "dealingAmount",
          label: "Dealing amount",
        },
        {
          type: "number",
          placeholder: "Commission %",
          name: "commission",
          label: "Commission %",
          disabled: this.editMode,
        },
        {
          type: "number",
          placeholder: "Discount amount",
          name: "discount",
          label: "Discount amount",
        },
        {
          type: "number",
          placeholder: "Tax %",
          name: "tax",
          label: "Tax %",
          disabled: this.editMode,
        },
        {
          type: "number",
          placeholder: "Cancellation fee",
          name: "cancelFee",
          label: "Cancellation fee",
        },
        {
          type: "select",
          placeholder: "Cancellation status",
          name: "cancelStatus",
          label: "Cancellation status",
          options: [
            { label: "Cancellation available", value: true },
            { label: "Cancellation not available", value: false },
          ],
        },
        // {
        //   type: "number",
        //   placeholder: "Coin",
        //   name: "coin",
        //   label: "Coin",
        //   disabled: this.editMode,
        // },
        {
          type: "text",
          placeholder: "Check in",
          name: "checkIn",
          label: "Check in",
        },
        {
          type: "text",
          placeholder: "Check out",
          name: "checkOut",
          label: "Check out",
        },
        {
          type: "text",
          placeholder: "Bedroom",
          name: "bedroom",
          label: "Bedroom",
        },
        {
          type: "text",
          placeholder: "Bathroom",
          name: "bathroom",
          label: "Bathroom",
        },
        {
          type: "number",
          placeholder: "Total adult",
          name: "adult",
          label: "Total adult",
        },
        {
          type: "number",
          placeholder: "Total child",
          name: "child",
          label: "Total child",
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
          span: "full",
        },
      ];
      return fields;
    },
    roomInformationInputFields() {
      const fields = [
        {
          type: "number",
          placeholder: "Total room",
          name: "totalRoom",
          label: "Total room",
        },
      ];
      return fields;
    },
    totalPriceWithDiscount() {
      return +this.form.dealingAmount - +this.form.discount;
    },
    myProfit() {
      return +this.totalPriceWithDiscount - +this.myCommission;
    },
    myCommission() {
      const baseAmount =
        Math.ceil((+this.form.dealingAmount - +this.form.discount) / 500) * 500;
      const commission = baseAmount * (+this.form.commission / 100);
      return commission;
    },
    taxAmount() {
      return Math.round(this.totalPriceWithDiscount * (this.form.tax / 100));
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
          slug: this.$auth.user.hotel.slug,
          accommodationType: "",
          dealingAmount: 0,
          commission: 10,
          cancelFee: 0,
          cancelStatus: true,
          coin: 0,
          bathroom: "1 Bedroom, 1 Bed",
          bedroom: "1 Shower, 1 Commode",
          checkIn: "12:00 PM",
          checkOut: "11:00 AM",
          adult: 0,
          child: 0,
          tax: 0,
          discount: 0,
          facilities: [],
          complements: [],
          bedPerRoomType: [""],
          images: [],
        };
        this.editMode = false;
        this.errors = {};
      }
    },
    "form.name"(val) {
      this.form.slug = this.$auth.user.hotel.slug + "_" + strSlug(val);
    },
  },
  mounted() {
    this.loadAllData();
  },
  methods: {
    ...mapActions([
      "fetchAllAccommodationTypeOnce",
      "fetchAllFacilitiesOnce",
      "fetchAllBedsOnce",
    ]),
    async loadAllData() {
      await Promise.all([
        this.fetchItems(),
        this.additionalData(),
        this.fetchAllAccommodationTypeOnce(),
        this.fetchAllFacilitiesOnce(),
        this.fetchAllBedsOnce(),
      ]);
    },
    async additionalData() {
      try {
        const { complements } = await this.$ownerApi.fetchHotelInformation();
        this.complements = complements || [];
      } catch (e) {}
    },
    async fetchItems() {
      try {
        const params = {
          perPage: this.perPage,
          page: this.items.length / this.perPage + 1,
          search: this.search,
        };
        if (Number.isInteger(params.page)) {
          const { items } = await this.$ownerApi.fetchRoomType(params);
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
          await this.$ownerApi.updateRoomType(this.form);
        } else {
          await this.$ownerApi.createRoomType(this.form);
        }
        this.$nuxt.$emit(
          "success",
          `Room type ${this.editMode ? "updated" : "created"} successfully`
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
        slug: this.$auth.user.hotel.slug,
        accommodationType: "",
        dealingAmount: 0,
        commission: 10,
        cancelFee: 0,
        cancelStatus: true,
        coin: 0,
        bathroom: "1 Bedroom, 1 Bed",
        bedroom: "1 Shower, 1 Commode",
        checkIn: "12:00 PM",
        checkOut: "11:00 AM",
        adult: 0,
        child: 0,
        tax: 0,
        discount: 0,
        facilities: [],
        complements: [],
        bedPerRoomType: [""],
        images: [],
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
          await this.$ownerApi.deleteRoomType({ _id });
          this.items.splice(key, 1);
          this.$nuxt.$emit("success", "Room type deleted successfully");
        } catch (error) {
          this.$nuxt.$emit(
            "error",
            error.response.data?.message || error.message
          );
        }
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
    checkComplements({ _id }) {
      return this.form.complements.includes(_id);
    },
    selectComplements({ _id }) {
      const index = this.form.complements.findIndex((data) => _id === data);
      if (index === -1) {
        this.form.complements.push(_id);
      } else {
        this.form.complements.splice(index, 1);
      }
    },
    async toggleStatus({ _id }) {
      try {
        await this.$ownerApi.toggleRoomTypeStatus({ _id });
        const index = this.items.findIndex((_) => _._id === _id);
        if (index !== -1) {
          this.items[index].status = !this.items[index].status;
        }
      } catch (error) {}
    },
  },
};
</script>
