const ytdl = require('ytdl-core');
const fs = require('fs');
const { spawn } = require('child_process');

// Define options for ytdl
const options = {
    quality: 'lowestaudio', // Download the highest quality audio format available
};

// Define the URL of the YouTube video you want to download
const videoUrl = 'https://www.youtube.com/watch?v=UgX5lgv4uVM&t=2809s';

// Download the video and save it as an MP4 file
ytdl(videoUrl, options)
    .pipe(fs.createWriteStream('video.mp3'))
    .on('finish', () => {
        console.log('Video downloaded successfully.');
        // Once the video is downloaded, speed up the audio
      
    })
    .on('error', (error) => {
        console.error('Error downloading video:', error);
    });

// Function to speed up the audio using ffmpeg
