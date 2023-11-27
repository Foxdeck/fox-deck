<script setup lang="ts">
import QuestionCardBase from "@/core/components/QuestionCardBase.vue";
</script>
<template>
  <QuestionCardBase class="justify-between">
    <label class="w-full">
      <span class="text-3xl">Frage:</span>
      <textarea
        class="mb-4 w-full border-b-2 p-2 text-2xl outline-0"
        placeholder="Was versteht man unter dem Begriff 'Inflation'?"
      />
    </label>
    <label class="w-full">
      <span class="text-2xl">Antwort:</span>
      <textarea
        class="h-72 w-full resize-none border-2 p-2 text-xl outline-0"
        placeholder="Inflation ist der anhaltende Anstieg des allgemeinen Preisniveaus von Gütern und Dienstleistungen in einer Volkswirtschaft über einen bestimmten Zeitraum."
      />
    </label>
    <div class="flex">
      <button
        class="mr-2 flex items-center justify-center rounded-full p-3 font-sans text-red-900 transition ease-in-out hover:bg-red-100"
      >
        <vue-feather type="x-circle" />
        <span class="ml-2">Abbrechen</span>
      </button>
      <button
        class="mr-2 flex items-center justify-center rounded-full p-3 font-sans bg-primary-200 text-primary-900"
      >
        <vue-feather type="save" />
        <span class="ml-2">Speichern</span>
      </button>
    </div>
  </QuestionCardBase>
</template>
