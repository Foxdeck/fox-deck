<script setup lang="ts">
import FDEditor from "@/core/components/FDEditor/FDEditor.vue";
import NotesToolbar from "@/modules/notes/components/NotesToolbar.vue";
import {useNotes} from "@/modules/notes/composables/useNotes";
import {onMounted} from "vue";
import {useNotesStore} from "@/modules/notes/stores/notes.store";
import NotesList from "@/modules/notes/components/NotesList.vue";

const { save, fetchNotes } = useNotes();
const notesStore = useNotesStore();

onMounted(async () => await fetchNotes());

</script>
<template>
  <div class="min-h-screen bg-white">
    <div class="flex gap-4">
      <NotesList />
      <div class="w-full min-h-screen">
        <NotesToolbar />
        <FDEditor
          :selected-note="notesStore.selectedNote"
          @on-change="save"
        />
      </div>
    </div>
  </div>
</template>
