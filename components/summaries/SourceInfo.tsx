import { FileText } from 'lucide-react';

function SourceInfo({ fileName }: { fileName: string }) {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-center">
      <div className="flex items-center justify-center gap-2">
        <FileText className="h-4 w-4" />
        <span>Source: {fileName}</span>
      </div>
    </div>
  );
}

export default SourceInfo;
