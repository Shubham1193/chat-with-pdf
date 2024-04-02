// main.js

import { calculateEmbeddings } from "./embedding.js";
import { answerQuestion } from "./qa.js";
import * as dotenv from "dotenv";
// import fs from 'fs'

dotenv.config();
import * as fs from 'fs';
const text = fs.readFileSync("example.txt", "utf-8");


(async () => {
  try {
    const vectorStore = await calculateEmbeddings(text);

    const model = new OpenAI({
      modelName: 'gpt-3.5-turbo'
    });

    const question = 'Where to find openai api key?';
    
    const answer = await answerQuestion(model, vectorStore, question);
    
    console.log({
      question,
      answer
    });
  } catch (error) {
    console.error('Error:', error);
  }
})();
