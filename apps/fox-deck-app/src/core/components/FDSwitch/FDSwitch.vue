<script setup lang="ts">
import type { PropType } from "vue";
import type { FDComponentSize } from "@/core/types/component.types";

defineProps({
  checked: { type: Boolean, default: false },
  size: {
    type: Object as PropType<FDComponentSize>,
    default: "medium" satisfies FDComponentSize,
  },
});

defineEmits<{
  (e: "onToggle", value: boolean);
}>();
</script>
<template>
  <label
    class="relative h-8 w-14 cursor-pointer [-webkit-tap-highlight-color:_transparent]"
    :class="{
      'h-[22px] w-9': size === 'small',
      'h-10 w-16': size === 'large',
    }"
  >
    <input
      type="checkbox"
      class="peer sr-only [&:checked_+_span_svg[data-checked-icon]]:block [&:checked_+_span_svg[data-unchecked-icon]]:hidden"
      :checked="checked"
      @click="$emit('onToggle', $event.target.checked)"
    >

    <span
      class="absolute inset-y-0 start-0 z-10 m-1 inline-flex h-6 aspect-square items-center justify-center rounded-full bg-white text-gray-400 transition-all peer-checked:start-6 peer-checked:text-success-darker"
      :class="{
        'h-[18px] m-[2px] peer-checked:start-[14px]': size === 'small',
        'h-8 m-1 peer-checked:start-6': size === 'large',
      }"
    >
      <vue-feather
        v-if="checked"
        type="check"
        size="14"
      />
      <vue-feather
        v-else
        type="x"
        size="14"
      />
    </span>

    <span
      class="absolute inset-0 rounded-full bg-gray-300 transition peer-checked:bg-success-normal"
    />
  </label>
</template>
