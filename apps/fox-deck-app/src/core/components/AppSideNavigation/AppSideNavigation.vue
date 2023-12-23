<script setup lang="ts">
import {useI18n} from "vue-i18n";
import Logo from "@/assets/icons/foxdeck-logo.svg";
import {useAuthStore} from "@/core/stores/auth.store";
import {LoginRouteNames} from "@/modules/login/routes";
import {useFoxdeckRouter} from "@/core/composables/useFoxdeckRouter";
import {Icon} from "@/core/components/AppIcon/icons";
import {NoteRouteNames} from "@/modules/notes/routes";
import FDTypography from "@/core/components/FDTypography/FDTypography.vue";
import {useNotesStore} from "@/modules/notes/stores/notes.store";
import type {NoteResponseDto} from "@/core/services/api";
import AppButton from "@/core/components/AppButton/AppButton.vue";
import {onMounted} from "vue";
import {useNotes} from "@/modules/notes/composables/useNotes";
import AppSideNavigationItem from "@/core/components/AppSideNavigation/AppSideNavigationItem.vue";

const authStore = useAuthStore();
const notesStore = useNotesStore();
const { fetchNotes } = useNotes();
const {t} = useI18n();
const {getVisibleRoutes, push, isRouteSelected} = useFoxdeckRouter();

onMounted(async () => await fetchNotes());

async function logout() {
  await authStore.logout();
  await push({name: LoginRouteNames.LOGIN});
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
    class="flex flex-col justify-between w-full max-w-[300px] min-h-screen on-surface-text p-4 border-r shadow-md surface-container-lowest"
  >
    <div class="flex flex-col">
      <FDTypography class="flex gap-2 font-bold items-center">
        <Logo class="w-8 self-center" />
        {{ renderWelcomeMessage() }}
      </FDTypography>
      <RouterLink to="/create-note">
        <AppButton
          class="my-6"
          width="full"
          :label="t('notes.new_note')"
          :icon="Icon.PLUS"
        />
      </RouterLink>
      <div class="flex flex-col gap-2">
        <RouterLink
          v-for="route in getVisibleRoutes()"
          :key="route.path"
          :to="route.path"
        >
          <AppSideNavigationItem
            :label="t(route.label as string)"
            :icon="route.icon as Icon"
          />
        </RouterLink>
      </div>

      <div class="mt-6 mb-2">
        <span class="uppercase text-sm font-bold on-surface-text">notes</span>
      </div>

      <div class="flex flex-col gap-2">
        <AppSideNavigationItem
          v-for="note in notesStore.notes"
          :key="note.id"
          :label="note.title"
          :icon="isNoteSelected(note) ? Icon.DOCUMENT_FILLED : Icon.DOCUMENT"
          @click="push({
            'name': NoteRouteNames.NOTE,
            params: {
              id: note.id
            }
          })"
        />
      </div>
    </div>

    <div class="flex gap-2 flex-wrap">
      <AppButton
        variant="text"
        width="full"
        :label="t('common.sign_out')"
        :icon="Icon.SIGN_OUT"
        @click="logout"
      />
      <AppButton
        variant="outlined"
        width="full"
        :label="t('common.settings')"
        :icon="Icon.SETTINGS"
      />
    </div>
  </aside>
</template>
