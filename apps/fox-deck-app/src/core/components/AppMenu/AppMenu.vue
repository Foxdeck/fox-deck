<script setup lang="ts">
import "@material/web/menu/menu.js";
import "@material/web/menu/menu-item.js";
import {onMounted} from "vue";
import AppMenuItem, {type AppMenuItemProps} from "@/core/components/AppMenu/AppMenuItem.vue";


type AppMenuProps = {
  items: AppMenuItemProps[];
}

defineProps<AppMenuProps>();


onMounted(() => {
  const anchorEl = document.body.querySelector("#usage-anchor");
  const menuEl = document.body.querySelector("#usage-menu") as any;
  menuEl.anchorElement = anchorEl;

  anchorEl.addEventListener("click", () => { menuEl.open = !menuEl.open; });
});
</script>

<template>
  <span style="position: relative">
    <div id="usage-anchor">
      <slot />
    </div>
    <md-menu
      id="usage-menu"
    >
      <AppMenuItem
        v-for="item in items"
        :key="item.label"
        :label="item.label"
        :icon="item.icon"
      />
    </md-menu></span>
</template>