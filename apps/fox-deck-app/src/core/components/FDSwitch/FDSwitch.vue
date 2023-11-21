<script setup lang="ts">
defineProps({
  checked: { type: Boolean, default: false },
});
</script>
<template>
  <label
    class="relative h-8 w-14 cursor-pointer [-webkit-tap-highlight-color:_transparent]"
  >
    <input
      type="checkbox"
      class="peer sr-only [&:checked_+_span_svg[data-checked-icon]]:block [&:checked_+_span_svg[data-unchecked-icon]]:hidden"
      :checked="checked"
    />

    <span
      class="absolute inset-y-0 start-0 z-10 m-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white text-gray-400 transition-all peer-checked:start-6 peer-checked:text-success-darker"
    >
      <vue-feather v-if="checked" type="check" size="14" />
      <vue-feather v-else type="x" size="14" />
    </span>

    <span
      class="absolute inset-0 rounded-full bg-gray-300 transition peer-checked:bg-success-normal"
    ></span>
  </label>
</template>
