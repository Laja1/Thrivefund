import React, { useState, useCallback } from 'react';
import { useDropzone, Accept } from 'react-dropzone';
import { FaCloudUploadAlt } from 'react-icons/fa';

interface Upload {
  name: string;
  // Add more properties if needed
}

interface FundingMediaProps {
  defaultValues?: { upload?: Upload };
  onSubmit: (data: { file: File }) => void;
  onPrevious: () => void;
}

export default function FundingMedia({ defaultValues, onSubmit, onPrevious }: FundingMediaProps) {
  const [upload, setUpload] = useState<Upload | undefined>(defaultValues?.upload);
  const [file, setFile] = useState<File | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const selectedFile = acceptedFiles[0];
    setFile(selectedFile);
    setUpload({ name: selectedFile.name });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/*' as unknown as Accept,
    multiple: false,
  });

  const handleRemoveUpload = () => {
    setUpload(undefined);
    setFile(null);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (file) {
      onSubmit({ file });
    }
  };

  return (
    <div className="pt-5">
      <p className="text-3xl font-bold pb-3">Fundraiser Media</p>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 mb-6 md:grid-cols-1">
          <div
            {...getRootProps()}
            style={{
              border: '2px dashed #e2e8f0',
              borderRadius: '8px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              padding: '32px',
              backgroundColor: '#f8fafc',
              minHeight: '200px',
              outline: 'none',
              transition: 'border 0.24s ease-in-out',
              borderColor: isDragActive ? '#3b82f6' : '#e2e8f0',
            }}
          >
            <input {...getInputProps()} />
            <FaCloudUploadAlt className="text-4xl text-gray-400 mb-2" />
            {isDragActive ? (
              <p className="text-gray-600">Drop the file here...</p>
            ) : (
                <div><p className="text-gray-600">Drag 'n' drop media here, or click to select media</p>
                <p className="text-gray-600 text-sm text-center  pt-5">Upload a valid & clear cover photo</p></div>
            )}
          </div>
          <div>
            {upload && (
              <div>
                <p className="mb-2 text-sm font-medium text-gray-900 dark:text-white">Uploaded Media:</p>
                <ul>
                  <li className="flex items-center mb-2">
                    <p className="text-sm">{upload.name}</p>
                    <button
                      type="button"
                      className="text-red-600 ml-2"
                      onClick={handleRemoveUpload}
                    >
                      Remove
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-between">
          <button
            className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={onPrevious}
          >
            Back
          </button>
          <button
            className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            disabled={!file}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}