'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface UploadFromInputProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
}

const UploadFormInput = forwardRef<HTMLFormElement, UploadFromInputProps>(
  ({ onSubmit, isLoading }, ref) => {
    return (
      <form ref={ref} className="flex flex-col gap-6" onSubmit={onSubmit}>
        <div className="flex items-center gap-1">
          <Input
            id="file"
            type="file"
            name="file"
            accept="application/pdf"
            required
            className={cn(isLoading && 'opacity-50 cursor-not-allowed')}
            disabled={isLoading}
          />
          <Button disabled={isLoading} className="bg-primary">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...
              </>
            ) : (
              'upload your PDF'
            )}
          </Button>
        </div>
      </form>
    );
  },
);

UploadFormInput.displayName = 'UploadFormInput';

export default UploadFormInput;
