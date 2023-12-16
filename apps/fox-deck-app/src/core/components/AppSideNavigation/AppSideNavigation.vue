<script setup lang="ts">
import {useI18n} from "vue-i18n";
import Logo from "@/assets/icons/foxdeck-logo.svg";
import {useAuthStore} from "@/core/stores/auth.store";
import {LoginRouteNames} from "@/modules/login/routes";
import {useFoxdeckRouter} from "@/core/composables/useFoxdeckRouter";
import FDIcon from "@/core/components/FDIcon/FDIcon.vue";
import {Icon} from "@/core/components/FDIcon/icons";
import {NoteRouteNames} from "@/modules/notes/routes";
import FDTypography from "@/core/components/FDTypography/FDTypography.vue";
import FDButton from "@/core/components/FDButton/FDButton.vue";
import NotesListItem from "@/modules/notes/components/NotesListItem.vue";
import {useNotesStore} from "@/modules/notes/stores/notes.store";
import type {NoteResponseDto} from "@/core/services/api";

const authStore = useAuthStore();
const notesStore = useNotesStore();
const { t } = useI18n();
const { getVisibleRoutes, push, isRouteSelected } = useFoxdeckRouter();

async function onLogoutClick() {
  await authStore.logout();
  await push({ name: LoginRouteNames.LOGIN });
}

const isNoteSelected = (note: NoteResponseDto) => isRouteSelected({
  name: NoteRouteNames.NOTE,
  params: {
    id: note.id
  }
});
const renderWelcomeMessage = () => `${t("common.hello")}, ${authStore.getUsername()}`;
</script>
<template>
  <aside
    v-if="authStore.isAuthenticated()"
    class="flex flex-col w-full max-w-[300px] bg-white min-h-screen p-4 border-r"
  >
    <div>
      <FDTypography class="flex gap-2 font-bold items-center">
        <Logo class="w-8 self-center" />
        {{ renderWelcomeMessage() }}
      </FDTypography>
      <RouterLink to="/create-note">
        <FDButton
          class="w-full my-6"
          icon="plus"
          :label="t('notes.new_note')"
        />
      </RouterLink>
      <RouterLink
        v-for="route in getVisibleRoutes()"
        :key="route.path"
        :to="route.path"
      >
        <NotesListItem
          class="text-gray-500/90"
          :label="route.label as string"
          :icon="route.icon as Icon"
          :class="{
            'bg-gray-200 text-gray-400 font-bold': isRouteSelected({
              name: route.name as string
            })
          }"
        />
      </RouterLink>
      <div class="flex justify-between mt-6 mb-2">
        <span class="uppercase text-sm font-bold text-gray-600/70">notes</span>
        <FDIcon
          class="text-xs"
          :icon="Icon.CHEVRON_DOWN"
        />
      </div>

      <RouterLink
        v-for="note in notesStore.notes"
        :key="note.id"
        :to="'/note/' + note.id"
      >
        <NotesListItem
          :key="note.id"
          :label="note.title"
          :icon="isNoteSelected(note) ? Icon.DOCUMENT_FILLED : Icon.DOCUMENT"
          :class="{
            'bg-gray-200 text-gray-400 font-bold': isNoteSelected(note)
          }"
          @click="push({
            name: NoteRouteNames.NOTE,
            params: {
              id: note.id
            }
          })"
        />
      </RouterLink>
      <FDButton
        variant="secondary"
        class="cursor-pointer p-4 hover:opacity-70 w-full mt-4"
        icon="log-out"
        @click="onLogoutClick()"
      />
    </div>
  </aside>
</template>
