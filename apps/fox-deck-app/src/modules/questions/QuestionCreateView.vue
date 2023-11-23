<script setup lang="ts">
import { reactive } from "vue";
import { useRouter } from "vue-router";
import ContentLayout from "@/core/components/Layouts/ContentLayout.vue";
import FDTypography from "@/core/components/FDTypography/FDTypography.vue";
import FDTextInput from "@/core/components/FDTextInput/FDTextInput.vue";
import FDSwitch from "@/core/components/FDSwitch/FDSwitch.vue";
import FDButton from "@/core/components/FDButton/FDButton.vue";
import type { CreateQuestionRequestDto } from "@/core/services/api";
import { useAuthStore } from "@/core/stores/auth.store";
import { useNotificationStore } from "@/core/stores/notification.store";
import { useQuestions } from "@/modules/questions/composables/useQuestions";

const { push } = useRouter();
const { addNotification } = useNotificationStore();
const { createQuestion } = useQuestions();
const { readJWT } = useAuthStore();

const formModel = reactive<CreateQuestionRequestDto>({
  question: "",
  solution: "",
  authorId: readJWT().id,
  isPublic: false,
});

async function onFormSubmit() {
  try {
    await createQuestion(formModel);
    await push("/questions");
  } catch (e) {
    addNotification({
      title: e.name,
      text: e.message,
      severity: "danger",
    });
  }
}
</script>

<template>
  <ContentLayout>
    <form
      class="flex flex-col bg-white p-8 gap-6 rounded-md max-w-[600px] mx-auto"
      @submit.prevent
    >
      <div class="flex flex-col gap-2">
        <FDTypography type="h1">Frage erstellen</FDTypography>
        <FDTypography type="p">
          Erstelle deine eigene Frage und teile Sie mit der Community!
        </FDTypography>
      </div>
      <div class="flex flex-col gap-2">
        <FDTypography type="psm" class="font-bold">
          Was ist deine Frage?
        </FDTypography>
        <FDTextInput
          label="Frage"
          value=""
          @onInput="formModel.question = $event"
        />
      </div>
      <div class="flex flex-col gap-2">
        <FDTypography type="psm" class="font-bold">
          Wie lautet die Antwort auf deine Frage?
        </FDTypography>
        <textarea
          class="border rounded-sm h-32 p-2 outline-none"
          placeholder="Antwort"
          @input="formModel.solution = $event.target.value"
        ></textarea>
      </div>
      <div class="flex flex-col gap-2">
        <FDTypography type="psm" class="font-bold">
          Ist deine Frage öffentlich?
        </FDTypography>
        <FDTypography type="psm" class="leading-6">
          Wenn du deine mit der Community teilen möchtest, dann können andere
          Benutzer*innen diese für Ihre eigenen Lerneinheiten benutzen.
        </FDTypography>
        <FDSwitch size="medium" @onToggle="formModel.isPublic = $event" />
      </div>
      <FDButton
        class="w-fit"
        icon="save"
        label="Frage erstellen"
        @click="onFormSubmit"
      />
    </form>
  </ContentLayout>
</template>
