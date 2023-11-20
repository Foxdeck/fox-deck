<script setup lang="ts">
import { onMounted, ref } from "vue";
import Button from "@/core/components/Button.vue";
import axios from "axios";
import type { Questionnaires } from "@/types/questionnaire.types";
import FDButton from "@/core/components/FDButton/FDButton.vue";

let initialItems: Questionnaires = [];
onMounted(async () => {
  const questionnaireResponse = await axios(
    "http://localhost:3000/questionnaires"
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
    item.title.toLowerCase().includes(searchString.toLowerCase())
  );
}

function getAddButtonLabel() {
  return `'${inputValue.value}' erstellen`;
}
</script>

<template>
  <div class="border flex p-2 items-center relative bg-white w-fit">
    <input
      class="outline-0 font-sans"
      type="text"
      placeholder="Quiz auswählen"
      v-model="inputValue"
      @focusin="onFocusIn"
      @focusout="onFocusOut"
      @input="onInput($event.target.value)"
    />
    <vue-feather class="w-5" type="search"></vue-feather>
    <div
      v-if="isDropdownVisible"
      class="z-50 flex flex-col bg-white shadow-lg absolute top-10 left-0 right-0"
    >
      <span
        v-for="item of items"
        class="mx-2 my-1 rounded-md px-2 py-1 cursor-pointer hover:bg-gray-100"
      >
        {{ item.title }}
      </span>
      <div
        v-if="items.length === 0"
        class="flex flex-row mx-4 my-1 opacity-80 items-center"
      >
        <span class="mr-4">
          <vue-feather class="flex w-7" type="alert-circle"></vue-feather>
        </span>
        <span class="text-sm"
          >Es wurde kein Quiz mit dem Namen '{{ inputValue }}' gefunden.</span
        >
      </div>
      <FDButton
        v-if="items.length === 0"
        severity="success"
        icon="plus"
        class="m-2"
        :label="getAddButtonLabel()"
      ></FDButton>
    </div>
  </div>
</template>
