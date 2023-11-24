<script setup lang="ts">
import {ref} from "vue";
import {useRouter} from "vue-router";
import * as Yup from "yup";
import {Form} from "vee-validate";
import ContentLayout from "@/core/components/Layouts/ContentLayout.vue";
import FDTypography from "@/core/components/FDTypography/FDTypography.vue";
import FDTextInput from "@/core/components/FDTextInput/FDTextInput.vue";
import FDSwitch from "@/core/components/FDSwitch/FDSwitch.vue";
import FDButton from "@/core/components/FDButton/FDButton.vue";
import {useAuthStore} from "@/core/stores/auth.store";
import {useNotificationStore} from "@/core/stores/notification.store";
import {useQuestions} from "@/modules/questions/composables/useQuestions";
import FDTextArea from "@/core/components/FDTextArea/FDTextArea.vue";
import type {CreateQuestionRequestDto} from "@/core/services/api";

const { push } = useRouter();
const { addNotification } = useNotificationStore();
const { createQuestion } = useQuestions();
const { readJWT } = useAuthStore();

const schema = Yup.object().shape({
  question: Yup.string().required("Bitte gib Sie eine Frage ein."),
  solution: Yup.string().required("Bitte gib eine Antwort auf deine Frage ein."),
});

const hasFormError = ref(false);
const isPublic = ref(false);

async function onFormSubmit(formModel: any) {
  try {
    const question: CreateQuestionRequestDto = {
      ...formModel,
      isPublic: isPublic.value,
      authorId: readJWT().id
    };
    await createQuestion(question);
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
    <Form
      class="flex flex-col bg-white p-8 gap-6 rounded-md max-w-[600px] mx-auto"
      :validation-schema="schema"
      @submit="onFormSubmit"
      @invalid-submit="hasFormError = true"
    >
      <div class="flex flex-col gap-2">
        <FDTypography type="h1">
          Frage erstellen
        </FDTypography>
        <FDTypography type="p">
          Erstelle deine eigene Frage und teile Sie mit der Community!
        </FDTypography>
      </div>
      <div class="flex flex-col gap-2">
        <FDTypography
          type="psm"
          class="font-bold"
        >
          Was ist deine Frage?
        </FDTypography>
        <FDTextInput
          name="question"
          label="Frage"
        />
      </div>
      <div class="flex flex-col gap-2">
        <FDTypography
          type="psm"
          class="font-bold"
        >
          Wie lautet die Antwort auf deine Frage?
        </FDTypography>
        <FDTextArea
          name="solution"
        />
      </div>
      <div class="flex flex-col gap-2">
        <FDTypography
          type="psm"
          class="font-bold"
        >
          Ist deine Frage öffentlich?
        </FDTypography>
        <FDTypography
          type="psm"
          class="leading-6"
        >
          Wenn du deine mit der Community teilen möchtest, dann können andere
          Benutzer*innen diese für Ihre eigenen Lerneinheiten benutzen.
        </FDTypography>
        <FDSwitch
          size="medium"
          @on-toggle="isPublic = $event"
        />
      </div>
      <FDTypography
        v-if="hasFormError"
        type="psm"
        class="ml-2 inline-block text-danger-normal"
        data-testid="errorMessage"
      >
        Beim Speichern der Frage ist ein Fehler aufgetreten. Bitte prüfe die Eingaben.
      </FDTypography>
      <FDButton
        class="w-fit"
        icon="save"
        label="Frage erstellen"
      />
    </Form>
  </ContentLayout>
</template>
