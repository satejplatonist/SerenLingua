export const runtime = 'nodejs';
import { HfInference } from '@huggingface/inference'

const hf = new HfInference(process.env.HF_TOKEN);


async function getEmbeddings(doc: string) {
  try {
    if (typeof doc !== 'string' || doc.trim().length === 0) {
        throw new Error('Invalid document input: must be a non-empty string');
    }
    const result = await hf.featureExtraction({
      model: "sentence-transformers/all-MiniLM-L6-v2",
      inputs: doc
    });
    return result;
  } catch (err: any) {
    // Enhanced error logging
    console.error("Embedding generation failed after retries:", {
      message: err.message,
      status: err.response?.status,
      data: err.response?.data,
      stack: err.stack,
    })

    // Provide more specific error messages based on error type
    if (err.message.includes("401")) {
      console.error("Authentication failed: Please check your HF_TOKEN")
    } else if (err.message.includes("429")) {
      console.error("Rate limit exceeded: Too many requests to Hugging Face API")
    } else if (err.message.includes("timeout") || err.name === "AbortError") {
      console.error("Request timed out: Hugging Face API took too long to respond")
    } else {
      console.error(`Embedding failed: ${err.message}, using fallback embeddings`)
    }
    throw new Error(`Embedding failed: ${err.message}`);
  }
}


export {getEmbeddings};
