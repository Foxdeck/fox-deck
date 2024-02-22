<script setup lang="ts">
import {Form as VeeForm, type YupSchema} from "vee-validate";
import type {Component, PropType} from "vue";
import {defineEmits} from "vue";
import {useI18n} from "vue-i18n";
import AppButton from "@/core/components/AppButton/AppButton.vue";

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

defineProps({
  formSchema: {
    type: Object as PropType<FormSchema>,
    required: false,
    default: null
  }
});

defineEmits<{
  (e: "onSubmit", value: any): void;
}>();
</script>

<template>
  <VeeForm
    class="flex flex-col gap-2"
    :validation-schema="formSchema.validation"
    @submit="$emit('onSubmit', $event)"
  >
    <Component
      :is="field.component"
      v-for="field of formSchema.fields"
      :key="field.name"
      :name="field.name"
      :type="field.type"
      :label="t(field.label)"
    />
    <!-- TODO: we need to make <form> to be submitted by pressing the 'Enter'-Key. -->
    <!--       This can be achieved by e.g. using a <input type="submit">-element inside the form. -->
    <!--       Instead we are using the <md-button> here. -->
    <AppButton
      v-if="formSchema.action"
      class="mt-2"
      :label="t(formSchema.action.label)"
    />
  </VeeForm>
</template>