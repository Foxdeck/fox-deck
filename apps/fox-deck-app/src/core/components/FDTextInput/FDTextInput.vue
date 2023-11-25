<script setup lang="ts">
import {toRef} from "vue";
import {useField} from "vee-validate";
import FDTypography from "@/core/components/FDTypography/FDTypography.vue";

const props = defineProps({
  name: {type: String, required: true, default: ""},
  value: {type: String, required: false, default: ""},
  label: {type: String, required: false, default: ""},
  type: {type: String, required: false, default: "text"},
  disabled: {type: Boolean, required: false, default: false},
  shouldValidate: {type: Boolean, required: false, default: false},
  icon: {type: String, required: false, default: ""},
  isValid: {type: Boolean, required: false, default: false},
});

const emit = defineEmits<{
  onInput: string;
}>();

const name = toRef(props, "name");
const {
  value: inputValue,
  errorMessage,
  handleBlur,
  handleChange,
} = useField(name as string, undefined, {
  initialValue: props.value,
});

function onInput(e: InputEvent) {
  handleChange(e);
  emit("onInput", (e.target as HTMLInputElement).value);

}
</script>
<template>
  <div class="flex flex-col">
    <label
      class="relative bg-white flex justify-center items-center overflow-hidden rounded-md border border-gray-200 px-3 pt-3 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      :class="{
        'bg-gray-50 cursor-not-allowed': disabled,
        '!border-success-normal': shouldValidate && isValid,
        '!border-danger-normal': shouldValidate && !isValid,
      }"
    >
      <input
        placeholder="Email"
        class="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent text-sm outline-none disabled:cursor-not-allowed"
        data-testid="input"
        :disabled="disabled"
        :value="inputValue"
        :type="type"
        @input="onInput"
        @blur="handleBlur"
      >
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
        class="absolute flex justify-center items-center gap-1 start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs dark:text-white"
        :class="{
          '!text-gray-500': disabled,
          '!text-danger-normal': shouldValidate && !isValid,
        }"
      >
        {{ label }}
      </span>
    </label>
    <FDTypography
      v-if="errorMessage"
      type="pxs"
      class="inline-block text-danger-normal"
      data-testid="errorMessage"
    >
      {{ errorMessage }}
    </FDTypography>
  </div>
</template>
