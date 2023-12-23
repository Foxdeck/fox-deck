<script setup>
import AppButton from "@/core/components/AppButton/AppButton.vue";
import {Icon} from "@/core/components/AppIcon/icons";
</script>
<template>
  <Story
    title="Components/Buttons"
    :layout="{ type: 'grid', iframe: false }"
  >
    <Variant title="Tonal">
      <AppButton
        variant="tonal"
        label="Home"
        :icon="Icon.HOME"
      />
    </Variant>
    <Variant title="Outlined">
      <AppButton
        variant="outlined"
        label="74 Comments"
      />
    </Variant>
    <Variant title="Text">
      <AppButton
        variant="text"
        label="Back"
        :icon="Icon.CHEVRON_LEFT"
      />
    </Variant>
  </Story>
</template>

<docs lang="md">
# Button

## Usage

In UI and UX design, a button is a fundamental element that enacts specific actions within software or applications.

## Variants

Buttons have 3 different variants:
* **Tonal (default)**: Button has a full colored background and no border.
* **Outlined**: Button has a transparent background and a border.
* **Text**: Button has a transparent background and no border.

## Width

Buttons are as wide as their content by default. However, the width can be controlled via the width property:

* **Block (default)**: Buttons are as wide as their content.
* **Full**: Buttons use the full width of their container.
</docs>