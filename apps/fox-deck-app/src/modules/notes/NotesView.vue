<script setup lang="ts">
import FDEditor from "@/core/components/FDEditor/FDEditor.vue";
import NotesToolbar from "@/modules/notes/components/NotesToolbar.vue";
import {useNotes} from "@/modules/notes/composables/useNotes";
import {onMounted, ref, watch} from "vue";
import {useNotesStore} from "@/modules/notes/stores/notes.store";
import {useRouter} from "vue-router";
import type {OutputData} from "@editorjs/editorjs";

const router = useRouter();
const { save, fetchNotes } = useNotes();
const notesStore = useNotesStore();

onMounted(async () => {
  await fetchAndUpdateStore();
});

watch(router.currentRoute, async () => {
  await fetchAndUpdateStore();
});

const note = ref<OutputData | undefined>();

/**
 * Fetches notes from server and updates the notes store. If a parameter id is present in the current route,
 * the selectedNote property of the notes store is updated with the note that matches the id.
 *
 * @return {Promise<void>} Resolves when the notes are fetched and the notes store is updated.
 * // TODO: this method is only needed, because the API doesn't support getting a note by id.
 */
async function fetchAndUpdateStore() {
  note.value = undefined;
  const paramId = router.currentRoute.value.params.id;
  await fetchNotes();
  if (paramId) {
    note.value = notesStore.notes.find((note) => note.id === paramId)?.content as OutputData;
  }
}

</script>
<template>
  <div class="min-h-screen bg-white">
    <div class="w-full min-h-screen">
      <NotesToolbar />
      <FDEditor
        :selected-note="note"
        @on-change="save"
      />
    </div>
  </div>
</template>
