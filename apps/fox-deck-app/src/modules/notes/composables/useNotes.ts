import type {OutputData} from "@editorjs/editorjs";
import {useNotesStore} from "@/modules/notes/stores/notes.store";
import {api} from "@/core/services";
import {useAuthStore} from "@/core/stores/auth.store";
import type {NoteResponseDto} from "@/core/services/api";

/**
 * Composable which abstracts the CRUD operations for questions to the backend.
 */
export function useNotes() {
  const { jwt } = useAuthStore();
  const noteStore = useNotesStore();

  /**
   * Fetches all notes from the server and updates the noteStore.
   * Sets isSynchronizing flag to true before making the API call and sets it back to false after the call.
   * Decodes the content of each note from base64 to JSON before updating the noteStore.
   *
   * @return {Promise<void>} A promise that resolves when the fetch operation is completed.
   */
  async function fetchNotes(): Promise<void> {
    noteStore.isSynchronizing = true;
    const response = await api.resource.resourceControllerGetResourceByUserId({
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    // because the content is returned as base64 encoded string, we need to decode this string and parse it as a JSON.
    const decodedResponseData: NoteResponseDto[] = response.data.map((note) => {
      return {
        ...note,
        content: JSON.parse(atob(note.content))
      }
    });
    noteStore.notes = decodedResponseData;
    noteStore.isSynchronizing = false;
  }

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
    save: save,
    fetchNotes: fetchNotes
  }
}