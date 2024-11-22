import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

/**
 * Gera uma descrição textual detalhada para uma imagem utilizando o modelo Gemini-1.5-flash da Google AI.
 *
 * @param {Buffer} imageBuffer - Buffer contendo os dados binários da imagem.
 * @returns {Promise<string>} Uma promessa que resolve para a descrição textual gerada ou "Alt-text não disponível." em caso de erro.
 * @throws {Error} Lança um erro caso ocorra algum problema durante a geração da descrição.
 */
export default async function gerarDescricaoComGemini(imageBuffer) {
  // Cria um prompt básico para a geração da descrição
  const prompt = "Gere uma descrição em português do brasil para a seguinte imagem em apenas uma linha";

  try {
    // Cria um objeto que representa a imagem, convertendo o buffer para base64
    const image = {
      inlineData: {
        data: imageBuffer.toString("base64"),
        mimeType: "image/png",
      },
    };

    // Envia o prompt e a imagem para o modelo Gemini e aguarda a resposta
    const res = await model.generateContent([prompt, image]);

    // Extrai o texto da resposta e retorna
    return res.response.text() || "Alt-text não disponível.";
  } catch (error) {
    // Imprime uma mensagem de erro no console e relança um erro personalizado
    console.error("Erro ao obter alt-text:", error.message, error);
    throw new Error("Erro ao obter o alt-text do Gemini.");
  }
}