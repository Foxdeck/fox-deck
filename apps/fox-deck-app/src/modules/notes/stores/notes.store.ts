import {defineStore} from "pinia";
import {ref} from "vue";
import type {NoteResponseDto} from "@/core/services/api";

/**
 * Represents a notes store.
 */
export const useNotesStore = defineStore("notesStore", () => {
  const isSynchronizing = ref(false);
  const notes = ref<NoteResponseDto[]>([]);

  return {
    isSynchronizing: isSynchronizing,
    notes: notes,
  }
});
