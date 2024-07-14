<script setup lang="ts">
import {useI18n} from "vue-i18n";

import AppIcon from "@/core/components/AppIcon/AppIcon.vue";
import {Icon} from "@/core/components/AppIcon/icons";
import AppNoteItem from "@/core/components/AppNoteItem/AppNoteItem.vue";
import ContentLayout from "@/core/components/Layouts/ContentLayout.vue";
import AppSearch from "@/modules/search/AppSearch/AppSearch.vue";

import "@material/web/focus/md-focus-ring";

const {t} = useI18n();
</script>
<template>
  <ContentLayout>
    <div class="col-span-12 md:col-span-8">
      <div class="flex flex-col gap-4">
        <span class="py-4 text-center font-gabarito text-2xl">{{ t("home.title") }}</span>
        <app-search />
        <div class="flex items-center justify-center gap-4">
          <div
            class="surface-container-high on-surface-text relative flex gap-4 rounded-2xl px-6 py-4 shadow-sm outline-none"
            tabindex="0"
          >
            <md-focus-ring />
            <app-icon
              class="text-2xl"
              :icon="Icon.PLUS"
            />
            <div class="flex flex-col justify-center gap-1">
              <span class="text-base">New Folder</span>
              <span class="on-surface-variant-text text-xs">Create a new folder for organizing your notes</span>
            </div>
          </div>
          <div
            class="surface-container-high on-surface-text relative flex gap-4 rounded-2xl px-6 py-4 shadow-sm outline-none"
            tabindex="0"
          >
            <md-focus-ring />
            <app-icon
              class="text-2xl"
              :icon="Icon.PLUS"
            />
            <div class="flex flex-col justify-center gap-1">
              <span class="text-base">New Note</span>
              <span class="on-surface-variant-text text-xs">Create a new note</span>
            </div>
          </div>
        </div>
        <span class="mb-2 font-bold">{{ t("home.suggestions") }}</span>
        <div
          class="flex flex-row gap-4"
        >
          <app-note-item />
        </div>
      </div>
    </div>
  </ContentLayout>
</template>
