<script setup lang="ts">
import { PropType, ref } from "vue";
import FDTextInput from "@/core/components/FDTextInput/FDTextInput.vue";
import FDTypography, {
  FontType,
} from "@/core/components/FDTypography/FDTypography.vue";

defineProps({
  value: { type: String, required: true, default: "" },
  fontType: { type: Object as PropType<FontType>, default: "p" },
});

const isEditMode = ref(false);
</script>

<template>
  <div class="flex">
    <FDTypography
      v-if="!isEditMode"
      :type="fontType"
      class="flex p-1 text-3xl font-gabarito px-2 w-fit rounded-md bg-gray-100 hover:bg-gray-200"
      @click="isEditMode = true"
    >
      {{ value }}
    </FDTypography>
    <FDTextInput v-else label="Titel" :value="value" icon="save" />
  </div>
</template>
