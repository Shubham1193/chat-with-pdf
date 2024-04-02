// qa.js

import { RetrievalQAChain } from "langchain/chains";
import { OpenAI } from "langchain/llms/openai";

export async function answerQuestion(model, vectorStore, question) {
  const vectorStoreRetriever = vectorStore.asRetriever();
  
  const chain = RetrievalQAChain.fromLLM(model, vectorStoreRetriever);

  const answer = await chain.call({
    query: question
  });

  return answer;
}
