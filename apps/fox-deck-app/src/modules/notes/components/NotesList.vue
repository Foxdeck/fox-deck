<script setup lang="ts">
import {useNotesStore} from "@/modules/notes/stores/notes.store";

const notesStore = useNotesStore();
</script>

<template>
  <div class="flex flex-col gap-2 w-full max-w-[200px] bg-primary-50/10 h-fit p-4 rounded-md">
    <div
      v-for="note in notesStore.notes"
      :key="note.id"
      class="cursor-pointer underline"
      @click="notesStore.selectedNote = note"
    >
      {{ note.title }}
    </div>
  </div>
</template>