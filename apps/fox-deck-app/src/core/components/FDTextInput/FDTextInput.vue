<script setup lang="ts">
import {toRef} from "vue";
import {useField} from "vee-validate";
import FDTypography from "@/core/components/FDTypography/FDTypography.vue";
import FDDropDown, {type FDDropdownProps} from "@/core/components/FDDropDown/FDDropDown.vue";

export type FDTextInputProps = FDDropdownProps & {
  readonly name: string;
  readonly value?: string;
  readonly label?: string;
  readonly type?: string;
  readonly disabled?: boolean;
  readonly icon?: string;
  readonly hasSelect?: boolean;
}

const props = withDefaults(defineProps<FDTextInputProps>(), {
  value: "",
  label: "",
  type: "text",
  disabled: false,
  icon: "",
  hasSelect: false
});

const emit = defineEmits<{
  (e: "onInput", value: string): void
}>();

const name = toRef(props, "name");
const {
  value: inputValue,
  errorMessage,
  handleBlur,
  handleChange,
} = useField(name, undefined, {
  initialValue: props.value,
});

function onInput(e: Event) {
  handleChange(e);
  emit("onInput", (e.target as HTMLInputElement).value as string);
}
</script>
<template>
  <div class="flex flex-col">
    <label
      class="gap-2 relative flex items-center justify-center rounded-md border border-gray-200 bg-white px-3 pt-3 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
      :class="{
        'bg-gray-50 cursor-not-allowed': disabled
      }"
    >
      <vue-feather
        v-if="icon"
        class="mb-3"
        size="18"
        :type="icon"
      />
      <input
        placeholder="Email"
        class="relative h-8 w-full border-none bg-transparent p-0 text-sm outline-none peer placeholder-transparent disabled:cursor-not-allowed"
        data-testid="input"
        :disabled="disabled"
        :value="inputValue"
        :type="type"
        @input="onInput"
        @blur="handleBlur"
      >
      <span
        class="absolute  top-3 peer-focus:top-3 peer-placeholder-shown:top-1/2 flex -translate-y-1/2 items-center justify-center gap-1 text-xs peer-focus:text-xs peer-placeholder-shown:text-sm text-gray-700 transition-all start-3 dark:text-white"
        :class="{
          '!left-9': icon,
          '!text-gray-500': disabled,
        }"
      >
        {{ label }}
      </span>
      <FDDropDown
        v-if="hasSelect"
        :items="items"
        :selected-item="selectedItem"
        class="mb-3"
      />
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
