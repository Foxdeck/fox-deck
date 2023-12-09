<script setup lang="ts">
import FDEditor, {type EditorOutputData} from "@/core/components/FDEditor/FDEditor.vue";
import {ref} from "vue";
import FDTypography from "@/core/components/FDTypography/FDTypography.vue";
import FDIcon from "@/core/components/FDIcon/FDIcon.vue";
import {Icon} from "@/core/components/FDIcon/icons";

const isSaving = ref(false);

function onEditorChanged(data: EditorOutputData) {
  isSaving.value = true;
  setTimeout(() => {
    isSaving.value = false;
  }, 2000);
  const dataString = JSON.stringify(data);
  const decoded = btoa(dataString);
  console.log("decoded content", decoded);
  // TODO: this needs real implementation, after talking about if we want to make this feature real.
}

</script>
<template>
  <div class="bg-white min-h-screen">
    <div class="flex justify-end p-2">
      <FDTypography
        class="flex gap-2 items-center bg-success-normal text-white py-2 px-3 rounded-full w-fit"
        :class="{
          'opacity-60': isSaving
        }"
        type="pxs"
      >
        {{ isSaving ? 'saving' : 'saved' }}
        <FDIcon
          v-if="isSaving"
          class="animate-spin"
          :icon="Icon.LOADING"
        />
        <FDIcon
          v-else
          :icon="Icon.CHECK"
        />
      </FDTypography>
    </div>
    <FDEditor @on-change="onEditorChanged" />
  </div>
</template>
