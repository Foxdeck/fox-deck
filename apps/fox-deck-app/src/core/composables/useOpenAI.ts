import OpenAI from "openai";
import { useQuestionnaireStore } from "@/core/stores/questionnaire.store";

export function useOpenAI() {
  const questionnaireStore = useQuestionnaireStore();

  const openAI: OpenAI = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_KEY,
    dangerouslyAllowBrowser: true,
  });

  const generateQuestions = async (topic: string) => {
    const prompt = `
            Generiere 10 Fragen zu folgendem Thema: ${topic}
    
            Antworte nur als JSON in folgendem interface:
            
            type Question = {
                question: string;
                solution: string;
            }
        `;

    const response = await openAI.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-3.5-turbo",
    });

    const lastIndex = response.choices.length - 1;
    questionnaireStore.questions = response.choices[lastIndex].message
      .content as any;
  };

  return {
    openAI: openAI,
    generateQuestions: generateQuestions,
  };
}
