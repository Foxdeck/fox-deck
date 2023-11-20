<script setup lang="ts">
import FDButton from "@/core/components/FDButton/FDButton.vue";
import ContentLayout from "@/core/components/Layouts/ContentLayout.vue";
import Image from "@/assets/images/book.svg";
import FDTypography from "@/core/components/FDTypography/FDTypography.vue";
</script>
<template>
  <ContentLayout>
    <div
      class="grid grid-cols-12 gap-12 justify-center items-center self-center"
    >
      <div class="col-span-8">
        <div class="flex flex-col gap-4">
          <FDTypography type="title"> Mit dem Lernen beginnen! </FDTypography>
          <FDTypography type="p" class="leading-10">
            Entwickle eigene Lernmodule mit gezielten Fragen, die dein Wissen
            effektiv erweitern. Erstelle dafür Fragen, welche dir dabei helfen
            Sachverhalte zu merken und ordne diese anschließend verschiedenen
            Lerneinheiten hinzu.
          </FDTypography>
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
  </ContentLayout>
</template>
