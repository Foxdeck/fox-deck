<script setup lang="ts">
import "@material/web/switch/switch";

type AppSwitchProps = {
  ariaLabel: string;
  modelValue?: boolean;
}

defineProps<AppSwitchProps>();

defineEmits(["update:modelValue"]);

</script>

<template>
  <md-switch
    icons
    :aria-label="ariaLabel"
    :value="!!modelValue ? 'on' : 'off'"
    :selected="modelValue"
    @change="$emit('update:modelValue', $event.target.selected)"
  />
</template>