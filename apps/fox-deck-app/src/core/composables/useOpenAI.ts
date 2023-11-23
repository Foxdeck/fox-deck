import OpenAI from "openai";

/**
 * Composable for interacting with openAIs API for ChatGPT.
 */
export function useOpenAI() {
  const openAI: OpenAI = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_KEY,
    dangerouslyAllowBrowser: true,
  });

  /**
   * // TODO: this should be refactored to be in the backend.
   * Generate questions from ChatGPT.
   * @param topic {string} the topic which the user wants questions from.
   */
  const generateQuestions = async (topic: string): Promise<any> => {
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
    return response.choices[lastIndex].message.content as any;
  };

  return {
    openAI: openAI,
    generateQuestions: generateQuestions,
  };
}
