import type {OutputData} from "@editorjs/editorjs";
import {useNotesStore} from "@/modules/notes/stores/notes.store";

/**
 * Composable which abstracts the CRUD operations for questions to the backend.
 */
export function useNotes() {
  const noteStore = useNotesStore();

  /**
   * Saves the editor output data.
   *
   * @param {OutputData} editorOutputData - The data to be saved.
   * @return {Promise<void>} - A promise that resolves once the saving is complete.
   */
  async function save(editorOutputData: OutputData) {
    noteStore.isSynchronizing = true;
    setTimeout(() => noteStore.isSynchronizing = false, 1000);
    const dataString = JSON.stringify(editorOutputData);
    const decoded = btoa(dataString);
    console.log("decoded content", decoded);
  }

  return {
    save: save
  }
}