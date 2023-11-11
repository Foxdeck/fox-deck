<script setup lang="ts">
import FDButton from "@/components/FDButton/FDButton.vue";
import FDTextInput from "@/components/FDTextInput/FDTextInput.vue";
import { ref } from "vue";

const props = defineProps({});

const search = ref("");
</script>
<template>
  <div class="flex items-center gap-4 p-1 shadow-sm">
    <div class="flex gap-1">
      <FDButton icon="plus" :is-rounded="false" severity="success" />
      <FDButton
        icon="trash"
        :is-rounded="false"
        type="secondary"
        severity="danger"
      />
    </div>
    <FDTextInput
      label=""
      icon="search"
      :value="search"
      :should-validate="false"
      @onInput="search = $event"
    />
  </div>
</template>
