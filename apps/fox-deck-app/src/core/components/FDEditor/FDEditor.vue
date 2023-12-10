<script setup lang="ts">
import {onMounted} from "vue";
import EditorJS, {type API, type OutputData} from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";

const editorElementId = "editorjs";

/**
 * Represents the output data of the editor.
 */
export type EditorOutputData = OutputData;

/**
 * We initialize a new instance of EditorJS,
 * @see https://editorjs.io/
 */
onMounted(() => new EditorJS({
  holder: editorElementId,

  /**
   * Registered tools for EditorJS
   * @see https://editorjs.io/creating-a-block-tool/
   */
  tools: {
    header: Header,
    list: List
  },

  /**
   * A placeholder so that the user knows where to write his first note.
   */
  placeholder: "Start creating your notes!",

  /**
   * If the user inputs, this is triggered. We simply emit this event up to the parent component.
   * @param api {API} the EditorJS API
   */
  onChange: async (api: API) => {
    const data = await api.saver.save();
    emits("onChange", data);
  }
}));

const emits = defineEmits<{
  (e: "onChange", value: EditorOutputData): void
}>();
</script>

<template>
  <div :id="editorElementId" />
</template>

<style lang="scss">
.ce-block__content,
.ce-toolbar__content {
  max-width: 80%;
}

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