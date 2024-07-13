<script setup lang="ts">
import AppButton from "@/core/components/AppButton/AppButton.vue";
import type {AppCardActions, AppCardProps} from "@/core/components/AppCard/AppCard.types";

const props = withDefaults(defineProps<AppCardProps>(), {
  headline: "",
  subhead: "",
  supportingText: "",
  imageUrl: undefined,
  imageAlt: "",
  actions: () => [] as AppCardActions,
});

const hasCardHeader = () => !!props.imageUrl;
const hasCardBody = () => props.headline || props.subhead || props.supportingText;
const hasCardFooter = () => props.actions.length > 0;
</script>

<template>
  <section
    class="surface on-surface-text flex flex-col overflow-hidden rounded-2xl shadow-md"
    data-testid="card"
  >
    <header
      v-if="hasCardHeader()"
      data-testid="card-header"
    >
      <img
        v-if="imageUrl"
        class="max-h-[300px] w-full rounded-2xl object-cover"
        :alt="imageAlt"
        :src="imageUrl"
      >
    </header>
    <main
      v-if="hasCardBody()"
      class="flex flex-col gap-3 p-4"
      data-testid="card-body"
    >
      <span
        class="text-4xl font-bold"
        data-testid="card-headline"
      >{{ headline }}</span>
      <span class="text-2xl">{{ subhead }}</span>
      <article class="text-base">
        {{ supportingText }}
      </article>
    </main>
    <footer
      v-if="hasCardFooter()"
      class="flex flex-wrap justify-between p-4"
      data-testid="card-footer"
    >
      <div
        class="flex flex-wrap gap-2"
      >
        <AppButton
          v-for="action of actions"
          :key="action.label"
          data-testid="card-action"
          :variant="action.variant"
          :label="action.label"
          :icon="action.icon"
        />
      </div>
    </footer>
  </section>
</template>