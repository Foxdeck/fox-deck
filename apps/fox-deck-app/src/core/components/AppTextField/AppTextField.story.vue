<script setup lang="ts">
import AppTextField from "@/core/components/AppTextField/AppTextField.vue";
import {Icon} from "@/core/components/AppIcon/icons";
</script>
<template>
  <Story
    title="Components/TextFields"
    :layout="{ type: 'grid', iframe: false }"
  >
    <Variant title="Filled with supporting text">
      <AppTextField
        label="E-Mail"
        variant="filled"
        supporting-text="Put your E-Mail here."
        model-value="john.doe@gmail.com"
        :icon="Icon.SIGN_IN"
      />
    </Variant>
    <Variant title="Filled with error">
      <AppTextField
        label="E-Mail"
        variant="filled"
        model-value="john.doe"
        error-text="E-Mail is not valid"
        :icon="Icon.SIGN_IN"
        :error="true"
      />
    </Variant>
    <Variant title="Outlined">
      <AppTextField
        variant="outlined"
        placeholder="Search"
        :icon="Icon.SEARCH"
      />
    </Variant>
  </Story>
</template>