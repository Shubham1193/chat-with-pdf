// const OpenAI = require("openai")
// const fs = require("fs")

import OpenAI from "openai";
import * as fs from 'fs';


const openai = new OpenAI({
    apiKey: "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"
})


const audioFun = async () => {
    const transcription = await openai.audio.transcriptions.create({
        file: fs.createReadStream("video.mp3"),
        model: "whisper-1"
    })
    // console.log(transcription.text)
    
// Write data to a file
    fs.writeFile('example.txt', transcription.text , (err) => {
    if (err) {
        console.error('Error writing to file:', err);
    return;
    }
    console.log('Data has been written to file successfully.');
});

}
audioFun();
// fs.readFile(example.txt)