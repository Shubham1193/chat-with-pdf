import { chain } from "./app.js";



const question = 'What is the budget allocated for railways?';

const answer = await chain.call({
  query: question
});

console.log({
  question,
  answer
});




