import { chain } from "./app.js";



const question = 'how self driving cars work';

const answer = await chain.call({
  query: question
});

console.log({
  question,
  answer
});




