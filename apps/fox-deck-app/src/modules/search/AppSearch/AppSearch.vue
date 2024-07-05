<script setup lang="ts">
import _ from "lodash";
import {ref} from "vue";
import {useI18n} from "vue-i18n";

import AppIcon from "@/core/components/AppIcon/AppIcon.vue";
import {Icon} from "@/core/components/AppIcon/icons";
import AppTextField from "@/core/components/AppTextField/AppTextField.vue";

const {t} = useI18n();

const searchInput = ref("");

const debouncedSearch = _.debounce((searchTerm: string) => {
  console.log(searchTerm);
}, 300);

function search(searchTerm: string): void {
  searchInput.value = searchTerm;
  debouncedSearch(searchTerm);
}

</script>

<template>
  <div class="flex justify-center w-full relative">
    <app-text-field
      class="w-full md:w-1/2 min-w-[400px]"
      :label="t('home.search_in_notes')"
      variant="filled"
      :is-rounded="true"
      :icon="Icon.SEARCH"
      @input="search($event.target.value)"
    />
    <div class="flex flex-col gap-2 absolute w-full md:w-1/2 min-w-[400px] top-16 z-10 shadow-md p-4 rounded-md surface-container on-surface-text">
      <!--      <span class="flex gap-4 italic">-->
      <!--        No results found-->
      <!--      </span>-->
      <ul>
        <li
          class="flex justify-between p-2"
          tabindex="0"
        >
          <span>
            Math > Division
          </span>
          <app-icon :icon="Icon.STAR" />
        </li>
        <li
          class="flex justify-between p-2"
          tabindex="0"
        >
          <span>
            Math > Addition
          </span>
          <app-icon :icon="Icon.STAR" />
        </li>
        <li
          class="flex justify-between p-2"
          tabindex="0"
        >
          <span>
            Math > Multiplication
          </span>
          <app-icon :icon="Icon.STAR" />
        </li>
        <li
          class="flex justify-between p-2"
          tabindex="0"
        >
          <span>
            Math > Subtraction
          </span>
          <app-icon :icon="Icon.STAR" />
        </li>
      </ul>
      <hr class="mb-3">
      <div class="flex gap-1">
        <app-icon :icon="Icon.CARET_DOWN" />
        <span class="font-bold body-small">Actions</span>
      </div>
      <ul>
        <li
          class="flex justify-between p-2"
          tabindex="0"
        >
          <span>
            New Folder "{{ searchInput }}"
          </span>
          <div class="flex items-center gap-2">
            <app-icon :icon="Icon.THUMBTACK" />
            <span class="body-small shadow-inner p-1 surface-container-high rounded-md">CTRL+F</span>
          </div>
        </li>
        <li
          class="flex justify-between p-2"
          tabindex="0"
        >
          <span>
            New Note "{{ searchInput }}"
          </span>
          <div class="flex items-center gap-2">
            <app-icon :icon="Icon.THUMBTACK" />
            <span class="body-small shadow-inner p-1 surface-container-high  rounded-md">CTRL+N</span>
          </div>
        </li>
      </ul>
      <hr class="mb-3">
      <div class="flex gap-1">
        <app-icon :icon="Icon.CARET_DOWN" />
        <span class="font-bold body-small">Favorites</span>
      </div>
      <ul>
        <li
          class="flex justify-between p-2"
          tabindex="0"
        >
          <span>
            Biology: Cells
          </span>
          <app-icon :icon="Icon.STAR_FILLED" />
        </li>
        <li
          class="flex justify-between p-2"
          tabindex="0"
        >
          <span>
            Chemistry: Exam preparation
          </span>
          <app-icon :icon="Icon.STAR_FILLED" />
        </li>
      </ul>
    </div>
  </div>
</template>