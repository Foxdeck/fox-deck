<script setup lang="ts">
import {toRef} from "vue";
import {useField} from "vee-validate";
import FDTypography from "@/core/components/FDTypography/FDTypography.vue";

const props = defineProps({
  name: {type: String, required: true, default: ""},
  value: {type: String, required: false, default: ""},
  placeholder: {type: String, required: false, default: ""}
});

const name = toRef(props, "name");
const {
  value: inputValue,
  errorMessage,
  handleBlur,
  handleChange,
} = useField(name as string, undefined, {
  initialValue: props.value,
});
</script>
<template>
  <div class="flex flex-col">
    <textarea
      class="h-32 rounded-sm border p-2 outline-none"
      :placeholder="placeholder"
      :value="inputValue"
      @input="handleChange"
      @blur="handleBlur"
    />
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
