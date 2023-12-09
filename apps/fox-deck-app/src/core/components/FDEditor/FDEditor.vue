<script setup lang="ts">
import {onMounted} from "vue";
import Header from "@editorjs/header";
import EditorJS, {type OutputData} from "@editorjs/editorjs";

export type EditorOutputData = OutputData;
onMounted(() => new EditorJS({
  holder: "editorjs",
  tools: {
    header: Header
  },
  placeholder: "Start creating your notes!",
  onChange: async (api) => {
    const data = await api.saver.save();
    emits("onChange", data);
  }
}));

const emits = defineEmits<{
  (e: "onChange", value: EditorOutputData): void
}>();
</script>

<template>
  <div id="editorjs" />
</template>

<style lang="scss">
h1.ce-header {
  font-size: 2rem;
  font-weight: bold;
}
h2.ce-header {
  font-size: 1.8rem;
  font-weight: bold;
}
h3.ce-header {
  font-size: 1.6rem;
  font-weight: bold;
}
</style>