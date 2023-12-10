<script setup lang="ts">
import FDEditor from "@/core/components/FDEditor/FDEditor.vue";
import NotesToolbar from "@/modules/notes/components/NotesToolbar.vue";
import {useNotes} from "@/modules/notes/composables/useNotes";

const { save } = useNotes();

</script>
<template>
  <div class="min-h-screen bg-white">
    <NotesToolbar />
    <div class="max-w-[1400px] w-full min-h-screen">
      <FDEditor @on-change="save" />
    </div>
  </div>
</template>
