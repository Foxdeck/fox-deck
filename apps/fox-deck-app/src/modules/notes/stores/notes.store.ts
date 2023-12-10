import {defineStore} from "pinia";
import {ref} from "vue";

/**
 * Represents a notes store.
 */
export const useNotesStore = defineStore("notesStore", () => {
  const isSynchronizing = ref(false);

  return {
    isSynchronizing: isSynchronizing
  }
});
