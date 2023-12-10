<script setup lang="ts">
import {Icon} from "@/core/components/FDIcon/icons";
import FDIcon from "@/core/components/FDIcon/FDIcon.vue";
import FDTypography from "@/core/components/FDTypography/FDTypography.vue";
import {useNotesStore} from "@/modules/notes/stores/notes.store";

const notes = useNotesStore();

</script>
<template>
  <div class="flex justify-end p-2">
    <FDTypography
      class="flex gap-2 items-center bg-success-normal text-white py-2 px-3 rounded-full w-fit"
      :class="{
        'opacity-60': notes.isSynchronizing
      }"
      type="pxs"
    >
      {{ notes.isSynchronizing ? 'synchronizing changes' : 'synchronized' }}
      <FDIcon
        v-if="notes.isSynchronizing"
        class="animate-spin"
        :icon="Icon.LOADING"
      />
      <FDIcon
        v-else
        :icon="Icon.CHECK"
      />
    </FDTypography>
  </div>
</template>
