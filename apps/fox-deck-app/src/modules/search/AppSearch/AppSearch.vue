<script setup lang="ts">
import {type MaybeElementRef, onClickOutside} from "@vueuse/core";
import _ from "lodash";
import {computed, ref} from "vue";
import {useI18n} from "vue-i18n";

import {Icon} from "@/core/components/AppIcon/icons";
import AppTextField from "@/core/components/AppTextField/AppTextField.vue";
import type {DatabaseResource} from "@/core/services/api";
import {useResourceStore} from "@/modules/resource-navigation/stores/resource.store";
import AppSearchNoResultState from "@/modules/search/AppSearch/AppSearchNoResultState.vue";
import AppSearchResult from "@/modules/search/AppSearch/AppSearchResult.vue";
import "@material/web/progress/linear-progress.js";

const SEARCH_DEBOUNCE_WAIT_MS = 300;

const {t} = useI18n();
const {searchForNotes} = useResourceStore();

const searchResults = ref<DatabaseResource[]>([]);
const searchInput = ref("");
const isSearching = ref<boolean>(false);
const shouldSearchBeOpen = ref(true);
const target = ref(null);

function onSearchInput(searchTerm: string): void {
  isSearching.value = true;
  shouldSearchBeOpen.value = true;
  searchInput.value = searchTerm;

  debouncedSearch(searchTerm);
}

const debouncedSearch = _.debounce(async (searchTerm: string) => {
  searchResults.value = await searchForNotes(searchTerm);
  isSearching.value = false;
}, SEARCH_DEBOUNCE_WAIT_MS);

const hasSearchInputText = computed(() => searchInput.value !== "");

// we want to close the search-container containing the results if you click outside.
// NOTICE: we need to ignore eslint here, because 'onClickOutside' need to have 2 arguments
// eslint-disable-next-line @typescript-eslint/no-unused-vars
onClickOutside(target as MaybeElementRef, event => shouldSearchBeOpen.value = false);
</script>

<template>
  <div
    ref="target"
    class="relative flex w-full justify-center"
  >
    <app-text-field
      class="w-full min-w-[400px] md:w-1/2"
      :label="t('search.placeholder')"
      variant="filled"
      :is-rounded="true"
      :icon="Icon.SEARCH"
      @input="onSearchInput($event.target.value)"
      @click="shouldSearchBeOpen = true;"
    />
    <div
      v-if="shouldSearchBeOpen && hasSearchInputText"
      class="surface-container on-surface-text absolute top-16 z-10 flex w-full min-w-[400px] flex-col overflow-hidden rounded-md shadow-md md:w-1/2"
    >
      <!-- todo: put these into 'AppSearchLoadingState.vue' -->
      <div

        class="flex flex-col"
      >
        <!-- todo: wrap these material-design component into a vue component -->
        <!-- we only hide the progress-bar, because else the search-container would adjust its height after the search -->
        <md-linear-progress
          :class="{
            'visible': isSearching,
            'invisible': !isSearching
          }"
          aria-label="Searching for notes"
          :indeterminate="isSearching"
        />
        <span
          v-if="isSearching"
          class="px-4 pt-4"
        >{{ t("search.searching_state", { text: searchInput}) }}'</span>
      </div>

      <div
        class="flex flex-col gap-2 p-4"
      >
        <app-search-no-result-state
          v-if="!isSearching && searchResults.length === 0"
          :no-result-text="t('search.no_result')"
        />
        <app-search-result
          v-if="!isSearching"
          :results="searchResults"
        />
        <!--        <hr class="mb-3">-->
        <!-- todo: put these into 'AppSearchActions.vue' -->
        <!-- todo: how to make things collapsible? -->
        <!--        <div class="flex gap-1">-->
        <!--          <app-icon :icon="Icon.CARET_DOWN" />-->
        <!--          <span class="body-small font-bold">Actions</span>-->
        <!--        </div>-->
        <!--        <ul>-->
        <!--          <li-->
        <!--            class="flex justify-between p-2"-->
        <!--            tabindex="0"-->
        <!--          >-->
        <!--            <span>-->
        <!--              New Folder "{{ searchInput }}"-->
        <!--            </span>-->
        <!--            <div class="flex items-center gap-2">-->
        <!--              <app-icon :icon="Icon.THUMBTACK" />-->
        <!--              <span class="body-small surface-container-high rounded-md p-1 shadow-inner">CTRL+F</span>-->
        <!--            </div>-->
        <!--          </li>-->
        <!--          <li-->
        <!--            class="flex justify-between p-2"-->
        <!--            tabindex="0"-->
        <!--          >-->
        <!--            <span>-->
        <!--              New Note "{{ searchInput }}"-->
        <!--            </span>-->
        <!--            <div class="flex items-center gap-2">-->
        <!--              <app-icon :icon="Icon.THUMBTACK" />-->
        <!--              <span class="body-small surface-container-high rounded-md p-1  shadow-inner">CTRL+N</span>-->
        <!--            </div>-->
        <!--          </li>-->
        <!--        </ul>-->
        <!--        <hr class="mb-3">-->
        <!-- todo: put these into 'AppSearchFavorites.vue' -->
        <!--        <div class="flex gap-1">-->
        <!--          <app-icon :icon="Icon.CARET_DOWN" />-->
        <!--          <span class="body-small font-bold">Favorites</span>-->
        <!--        </div>-->
        <!--        <ul>-->
        <!--          <li-->
        <!--            class="flex justify-between p-2"-->
        <!--            tabindex="0"-->
        <!--          >-->
        <!--            <span>-->
        <!--              Biology: Cells-->
        <!--            </span>-->
        <!--            <app-icon :icon="Icon.STAR_FILLED" />-->
        <!--          </li>-->
        <!--          <li-->
        <!--            class="flex justify-between p-2"-->
        <!--            tabindex="0"-->
        <!--          >-->
        <!--            <span>-->
        <!--              Chemistry: Exam preparation-->
        <!--            </span>-->
        <!--            <app-icon :icon="Icon.STAR_FILLED" />-->
        <!--          </li>-->
        <!--        </ul>-->
        <!--      </div>-->
      </div>
    </div>
  </div>
</template>