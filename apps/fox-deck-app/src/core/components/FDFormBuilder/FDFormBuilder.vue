<script setup lang="ts">
import {Form as VeeForm, type YupSchema} from "vee-validate";
import type {Component, PropType} from "vue";
import {defineEmits} from "vue";
import {useI18n} from "vue-i18n";
import AppButton from "@/core/components/AppButton/AppButton.vue";
import FDTypography from "@/core/components/FDTypography/FDTypography.vue";
import AppIcon from "@/core/components/AppIcon/AppIcon.vue";
import {Icon} from "@/core/components/AppIcon/icons";
import AppTextField from "@/core/components/AppTextField/AppTextField.vue";

const { t } = useI18n();

export type FormSchemaAction = {
  label: string;
};

export type FormSchemaType = {
  label: string;
  name: string;
  type: string;
  component: Component;
};

export type FormSchema = {
  fields: FormSchemaType[];
  validation: YupSchema;
  action: FormSchemaAction;
}

const props = defineProps({
  formSchema: {
    type: Object as PropType<FormSchema>,
    required: false,
    default: null
  },
  formErrorText: String,
  isFormError: Boolean
});

defineEmits<{
  (e: "onSubmit", value: any): void;
}>();

function getIconForComponent(component: Component) {
  switch (component) {
  case AppTextField: {
    if (props.isFormError) {
      return Icon.WARNING;
    }
    break;
  } 
    
  default:
    return undefined;
  }
}
</script>

<template>
  <VeeForm
    class="flex flex-col gap-4 w-full"
    :validation-schema="formSchema.validation"
    @submit="$emit('onSubmit', $event)"
  >
    <Component
      :is="field.component"
      v-for="field of formSchema.fields"
      :key="field.name"
      :icon="getIconForComponent(field.component)"
      :error="field.component === AppTextField ? isFormError : undefined"
      :name="field.name"
      :type="field.type"
      :label="t(field.label)"
    />
    <FDTypography
      v-if="isFormError"
      type="psm"
      class="flex gap-4 items-center p-4 rounded-md bg-danger-light text-danger-normal"
    >
      <AppIcon :icon="Icon.WARNING" />
      {{ formErrorText }}
    </FDTypography>
    <!-- TODO: we need to make <form> to be submitted by pressing the 'Enter'-Key. -->
    <!--       This can be achieved by e.g. using a <input type="submit">-element inside the form. -->
    <!--       Instead we are using the <md-button> here. -->
    <AppButton
      v-if="formSchema.action"
      class="mt-2"
      :class="{
        'shake': isFormError
      }"
      width="full"
      :severity="isFormError ? 'danger' : 'primary'"
      :label="t(formSchema.action.label)"
    />
  </VeeForm>
</template>

<style scoped>
.shake {
  animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 0, 0);
}

@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}

</style>