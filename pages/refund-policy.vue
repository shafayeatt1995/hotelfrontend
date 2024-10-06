<template>
  <div class="container mx-auto">
    <div class="text-gray-800 dark:text-white">
      <h1 class="md:text-7xl text-4xl font-bold mb-10">Refund Policy:</h1>
      <div>
        <h2 class="mt-6 text-4xl font-semibold">Hotel</h2>
        <div>
          <ul class="list">
            <li>CholoZai follows property's cancellation policy.</li>
            <li>
              Cancellation fee may apply depending on the property and the time
              of cancellation.
            </li>
            <li>
              Date change is not possible for any hotel booking. Travelers need
              to cancel the previous booking and rebook with the new date.
            </li>
            <li>
              Booking for black-out dates are not cancellable or refundable.
            </li>
            <li>
              CholoZai won't charge any additional service charges apart from
              the hotel quoted fees.
            </li>
            <li>
              Refunds will be initiated (if applicable) after a successful
              cancellation. The refund will be sent through the same channel
              that the traveler has used for payment. Depending on the channel
              type, the payment may take one to five working days to be
              reflected in the account.
            </li>
          </ul>
        </div>
        <div>
          <p>*Convenience charge is non-refundable.</p>
        </div>
      </div>
      <div class="product-policy">
        <h2 class="mt-6 text-4xl font-semibold">Tour</h2>
        <div>
          <ul class="list">
            <li>CholoZai follows tour operator's cancellation policy.</li>
            <li>
              To cancel or date change, travelers are advised to email at
              <a
                href="mailto:tours@cholozai.com"
                target="_blank"
                class="text-indigo-600"
                >tours@cholozai.com</a
              >. The team will respond accordingly to resolve the issue.
            </li>
            <li>
              Please check the given policy under each tour before booking.
            </li>
            <li>
              Booking for black-out dates are not cancellable or refundable.
            </li>
            <li>
              CholoZai won't charge any additional service charge apart from the
              operator's quoted fees.
            </li>
            <li>
              Refunds will be initiated (if applicable) after a successful
              cancellation. The refund will be sent through the same channel
              that the traveler has used for payment. Depending on the channel
              type, the payment may take one to five working days to be
              reflected in the account.
            </li>
          </ul>
        </div>
        <div>
          <p>*Convenience charge is non-refundable.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { meta } from "~/utils";

export default {
  name: "RefundPolicy",
  auth: false,
  head() {
    const title = `Refund policy - ${this.$pageTitle}`;
    const description =
      "Read Cholozai.com's refund policy to understand our guidelines on cancellations, refunds, and changes to bookings. We prioritize customer satisfaction and provide clear instructions on how to request refunds for hotel reservations.";
    return {
      title,
      meta: meta({ title, description }),
    };
  },
};
</script>
