import { Sparkles } from 'lucide-react';

function UploadHeader() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-row justify-center items-center bg-white rounded-full w-[300px] border-2 border-black text-black p-2">
        <Sparkles />
        <span className="pl-2">AI-Powered Content Creation</span>
      </div>
      <h1 className="py-5 text-4xl">Start uploading your PDF's</h1>
      <p className="text-gray-500">
        Upload your PDF and let our AI do the magic!{' '}
        <span className="text-blue-400">✧</span>
      </p>
    </div>
  );
}

export default UploadHeader;
