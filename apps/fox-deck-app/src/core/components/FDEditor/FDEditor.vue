<script setup lang="ts">
import {onUnmounted, watch} from "vue";
import EditorJS, {type API, type OutputData} from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";

interface FDEditorProps {
  selectedNote?: OutputData;
}

const props = defineProps<FDEditorProps>();

const editor = new EditorJS({
  holder: "editorjs",

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
  },
});

/**
 * If props are updating (if a user selected a new note to render),
 * we re-render the editor with the content of this note.
 */
watch(props, async () => {
  await editor.isReady;
  if (props.selectedNote !== undefined) {
    await editor.blocks.render(props.selectedNote as OutputData);
  } else {
    await editor.clear();
  }
});

onUnmounted(() => editor.destroy());

const emits = defineEmits<{
  (e: "onChange", value: OutputData): void
}>();
</script>

<template>
  <div id="editorjs" />
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