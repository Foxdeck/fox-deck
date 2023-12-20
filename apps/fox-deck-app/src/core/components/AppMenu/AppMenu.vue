<script setup lang="ts">
import {onMounted} from "vue";
import AppMenuItem from "@/core/components/AppMenu/AppMenuItem.vue";
import type {AppMenuProps} from "@/core/components/AppMenu/AppMenu.types";

// we are using googles material-design menus as foundation, imported here and used as web-components in the template
// @see https://m3.material.io/components/menus/specs
// @see https://github.com/material-components/material-web/blob/main/docs/components/menu.md
import "@material/web/menu/menu.js";
import "@material/web/menu/menu-item.js";

defineProps<AppMenuProps>();

/**
 * We initially need to set the element which opens the element as anchorElement.
 */
onMounted(() => {
  const anchorEl = document.body.querySelector("#usage-anchor");
  const menuEl = document.body.querySelector("#usage-menu") as any;
  menuEl.anchorElement = anchorEl;

  anchorEl.addEventListener("click", () => { menuEl.open = !menuEl.open; });
});
</script>

<template>
  <span style="position: relative">
    <span
      id="usage-anchor"
      data-testid="menu-anchor"
    >
      <slot />
    </span>
    <md-menu
      id="usage-menu"
      data-testid="menu"
    >
      <AppMenuItem
        v-for="item in items"
        :key="item.label"
        :label="item.label"
        :icon="item.icon"
        data-testid="menu-item"
      />
    </md-menu>
  </span>
</template>