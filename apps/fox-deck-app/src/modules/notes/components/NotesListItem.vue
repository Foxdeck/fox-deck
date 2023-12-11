<script setup lang="ts">
import {Icon} from "@/core/components/FDIcon/icons";
import FDIcon from "@/core/components/FDIcon/FDIcon.vue";
import FDTypography from "@/core/components/FDTypography/FDTypography.vue";

interface NotesListItemProps {
  label: string;
  icon: Icon;
}

defineProps<NotesListItemProps>();
</script>

<template>
  <div class="flex text-gray-700 flex gap-2 p-2 rounded-md cursor-pointer hover:bg-gray-200">
    <FDIcon
      class="text-sm"
      :icon="icon"
    />
    <FDTypography
      type="psm"
      class="font-sans"
    >
      {{ label }}
    </FDTypography>
  </div>
</template>
