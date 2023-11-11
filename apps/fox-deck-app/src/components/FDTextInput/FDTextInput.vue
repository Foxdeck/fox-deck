<script setup lang="ts">
import { ref } from "vue";

const props = defineProps({
  label: { type: String, required: false },
  value: { type: String, required: true, default: "" },
  disabled: { type: Boolean, required: false, default: false },
  errorMessage: { type: String, required: false, default: "" },
  shouldValidate: { type: Boolean, required: false, default: true },
  icon: {
    type: String,
    required: false,
    default: false,
  },
  isRounded: {
    type: Boolean,
    required: false,
    default: true,
  },
  isValid: { type: Boolean, required: false, default: true },
  isTouched: { type: Boolean, required: false, default: false },
});

const emit = defineEmits<{
  onInput: string;
}>();

const isTouched = ref(props.isTouched);
const isFocused = ref(false);

const onInputUpdate = (value: string) => {
  isTouched.value = true;
  emit("onInput", value);
};
</script>
<template>
  <label class="input-group">
    <span
      v-if="label"
      class="input-label"
      :class="{
        valid: isValid && isTouched && shouldValidate,
        invalid: !isValid && isTouched,
        '!-translate-y-2.5': isFocused || value.length > 0,
        'translate-y-3': value.length === 0,
        'text-black/60': !isFocused,
        'text-primary-800': isFocused,
        'translate-x-3': isRounded,
        'bg-white': !disabled,
        'cursor-not-allowed': disabled,
      }"
      >{{ label }}
    </span>
    <span
      class="input-wrapper"
      :class="{
        valid: isValid && isTouched && shouldValidate,
        invalid: !isValid && isTouched,
        focused: isFocused,
        'rounded-full': isRounded,
        disabled: disabled,
      }"
    >
      <input
        type="text"
        class="input"
        :class="{
          'pl-4': isRounded,
          'cursor-not-allowed': disabled,
        }"
        :value="value"
        :disabled="disabled"
        @focusin="isFocused = true"
        @focusout="isFocused = false"
        @input="onInputUpdate($event.target.value)"
      />
      <vue-feather v-if="icon" class="mr-2 w-5" :type="icon" />
      <vue-feather
        v-if="!isValid && isTouched"
        class="mr-2"
        type="alert-triangle"
      />
    </span>
    <span
      v-if="!isValid && isTouched"
      class="h-auto w-56 max-w-full text-danger-normal text-xs mx-1"
      >{{ errorMessage }}</span
    >
  </label>
</template>

<style scoped lang="scss">
.input-group {
  @apply flex flex-col;

  .input-label {
    @apply absolute text-sm rounded-sm px-2 translate-x-1 transition ease-in-out font-gabarito;

    &.focused {
      @apply text-primary-800;
    }

    &.valid {
      @apply text-success-darker;
    }

    &.invalid {
      @apply text-danger-normal;
    }
  }

  .input-wrapper {
    @apply flex items-center border-2 rounded-full bg-white/90;

    &.focused {
      @apply border-primary-800;
    }

    &.valid {
      @apply border-success-darker text-success-darker;
    }

    &.invalid {
      @apply border-danger-normal text-danger-normal;
    }

    &.disabled {
      @apply bg-gray-100;
    }
  }

  .input {
    @apply outline-none p-2 border-none bg-transparent font-gabarito text-sm;
  }
}
</style>
