<template>
  <slide-up-down
    :active="!field.hide"
    :duration="300"
    :class="field.span ? `col-span-${field.span}` : ''"
  >
    <div class="mb-3 relative">
      <label class="text-gray-700" :for="field.name" v-if="field.label"
        >{{ field.label }}
        <span v-if="field.type === 'multiSelect' && data[field.name]"
          >({{ data[field.name].length || 0 }})</span
        >
        <button
          v-if="field.type === 'multiSelect'"
          @click="selectAll()"
          type="button"
          class="ml-3"
        >
          Select All
        </button>
      </label>
      <div class="relative flex items-center">
        <span class="absolute" v-if="field.icon">
          <i :class="field.icon" class="mx-3 text-gray-300" />
        </span>
        <span
          class="absolute right-0 top-0 h-full"
          v-if="field.inlineSubmit?.show"
        >
          <Button class="h-full" @click.native.prevent="$emit('action')">
            <i
              :class="field.inlineSubmit.icon"
              v-if="field.inlineSubmit.icon"
            />
            {{ field.inlineSubmit.text }}
          </Button>
        </span>
        <select
          v-if="field.type === 'select'"
          :id="field.name"
          v-model="data[field.name]"
          class="block w-full py-2 text-gray-700 bg-white border rounded-lg focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40 capitalize disabled:bg-gray-200"
          :class="field.icon ? 'px-9' : ' px-4'"
          :placeholder="field.placeholder"
          :disabled="field.disabled"
        >
          <option value="" v-if="field.showEmptySelect">
            {{ field.placeholder }}
          </option>
          <option
            :value="option.value"
            v-for="(option, i) in field.options"
            :key="i"
          >
            {{ option.label }}
          </option>
        </select>
        <template v-else-if="field.type === 'editor'">
          <ClientOnly>
            <ckeditor
              v-model="data[field.name]"
              :name="field.name"
              class="w-full disabled:bg-gray-200"
              :disabled="field.disabled"
            />
          </ClientOnly>
        </template>
        <template v-else-if="field.type === 'textarea'">
          <p
            v-if="field.textarea.characterLimit"
            class="absolute right-1 -top-6"
            :class="
              data[field.name].length > field.textarea.characterLimit
                ? ' text-red-500'
                : 'text-gray-700'
            "
          >
            {{ data[field.name].length }}/{{ field.textarea.characterLimit }}
          </p>
          <textarea
            :cols="field.textarea?.cols ?? 30"
            :rows="field.textarea?.rows ?? 10"
            :id="field.name"
            v-model="data[field.name]"
            :name="field.name"
            class="block w-full py-2 text-gray-700 bg-white border rounded-lg focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40 disabled:bg-gray-200"
            :class="[
              field.inlineSubmit?.show
                ? 'pl-4 pr-14'
                : field.icon
                ? 'px-9'
                : 'px-4',
            ]"
            :placeholder="field.placeholder"
            :disabled="field.disabled"
          />
        </template>
        <Star v-model="data[field.name]" v-else-if="field.type === 'star'" />
        <input
          v-else-if="field.type === 'color'"
          :type="field.type"
          :id="field.name"
          class="block w-full bg-white border rounded-lg focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40 disabled:bg-gray-200"
          :name="field.name"
          v-model="data[field.name]"
          :disabled="field.disabled"
        />
        <div
          v-else-if="field.type === 'multiSelect'"
          class="flex flex-wrap gap-3 w-full"
        >
          <Checkbox
            v-for="(option, i) in field.options"
            :key="i"
            :id="option.value + 'opt'"
            :val="option.value"
            v-model="data[field.name]"
            hideCheckbox
          >
            <template #default="{ active }">
              <Badge
                :variant="active ? 'solidIndigo' : 'gray'"
                class="cursor-pointer"
              >
                <div v-safe="option?.icon" v-if="option?.icon"></div>
                <p>{{ option.label }}</p>
              </Badge>
            </template>
          </Checkbox>
        </div>
        <input
          v-else
          :type="field.type"
          :id="field.name"
          step="any"
          class="block w-full py-2 text-gray-700 bg-white border rounded-lg focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40 disabled:bg-gray-200"
          :class="[
            field.inlineSubmit?.show
              ? 'pl-4 pr-14'
              : field.icon
              ? 'px-9'
              : ' px-4',
          ]"
          :placeholder="field.placeholder"
          :name="field.name"
          v-model="data[field.name]"
          :disabled="field.disabled"
        />
      </div>
      <small
        class="text-rose-700"
        v-if="
          errors && errors[field.name] && typeof errors[field.name] === 'object'
        "
      >
        <i>{{ errors[field.name].msg }}</i>
      </small>
    </div>
  </slide-up-down>
</template>
<script>
export default {
  name: "Input",
  props: {
    field: Object,
    errors: Object,
    options: Array,
    textarea: Object,
  },
  computed: {
    data: {
      get() {
        return this.$attrs.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
  },
  methods: {
    selectAll() {
      try {
        this.data[this.field.name] =
          this.field.options.length === this.data[this.field.name].length
            ? []
            : this.field.options.map(({ value }) => value);
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
