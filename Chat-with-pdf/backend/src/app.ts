import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { HNSWLib } from "langchain/vectorstores/hnswlib";
import { RetrievalQAChain } from "langchain/chains";
import { OpenAI } from "langchain/llms/openai";
import * as dotenv from "dotenv";
import express from 'express'
import multer from 'multer'
import cors from 'cors'


const app = express();
app.use(express.json());

app.use(cors());


dotenv.config();

let chain;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./src/documents");
  },
  filename: function (req, file, cb) {
    // const uniqueSuffix = Date.now();
    cb(null,  file.originalname);
  },
});
// Cpt:\Users\Smit Parmar\Desktop\finalrag\React-Pdf-Multer-Backend-main\React-Pdf-Multer-Backend-main\files\ProjectReport.pdf

const upload = multer({ storage: storage });

app.post("/upload-files", upload.single("file"), async (req, res) => {
  console.log(req.file.originalname);
  const filename = req.file.originalname;
  chain = await processFile("./src/documents/" + filename);
  console.log(chain)
  res.send('success');
});

app.post("/ask-questions", async (req, res) => {
  console.log(req.body.que);
  // console.log(chain); // Make sure chain is defined
  const question = req.body.que;

  const answer = await chain.call({
    query: question
  });

  // console.log({
  //   question,
  //   answer
  // });
  console.log(answer['text'])

  res.send(answer['text']);
});

async function processFile(filePath) {
  const loader = new PDFLoader(filePath);
  const docs = await loader.load();

  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  });
  const splittedDocs = await splitter.splitDocuments(docs);

  const embeddings = new OpenAIEmbeddings();
  const vectorStore = await HNSWLib.fromDocuments(splittedDocs, embeddings);
  const vectorStoreRetriever = vectorStore.asRetriever();

  const model = new OpenAI({
    modelName: 'gpt-3.5-turbo'
  });

  const chain = RetrievalQAChain.fromLLM(model, vectorStoreRetriever);

  return chain;
}

app.get("/", async (req, res) => {
  res.send("Success!!!!!!");
});

app.listen(5001, () => {
  console.log("Server Started");
});
