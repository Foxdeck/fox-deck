<script setup lang="ts">
import AppCard from "@/core/components/AppCard/AppCard.vue";
import Banner from "./../../storybook/storybook-introduction-banner.png";
import IntroductionButton from "./../../storybook/INTRODUCTION_BUTTON.png";
import IntroductionCard from "./../../storybook/INTRODUCTION_CARD.png";
import IntroductionTextField from "./../../storybook/INTRODUCTION_TEXTFIELD.png";

const storys = [
  {
    headline: "Buttons",
    supportingText: "Buttons prompt most actions in a UI.",
    imageUrl: IntroductionButton as string,
    url: "/story/src-core-components-appbutton-appbutton-story-vue?variantId=src-core-components-appbutton-appbutton-story-vue-0"
  },
  {
    headline: "Cards",
    supportingText: "Cards display content in a elevated container.",
    imageUrl: IntroductionCard as string,
    url: "/story/src-core-components-appcard-appcard-story-vue?variantId=src-core-components-appcard-appcard-story-vue-0"
  },
  {
    headline: "TextFields",
    supportingText: "TextFields lets the users enter text into the UI.",
    imageUrl: IntroductionTextField as string,
    url: "/story/src-core-components-apptextfield-apptextfield-story-vue?variantId=src-core-components-apptextfield-apptextfield-story-vue-0"
  }
];
</script>
<template>
  <Story
    title="Introduction"
    group="introduction"
    :layout="{ type: 'single', iframe: false }"
    responsive-disabled
    auto-props-disabled
  >
    <img
      :src="Banner"
      alt="banner"
    >
    <article class="flex gap-4 p-4 my-4 text-sm rounded-md normalize-p bg-gray-800 text-white">
      <span class="fi fi-rr-hand-wave !text-2xl" />
      This documentation should show you the basics of Foxdecks UI. It should be the comprehensive Guidelines for UI/UX
      decisions made within the Software. We highly recommend reading this guidelines, if you are interested in development
      of the Foxdeck Front-End.
    </article>
    <span class="text-3xl font-bold mb-4 mt-6 flex">Components</span>
    <div class="grid gap-4 grid-cols-1 md:grid-cols-2 2xl:grid-cols-3">
      <a
        v-for="story in storys"
        :key="story"
        class="cursor-pointer transition hover:opacity-80"
        :href="story.url"
      >
        <AppCard
          class="h-full"
          :headline="story.headline"
          :supporting-text="story.supportingText"
          :image-url="story.imageUrl"
        />
      </a>
    </div>
  </Story>
</template>
