import React, { useState } from 'react';
import axios from 'axios';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import CircularProgress from '@mui/joy/CircularProgress';
import Button from '@mui/joy/Button';


function App() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [file, setFile] = useState();
  const [uploaded, setUploaded] = useState(false);
  const [uploading, setUploading] = useState(false); // New state for uploading indicator
  const [filename, setFileName] = useState('')

  const handleFileChange = (event) => {
    // setFile(event.target.files[0]);
    // console.log(file)
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setFileName(selectedFile.name);
    console.log(filename)
  };

  const handleUploadFile = async () => {
    try {
      setUploading(true); // Set uploading to true when starting the upload
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post('http://localhost:5001/upload-files', formData);
      console.log(response);
      setUploaded(true);
      // Handle successful upload (e.g., display a success message)
    } catch (error) {
      console.error(error);
      // Handle upload error (e.g., display an error message)
    } finally {
      setUploading(false); // Set uploading to false when upload is complete or encounters an error
    }
  };

  const handleAsk = async () => {
    try {
      const response = await axios.post('http://localhost:5001/ask-questions', { que: question });
      setAnswer(response.data);
    } catch (error) {
      console.error(error);
      // Handle question asking error (e.g., display an error message)
    }
  };

  return (
    <div className='container'>
      <div className='title'>Chat with Pdf </div>
      <br></br>

      <input type="file" id="files" onChange={handleFileChange} className='hiddeninput' />
      <label for="files">{filename || 'Choose File'}</label>

      {/* <Button className="uploadbtn" onClick={handleUploadFile}>{uploaded ? 'Uploaded' : 'Upload'}</Button> : <></> */}

      <div style={{width: "6rem" , height: "6rem"  , display:"flex" , justifyContent : 'center' , alignItems:'center'}}>
        {
          uploading ? <CircularProgress /> : <Button className="uploadbtn" onClick={handleUploadFile}>{uploaded ? 'Uploaded' : 'Upload'}</Button>
        }
      </div>




      {/* <input  type="files" id="files" onChange={handleFileChange}/>
      <label for="files"><Button onClick={handleUploadFile}>Upload File</Button></label> */}

      <br></br>



      <input type="text" className='queinput' placeholder="Enter your question" value={question} onChange={(e) => setQuestion(e.target.value)} />
      <Button onClick={handleAsk} className='askbtn'>Ask</Button>


      <div className='answer'><h4>{answer}</h4></div>
    </div>
  );
}

export default App;
