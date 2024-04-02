import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { HNSWLib } from "langchain/vectorstores/hnswlib";
import { RetrievalQAChain } from "langchain/chains";
import { OpenAI } from "langchain/llms/openai";
import * as dotenv from "dotenv";
import { Document } from "langchain/document";
import { TokenTextSplitter } from "langchain/text_splitter";

dotenv.config();

// const loader = new PDFLoader("src/documents/budget_speech.pdf");

// const docs = await loader.load();

// // splitter function
// const splitter = new RecursiveCharacterTextSplitter({
//   chunkSize: 1000,
//   chunkOverlap: 20,
// });
import * as fs from 'fs';


const data = fs.readFileSync("src\\example.txt" , 'utf8')



const splitter = new TokenTextSplitter({
  chunkSize: 200,
  chunkOverlap: 20,
});

const output = await splitter.createDocuments([data]);
// console.log(output)
// console.log(splittedDocs);

const embeddings = new OpenAIEmbeddings({
  openAIApiKey : "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"
});

const vectorStore = await HNSWLib.fromDocuments(
  output,
  embeddings
);

const vectorStoreRetriever = vectorStore.asRetriever();
const model = new OpenAI({
  modelName: 'gpt-3.5-turbo'
});

const chain = RetrievalQAChain.fromLLM(model, vectorStoreRetriever);

export {chain}


// const question = 'what is seo';

// const answer = await chain.call({
//   query: question
// });

// console.log({
//   question,
//   answer
// });




