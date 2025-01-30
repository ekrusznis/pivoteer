import { useState } from "react";

const FileUpload = () => {
  const [files, setFiles] = useState([]);

  const handleFileChange = (event) => {
    const uploadedFiles = Array.from(event.target.files);
    setFiles([...files, ...uploadedFiles]);
  };

  return (
    <div className="min-h-screen bg-darkBg text-lightText p-6">
      <h1 className="text-2xl font-semibold mb-4">Upload Your Spreadsheet</h1>

      <input type="file" multiple accept=".xls,.xlsx,.csv" className="p-3 bg-darkCard rounded-lg" onChange={handleFileChange} />

      <div className="mt-6">
        {files.length > 0 && (
          <ul className="bg-darkCard p-4 rounded-lg">
            {files.map((file, index) => (
              <li key={index} className="py-2 border-b border-gray-700">{file.name}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
