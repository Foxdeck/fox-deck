<script setup lang="ts">
import {useNotesStore} from "@/modules/notes/stores/notes.store";
import {Icon} from "@/core/components/FDIcon/icons";
import type {NoteResponseDto} from "@/core/services/api";
import NotesListItem from "@/modules/notes/components/NotesListItem.vue";

const notesStore = useNotesStore();

const isSelectedNote = (note: NoteResponseDto) => notesStore.selectedNote?.id === note.id;
</script>

<template>
  <div class="flex flex-col w-full max-w-[300px] bg-gray-100 min-h-screen p-4 border-r">
    <div>
      <NotesListItem
        v-for="note in notesStore.notes"
        :key="note.id"
        :label="note.title"
        :icon="isSelectedNote(note) ? Icon.DOCUMENT_FILLED : Icon.DOCUMENT"
        :class="{
          'bg-gray-200 text-gray-400 font-bold': isSelectedNote(note)
        }"
        @click="notesStore.selectedNote = note"
      />
      <NotesListItem
        class="text-gray-500/90"
        label="notes.new_note"
        :icon="Icon.PLUS"
      />
    </div>
  </div>
</template>