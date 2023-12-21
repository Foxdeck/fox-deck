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
    class="flex flex-col shadow-md border rounded-2xl overflow-hidden"
    data-testid="card"
  >
    <header
      v-if="hasCardHeader()"
      data-testid="card-header"
    >
      <img
        v-if="imageUrl"
        class="w-full max-h-[300px] object-cover rounded-2xl"
        :alt="imageAlt"
        :src="imageUrl"
      >
    </header>
    <main
      v-if="hasCardBody()"
      class="flex flex-col p-4 gap-3"
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
          :key="action"
          data-testid="card-action"
          :variant="action.variant"
          :label="action.label"
          :icon="action.icon"
        />
      </div>
    </footer>
  </section>
</template>