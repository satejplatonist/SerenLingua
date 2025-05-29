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
      // Fall back to basic embeddings for auth errors
      // return generateFallbackEmbeddings(doc)
    } else if (err.message.includes("429")) {
      console.error("Rate limit exceeded: Too many requests to Hugging Face API")
      // Fall back to basic embeddings for rate limit errors
      // return generateFallbackEmbeddings(doc)
    } else if (err.message.includes("timeout") || err.name === "AbortError") {
      console.error("Request timed out: Hugging Face API took too long to respond")
      // Fall back to basic embeddings for timeout errors
      // return generateFallbackEmbeddings(doc)
    } else {
      // For other errors, try the fallback
      console.error(`Embedding failed: ${err.message}, using fallback embeddings`)
      // return generateFallbackEmbeddings(doc)
    }
    throw new Error(`Embedding failed: ${err.message}`);
  }
}


export {getEmbeddings};
