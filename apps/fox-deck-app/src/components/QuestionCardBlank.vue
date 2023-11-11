<script setup lang="ts">
import QuestionCardBase from "@/components/QuestionCardBase.vue";
</script>
<template>
  <QuestionCardBase class="justify-between">
    <label class="w-full">
      <span class="text-3xl">Frage:</span>
      <textarea class="text-2xl w-full border-b-2 p-2 outline-0 mb-4"
                placeholder="Was versteht man unter dem Begriff 'Inflation'?"/>
    </label>
    <label class="w-full">
      <span class="text-2xl">Antwort:</span>
      <textarea class="text-xl w-full h-72 outline-0 border-2 p-2 resize-none"
                placeholder="Inflation ist der anhaltende Anstieg des allgemeinen Preisniveaus von Gütern und Dienstleistungen in einer Volkswirtschaft über einen bestimmten Zeitraum."/>
    </label>
    <div class="flex">
      <button class="flex justify-center items-center p-3 text-red-900 rounded-full mr-2 font-sans
                     hover:bg-red-100 transition ease-in-out">
        <vue-feather type="x-circle"/>
        <span class="ml-2">Abbrechen</span>
      </button>
      <button class="flex justify-center items-center p-3 bg-primary-200 text-primary-900 rounded-full mr-2 font-sans">
        <vue-feather type="save"/>
        <span class="ml-2">Speichern</span>
      </button>
    </div>
  </QuestionCardBase>
</template>
