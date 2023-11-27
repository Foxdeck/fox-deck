<script setup lang="ts">
import { onMounted, ref } from "vue";
import axios from "axios";
import { type Questionnaires } from "@/types/questionnaire.types";
import FDButton from "@/core/components/FDButton/FDButton.vue";

let initialItems: Questionnaires = [];
onMounted(async () => {
  const questionnaireResponse = await axios(
    "http://localhost:3000/questionnaires",
  );
  if (questionnaireResponse.status !== 200) {
    // TODO: better error handling!
    return;
  }
  const data = questionnaireResponse.data as Questionnaires;
  initialItems = data;
  items.value = data;
});

const items = ref<Questionnaires>([]);
const inputValue = ref<string>("");

const isDropdownVisible = ref(false);

function onFocusIn() {
  isDropdownVisible.value = true;
}

function onFocusOut() {
  isDropdownVisible.value = false;
}

function onInput(searchString: string) {
  items.value = initialItems.filter((item) =>
    item.title.toLowerCase().includes(searchString.toLowerCase()),
  );
}

function getAddButtonLabel() {
  return `'${inputValue.value}' erstellen`;
}
</script>

<template>
  <div class="relative flex w-fit items-center border bg-white p-2">
    <input
      v-model="inputValue"
      class="font-sans outline-0"
      type="text"
      placeholder="Quiz auswählen"
      @focusin="onFocusIn"
      @focusout="onFocusOut"
      @input="onInput($event.target.value)"
    >
    <vue-feather
      class="w-5"
      type="search"
    />
    <div
      v-if="isDropdownVisible"
      class="absolute top-10 right-0 left-0 z-50 flex flex-col bg-white shadow-lg"
    >
      <span
        v-for="item of items"
        :key="item.id"
        class="mx-2 my-1 cursor-pointer rounded-md px-2 py-1 hover:bg-gray-100"
      >
        {{ item.title }}
      </span>
      <div
        v-if="items.length === 0"
        class="mx-4 my-1 flex flex-row items-center opacity-80"
      >
        <span class="mr-4">
          <vue-feather
            class="flex w-7"
            type="alert-circle"
          />
        </span>
        <span class="text-sm">Es wurde kein Quiz mit dem Namen '{{ inputValue }}' gefunden.</span>
      </div>
      <FDButton
        v-if="items.length === 0"
        severity="success"
        icon="plus"
        class="m-2"
        :label="getAddButtonLabel()"
      />
    </div>
  </div>
</template>
