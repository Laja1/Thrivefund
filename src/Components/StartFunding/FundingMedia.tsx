import { useState } from 'react';

interface Upload {
  name: string;
  data: string;
  contentType: string;
}

interface FundingMediaProps {
  defaultValues?: { uploads: Upload[] };
  onSubmit: (data: { uploads: Upload[] }) => void;
  onPrevious: () => void;
}

export default function FundingMedia({ defaultValues, onSubmit, onPrevious }: FundingMediaProps) {
  const [uploads, setUploads] = useState<Upload[]>(defaultValues?.uploads || []);


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
  
    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        setUploads(prevUploads => [
          ...prevUploads,
          {
            name: file.name,
            data: base64String,
            contentType: file.type
          }
        ]);
      };
      reader.readAsDataURL(file);
    });
  };
  
  const handleRemoveUpload = (index: number) => {
    setUploads(prev => prev.filter((_, i) => i !== index));
  };

  const handleFormSubmit = () => {
  const formattedUploads = uploads.map(upload => ({
    name: upload.name,
    data: upload.data,
    contentType: upload.contentType
  }));
  onSubmit({ uploads: formattedUploads });
};

  return (
    <div className="pt-5">
      <p className='text-3xl font-bold pb-3'>Fundraiser Media</p>
      <form onSubmit={e => { e.preventDefault(); handleFormSubmit(); }}>
        <div className="grid gap-6 mb-6 md:grid-cols-1">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Upload Media</label>
            <input type="file" multiple className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handleFileChange} />
          </div>
          <div>
            {uploads.length > 0 && (
              <div>
                <p className="mb-2 text-sm font-medium text-gray-900 dark:text-white">Uploaded Media:</p>
                <ul>
                  {uploads.map((upload, index) => (
                    <li key={index} className="flex items-center mb-2">
                      <img src={upload.data} alt={`Upload ${index}`} className="w-16 h-16 object-cover mr-2" />
                      <div>
                        <p className="text-sm">{upload.name}</p>
                      </div>
                      <button type="button" className="text-red-600 ml-2" onClick={() => handleRemoveUpload(index)}>Remove</button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        <div className='flex justify-between'>
          <button className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={onPrevious}>Back</button>
          <button className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type='submit'>Submit</button>
        </div>
      </form>
    </div>
  );
}