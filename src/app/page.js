'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import NavBar from '@/components/NavBar';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileImage, faCamera, faSave, faArrowRight } from '@fortawesome/free-solid-svg-icons';

library.add(fas);



const ReceiptScanner = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState('');
  const [result, setResult] = useState('');
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    // Load Tesseract.js when the component mounts
    const loadTesseract = async () => {
      const Tesseract = await import('tesseract.js');
      window.Tesseract = Tesseract; // Assign to window object for global access
    };

    loadTesseract();
  }, []);

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const scanReceipt = async () => {
    if (!selectedFile) {
      return;
    }

    // Perform OCR using Tesseract.js
    const { data: { text } } = await window.Tesseract.recognize(
      preview,
      'por', // Language code for Portuguese
      { logger: (info) => console.log(info) }
    );

    // Define keywords for each category
    const keywords = {
      name: ['nome'],
      address: ['endereço', 'morada', 'rua'],
      value: ['valor', 'total', 'montante', 'R$'],
    };

    // Split the text into lines
    const lines = text.split('\n');

    // Display the extracted text based on categories
    let extractedResult = '';

    lines.forEach((line) => {
      // Check if the line matches any category keywords
      for (const [category, categoryKeywords] of Object.entries(keywords)) {
        if (categoryKeywords.some((keyword) => line.toLowerCase().includes(keyword))) {
          extractedResult += `<strong>${category}:</strong> ${line}<br>`;
          break; // Stop searching for other categories
        }
      }
    });

    setResult(extractedResult);
  };

  const enableEditing = () => {
    setEditing(true);
  };

  const saveDataAndRedirect = () => {
    // Get existing saved data from local storage
    const savedData = localStorage.getItem('savedData') || '[]';

    // Parse existing data or create an empty array
    const data = JSON.parse(savedData);

    // Add the new extracted text to the data array
    data.push(result);

    // Save the updated data to local storage
    localStorage.setItem('savedData', JSON.stringify(data));

    // Redirect to the save_page.html
    window.location.href = '/savepage';
  };



  window.watsonAssistantChatOptions = {
    integrationID: "12c4a5bd-7a8d-4309-a13d-c5bc209f88a2", // The ID of this integration.
    region: "us-south", // The region your integration is hosted in.
    serviceInstanceID: "df34facd-d05d-4f95-9440-419c759aa83c", // The ID of your service instance.
    onLoad: function(instance) { instance.render(); }
  };
  setTimeout(function(){
    const t=document.createElement('script');
    t.src="https://web-chat.global.assistant.watson.appdomain.cloud/versions/" + (window.watsonAssistantChatOptions.clientVersion || 'latest') + "/WatsonAssistantChatEntry.js";
    document.head.appendChild(t);
  });

 
  
  return (
    <>
    <NavBar></NavBar>
    <div className="bg-gray-600 min-h-screen flex flex-col items-center justify-center">
      <label
        htmlFor="fileInput"
        className="bg-blue-500 text-white py-2 px-4 rounded cursor-pointer transition hover:bg-blue-700"
      >
        <FontAwesomeIcon icon={faFileImage} /> Choose a Receipt Image
      </label>
      
      <input
        type="file"
        accept="image/*"
        id="fileInput"
        onChange={handleFileInputChange}
        className="hidden"
      />
      {preview && (
        <img
          id="preview"
          src={preview}
          alt="Scanned Receipt"
          className="max-w-full max-h-72 mt-4"
        />
      )}
      <button
        id="scanButton"
        disabled={!selectedFile}
        onClick={scanReceipt}
        className="bg-blue-500 text-white py-2 px-4 rounded cursor-pointer transition font-bold mt-4 disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-blue-700"
      >
        <FontAwesomeIcon icon={faCamera} /> Scan Button
      </button>
      <button
        id="saveButton"
        disabled={!result}
        onClick={saveDataAndRedirect}
        className="bg-green-500 text-white py-2 px-4 rounded cursor-pointer transition font-bold mt-4 disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-green-700"
      >
        <FontAwesomeIcon icon={faSave} /> Save Data
      </button>
      <Link href="/savepage">
        <button className="bg-blue-500 text-white py-2 px-4 rounded cursor-pointer transition font-bold mt-4 hover:bg-blue-700">
           Go to Save Page <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </Link>
      <div
        id="result"
        contentEditable={editing}
        className="mt-4 text-gray-700"
        dangerouslySetInnerHTML={{ __html: result }}
      />
    </div>
    </>
  );
};


export default ReceiptScanner;