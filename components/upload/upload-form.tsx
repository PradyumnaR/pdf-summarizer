'use client';

import { useCallback, useRef, useState } from 'react';
import { z } from 'zod';
import { toast } from 'sonner';

import { useUploadThing } from '@/utils/uploadthing';
import UploadFormInput from './upload-form-input';
import {
  generatePdfSummary,
  storePdfSummaryAction,
} from '@/actions/upload-actions';
import { useRouter } from 'next/navigation';

const schema = z.object({
  file: z
    .instanceof(File, { message: 'Invalid file' })
    .refine((file) => file.size <= 20 * 1024 * 1024, {
      message: 'File size must be less than 20MB',
    })
    .refine(
      (file) => file.type.startsWith('application/pdf'),
      'File size must be a PDF',
    ),
});

function UploadForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const { startUpload } = useUploadThing('pdfUploader', {
    onClientUploadComplete: () => {
      toast.success('Successfully uploaded PDF file!!');
    },
    onUploadError: (err) => {
      toast.error('Error occured while uploading', {
        description: err.message,
      });
    },
    onUploadBegin: (data) => {
      console.log('Upload has begun for', data);
      toast.info('Upload has begun...');
    },
  });

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        setIsLoading(true);
        const formData = new FormData(e.currentTarget);
        const file = formData.get('file') as File;

        //validating the fields
        const validatedFields = schema.safeParse({ file });

        if (!validatedFields.success) {
          toast('Something went wrong', {
            description:
              validatedFields.error.flatten().fieldErrors.file?.[0] ??
              'Invalid file',
          });

          return;
        }

        toast.info('Hang tight! Our AI is reading through your document!!');

        //upload the file to uploadthing
        const uploadResponse = await startUpload([file]);

        if (!uploadResponse) {
          toast('Something went wrong', {
            description: 'Please use different file',
          });
          return;
        }

        //parse the pdf using lang chain
        const result = await generatePdfSummary({
          fileUrl: uploadResponse[0].serverData.fileUrl,
          fileName: file.name,
        });
        console.log('summary =>>>', result);
        const { data = null } = result || {};

        if (data) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          let storeResult: any;
          toast.info('Saving PDF...', {
            description: 'Hang tight! We are saving your summary!',
          });

          if (data.summary) {
            storeResult = await storePdfSummaryAction({
              summary: data.summary,
              fileUrl: uploadResponse[0].serverData.fileUrl,
              title: data.title,
              fileName: file.name,
            });

            toast.info('Summary generated!', {
              description: 'Your PDF has been successfully summarized & saved!',
            });
            formRef.current?.reset();
            console.log('storeResult =>>', storeResult.data.id);
            router.push(`/summaries/${storeResult.data?.id}`);
          }
        }

        //summarize the pdf using AI
        //save the summary to the database
        //redirect to the [id] summary page
        setIsLoading(false);
      } catch (err) {
        formRef.current?.reset();
        console.error('Error occured:', err);
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    },
    [startUpload, router],
  );

  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
      <UploadFormInput
        ref={formRef}
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </div>
  );
}

export default UploadForm;
