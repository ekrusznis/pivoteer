import type * as React from "react";
import { useRef } from "react";
import { Upload, File } from "lucide-react";

import { Button } from "@/components/ui/button";

const FileUploadSection = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async () => {
      const result = reader.result;
      console.log("result", result);
      // here should be an API call for saving uploaded file
      e.target.value = "";
    };
    reader.readAsDataURL(file);
  };

  const handleSelectFile = (): void => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full max-w-3xl mx-auto mt-10">
      <div className="border-dashed border-2 rounded-lg p-6 flex flex-col items-center justify-center gap-4 text-center">
        <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center">
          <Upload className="h-8 w-8 text-electricPurple" />
        </div>

        <div>
          <h3 className="text-lg font-semibold">Upload Spreadsheet Files</h3>
        </div>

        <div className="mt-2">
          <Button onClick={() => handleSelectFile()} className="px-6">
            <File /> Upload File
          </Button>
          <input
            id="file-input"
            type="file"
            ref={fileInputRef}
            accept=".csv,.xls,.xlsx"
            className="hidden"
            onChange={handleFileInput}
            aria-label="Upload spreadsheet files"
          />
        </div>

        <p className="text-xs text-lightViolet">
          Supports Excel (.xls, .xlsx) and CSV files up to 10MB
        </p>
      </div>
    </div>
  );
};

export default FileUploadSection;
