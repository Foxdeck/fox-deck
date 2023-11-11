<script setup lang="ts">
import { useOpenAI } from "@/composables/useOpenAI";
import FDButton from "@/components/FDButton/FDButton.vue";
import ContentLayout from "@/components/Layouts/ContentLayout.vue";
import Image from "@/assets/images/book.svg";

const openAI = useOpenAI();
</script>
<template>
  <ContentLayout>
    <div
      class="grid grid-cols-12 gap-12 justify-center items-center self-center"
    >
      <div class="col-span-8">
        <div class="flex flex-col gap-4">
          <span
            class="text-7xl font-serif text-primary-950 font-bold 4xl:text-8xl"
          >
            Mit dem Lernen beginnen!
          </span>
          <span class="text-xl mt-2 leading-10 w-full 4xl:text-3xl">
            Entwickle eigene Lernmodule mit gezielten Fragen, die dein Wissen
            effektiv erweitern. Erstelle dafür Fragen, welche dir dabei helfen
            Sachverhalte zu merken und ordne diese anschließend verschiedenen
            Lerneinheiten hinzu.
          </span>
          <RouterLink class="w-fit" to="/questions">
            <FDButton
              class="mt-5"
              icon="chevron-right"
              label="Jetzt Fragen erstellen"
            />
          </RouterLink>
        </div>
      </div>
      <div class="relative col-span-4">
        <Image />
      </div>
    </div>
    <!--    <div-->
    <!--      class="w-1/3 shadow-xl border h-full text-primary-950 bg-white flex flex-col justify-center rounded-2xl p-8 text-center 4xl:py-24"-->
    <!--    >-->
    <!--      <span class="text-4xl font-serif font-bold 4xl:text-5xl">-->
    <!--        Zufällige Fragen-->
    <!--      </span>-->
    <!--      <span class="text-xl my-4 4xl:text-2xl"-->
    <!--        >Lass dir jetzt von ChatGPT Fragen zu verschiedensten Themen-->
    <!--        stellen.</span-->
    <!--      >-->
    <!--      <FDButton-->
    <!--        class="mx-auto"-->
    <!--        label="Zufällige Fragen stellen"-->
    <!--        type="secondary"-->
    <!--        @click="openAI.generateQuestions('WiSo')"-->
    <!--      />-->
    <!--    </div>-->
    <!--    <FDGrid>-->
    <!--      <FDGridColumn :col-span="9">-->
    <!--        <div class="flex flex-col">-->
    <!--          <span class="text-4xl font-serif font-bold text-primary-950">-->
    <!--            Updates WIP-->
    <!--          </span>-->
    <!--        </div>-->
    <!--      </FDGridColumn>-->
    <!--    </FDGrid>-->
  </ContentLayout>
</template>
