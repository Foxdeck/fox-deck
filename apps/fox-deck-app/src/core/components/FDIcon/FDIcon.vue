<script setup lang="ts">

import {Icon} from "@/core/components/FDIcon/icons";

type FDIconProps = {
  icon: Icon;
}

defineProps<FDIconProps>();

</script>
<template>
  <span
    class="fi m-0 p-0"
    :class="icon"
  />
</template>