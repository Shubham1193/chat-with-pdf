// embedding.js

import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { TokenTextSplitter } from "langchain/text_splitter";
import { HNSWLib } from "langchain/vectorstores/hnswlib";
import fs from 'fs/promises';

let cachedEmbeddings = null;

export async function calculateEmbeddings(text) {
  if (cachedEmbeddings) {
    console.log("Using cached embeddings.");
    return cachedEmbeddings;
  }

  const splitter = new TokenTextSplitter({
    encodingName: "gpt2",
    chunkSize: 100,
    chunkOverlap: 0,
  });

  const output = await splitter.createDocuments([text]);
  
  const embeddings = new OpenAIEmbeddings({
    openAIApiKey: "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"
  });

  const vectorStore = await HNSWLib.fromDocuments(
    output,
    embeddings
  );

  // Cache the embeddings for future use
  cachedEmbeddings = vectorStore;

  return vectorStore;
}
