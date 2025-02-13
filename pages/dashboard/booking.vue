<template>
  <div>
    <section
      class="flex flex-col w-full lg:px-4 lg:justify-between lg:items-center lg:flex-row mb-5"
    >
      <div>
        <h2 class="text-3xl font-medium text-gray-700">
          <i class="fas fa-clipboard-check"></i> Booking
        </h2>
      </div>

      <div class="flex mt-4 md:mt-0 gap-2">
        <ClientOnly>
          <DatePicker
            v-model="form.date"
            range
            type="date"
            placeholder="Select date"
            prefix-class="xmx"
          />
        </ClientOnly>
      </div>
    </section>

    <section class="lg:px-4">
      <TableResponsive
        :fields="fields"
        :items="loading ? 10 : items"
        :skeleton="loading"
      >
        <template #checkIn="{ value }">{{ value | fullDate }}</template>
        <template #checkOut="{ value }">{{ value | fullDate }}</template>
        <template #status="{ value }">
          <Badge :variant="badgeVariant(value)">
            <p class="capitalize">{{ value }}</p>
          </Badge>
        </template>
        <template #actions="{ item }">
          <Button @click.native.prevent="showBooking(item)"
            >View Details</Button
          >
        </template>
        <template #empty v-if="items.length === 0 && !loading">
          <div class="flex items-center text-center h-96 bg-white">
            <EmptyMessage @action="modal = true" title="No booking found" />
          </div>
        </template>
      </TableResponsive>
      <Observer @load="fetchItems" v-if="items.length > 0 && !fullLoad">
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
            Booking details
          </h1>
          <CloseButton @click.native.prevent="modal = false" />
        </div>
      </template>
      <template #body>
        <div
          class="grid gap-[1px] mt-5 bg-gray-300 border border-gray-300 mx-2 md:mx-0"
        >
          <div
            class="flex justify-between items-center bg-white px-5 py-3 gap-3"
            v-for="(
              { icon, title, value, values, date, amount, status }, key
            ) in bookingDetails"
            :key="key"
          >
            <p class="flex items-center gap-1">
              <i :class="icon"></i> {{ title }}:
            </p>
            <p class="font-semibold text-gray-800 break-all" v-if="value">
              {{ value }}
            </p>
            <p class="font-semibold text-gray-800" v-else-if="amount">
              {{ $taka }}{{ amount | currency }}
            </p>
            <p class="font-semibold text-gray-800" v-else-if="date">
              {{ date | fullDate }}
            </p>
            <p class="font-semibold text-gray-800" v-else-if="status">
              <Badge :variant="statusVariant(status)">
                {{ status }}
              </Badge>
            </p>
            <template v-else-if="values">
              <div
                class="flex flex-col justify-center font-semibold text-gray-800"
              >
                <p v-for="(val, key) in values" :key="`${key}-val`">
                  {{ ++key }}. {{ val }}
                </p>
              </div>
            </template>
          </div>
        </div>
      </template>
    </Modal>
  </div>
</template>

<script>
import { endDate, startDate, validateDate } from "@/utils";

export default {
  name: "BookingPage",
  layout: "dashboard",
  middleware: "om",
  head() {
    return {
      title: `Booking - ${this.$pageTitle}`,
    };
  },
  data() {
    return {
      form: { date: [] },
      items: [],
      perPage: 30,
      loading: true,
      fullLoad: false,
      modal: false,
      modalBooking: {},
      errors: {},
    };
  },
  computed: {
    fields() {
      const fields = [
        { key: "contactName", label: "Name", span: "minmax(200PX, 1fr)" },
        { key: "checkIn", label: "Check in", span: "minmax(125PX, 1fr)" },
        { key: "checkOut", label: "Check out", span: "minmax(125PX, 1fr)" },
        { key: "status", label: "payment status", span: "minmax(125PX, 1fr)" },
        {
          key: "actions",
          label: "Actions",
          span: "minmax(150px, 1fr)",
        },
      ];
      return fields;
    },
    bookingDetails() {
      return [
        {
          icon: "fas fa-file-lines",
          title: "Booking ID",
          value: `#${this.modalBooking.bookingNumber}`,
        },
        {
          icon: "fas fa-file-lines",
          title: "Booking date",
          date: this.modalBooking.created_at,
        },
        {
          icon: "fas fa-calendar-days",
          title: "Check in",
          date: this.modalBooking.checkIn,
        },
        {
          icon: "fas fa-calendar-days",
          title: "Check out",
          date: this.modalBooking.checkOut,
        },
        {
          icon: "fas fa-users",
          title: "Guest & child",
          value: `${this.modalBooking.adult} guest & ${this.modalBooking.child} child`,
        },
        {
          icon: "fas fa-table-cells",
          title: "Total booked rooms",
          value: this.modalBooking.rooms.reduce(
            (t, val) => t + val.quantity,
            0
          ),
        },
        {
          icon: "fas fa-users",
          title: "All gests names",
          values: this.modalBooking.guestNames,
        },
        {
          icon: "fas fa-users",
          title: "Rooms name",
          values: this.modalBooking.rooms.map(({ name }) => name),
        },
        {
          icon: "fas fa-address-card",
          title: "Primary guest",
          value: this.modalBooking.contactName,
        },
        {
          icon: "fas fa-address-card",
          title: "Primary guest phone",
          value: this.modalBooking.contactNumber,
        },
        {
          icon: "fas fa-address-card",
          title: "Primary guest address",
          value: this.modalBooking.contactAddress,
        },
        {
          icon: "fas fa-bed",
          title: "Night stay",
          value: `${this.nightCount} night${this.nightCount > 1 ? "s" : ""}`,
        },
        {
          icon: "fas fa-money-check-dollar",
          title: "Payment method",
          value: this.modalBooking.paymentMethod,
        },
        {
          icon: "fas fa-money-check-dollar",
          title: "Transaction number",
          value: this.modalBooking.transactionNumber,
        },
        {
          icon: "fas fa-bangladeshi-taka-sign",
          title: "Total payable",
          amount: this.modalBooking.totalPayable,
        },
        {
          icon: "fas fa-file-invoice-dollar",
          title: "Payment status",
          status: this.modalBooking.status,
        },
      ];
    },
  },
  watch: {
    "form.date"() {
      this.$router.push({ name: "" });
      this.refetch();
    },
  },
  mounted() {
    this.fetchItems();
  },
  methods: {
    async fetchItems() {
      try {
        const body = {
          perPage: this.perPage,
          page: this.items.length / this.perPage + 1,
          date:
            this.form.date.length === 2
              ? [
                  startDate(validateDate(this.form.date[0], new Date())),
                  endDate(validateDate(this.form.date[1], new Date())),
                ]
              : null,
        };
        if (Number.isInteger(body.page)) {
          const { items } = await this.$omApi.fetchBooking(body);
          this.items = this.items.concat(items);
          this.fullLoad = items.length === 0;
        }
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    refetch() {
      this.items = [];
      this.fetchItems();
    },
    badgeVariant(value) {
      if (value === "pending") return "yellow";
      else if (value === "complete") return "green";
      else if (value === "cancel") return "red";
      else if (value === "refund") return "gray";
    },
    showBooking(item) {
      this.modalBooking = item;
      this.modal = true;
    },
    statusVariant(status) {
      if (status === "pending") {
        return "solidAmber";
      } else if (status === "complete") {
        return "solidGreen";
      } else if (status === "cancel") {
        return "solidRed";
      } else if (status === "refund") {
        return "solidPink";
      }
    },
  },
};
</script>
