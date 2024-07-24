<script setup lang="ts">
import {onMounted} from "vue";

import type {AppMenuItemOnMenuActionSelect, AppMenuProps} from "@/core/components/AppMenu/AppMenu.types";
import AppMenuItem from "@/core/components/AppMenu/AppMenuItem.vue";

// we are using googles material-design menus as foundation, imported here and used as web-components in the template
// @see https://m3.material.io/components/menus/specs
// @see https://github.com/material-components/material-web/blob/main/docs/components/menu.md
import "@material/web/menu/menu.js";
import "@material/web/menu/menu-item.js";
import {Logger} from "@/core/util/logging.util";

const IS_MENU_OPEN_BY_DEFAULT = false;

const props = defineProps<AppMenuProps>();

/**
 * initially set the element which opens the element as anchorElement.
 */
onMounted(() => {
  const anchorElementSelector = "#usage-anchor_" + props.identifier;
  const menuElementSelector = "#usage-menu_" + props.identifier;
  const anchorEl = document.body.querySelector(anchorElementSelector);
  const menuEl = document.body.querySelector(menuElementSelector) as any; // we need to use any here, because the properties of this element is given by material-design

  menuEl.anchorElement = anchorEl;
  menuEl.open = IS_MENU_OPEN_BY_DEFAULT;

  if (!anchorEl) {
    Logger.error({
      filename: "app-menu",
      method: "onMounted",
      message: `can't find element with id: ${anchorElementSelector}`
    });
    return;
  }

  anchorEl.addEventListener("click", (e) => {
    onAnchorElementTrigger(e, menuEl);
  });

  // todo: make 'enter'-key usable for keyboard navigation
});

function onAnchorElementTrigger(e: Event, menuElement: any) {
  // prevent click events from parent component
  e.stopPropagation();
  menuElement.open = !menuElement.open;
}

defineEmits<{
  (e: "onActionSelect", value: AppMenuItemOnMenuActionSelect): void;
}>();
</script>

<template>
  <div class="relative">
    <span
      :id="'usage-anchor_'+identifier"
      data-testid="menu-anchor"
    >
      <slot />
    </span>
    <md-menu
      :id="'usage-menu_'+identifier"
      data-testid="menu"
    >
      <AppMenuItem
        v-for="item in items"
        :key="item.label"
        :label="item.label"
        :icon="item.icon"
        data-testid="menu-item"
        @click.stop="$emit('onActionSelect', { actionIdentifier: item.identifier, itemIdentifier: identifier })"
      />
    </md-menu>
  </div>
</template>

<style>
:root {
  --md-menu-container-color: var(--md-sys-color-surface);
  --md-menu-container-shape: .4rem;
}

md-menu {
  border-radius: 1rem;
  min-width: 200px;
}
</style>