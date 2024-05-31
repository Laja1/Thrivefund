import React, { useState } from 'react';

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
console.log(file)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleRemoveUpload = () => {
    setUpload(undefined);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (file) {
      onSubmit({ file });
      setUpload({ name: file.name });
      setFile(null);
    }
  };

  return (
    <div className="pt-5">
      <p className="text-3xl font-bold pb-3">Fundraiser Media</p>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 mb-6 md:grid-cols-1">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Upload Media
            </label>
            <input
              type="file"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={handleFileChange}
            />
          </div>
          <div>
            {upload && (
              <div>
                <p className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Uploaded Media:
                </p>
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
