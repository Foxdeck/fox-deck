<script setup lang="ts">
defineProps({
  label: { type: String, required: false },
  value: { type: String, required: true, default: "" },
  type: { type: String, required: false, default: "text" },
  disabled: { type: Boolean, required: false, default: false },
  errorMessage: { type: String, required: false, default: "" },
  shouldValidate: { type: Boolean, required: false, default: false },
  icon: {
    type: String,
    required: false,
    default: false,
  },
  isValid: { type: Boolean, required: false, default: false },
});

defineEmits<{
  onInput: string;
}>();
</script>
<template>
  <div class="flex flex-col">
    <label
      class="relative bg-white flex justify-center items-center overflow-hidden rounded-md border border-gray-200 px-3 pt-3"
      :class="{
        'bg-gray-50 cursor-not-allowed': disabled,
        '!border-success-normal': shouldValidate && isValid,
        '!border-danger-normal': shouldValidate && !isValid,
      }"
    >
      <input
        placeholder="Email"
        class="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent text-sm outline-none disabled:cursor-not-allowed"
        :disabled="disabled"
        :value="value"
        :type="type"
        @input="$emit('onInput', $event.target.value)"
      />
      <span class="flex gap-2">
        <vue-feather
          v-if="icon"
          class="mb-2"
          size="18"
          :type="icon"
          :class="{
            'text-danger-normal': shouldValidate && !isValid,
          }"
        />
        <vue-feather
          v-if="shouldValidate && !icon && !isValid"
          class="mb-2 text-danger-normal"
          size="18"
          type="alert-circle"
        />
        <vue-feather
          v-if="shouldValidate && !icon && isValid"
          class="mb-2 text-success-darker"
          size="18"
          type="check"
        />
      </span>
      <span
        class="absolute flex justify-center items-center gap-1 start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs"
        :class="{
          '!text-gray-500': disabled,
          '!text-danger-normal': shouldValidate && !isValid,
        }"
      >
        {{ label }}
      </span>
    </label>
    <span
      v-if="shouldValidate && !isValid"
      class="ml-2 inline-block text-danger-normal text-xs"
    >
      {{ errorMessage }}
    </span>
  </div>
</template>
