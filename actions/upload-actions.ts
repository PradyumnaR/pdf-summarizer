'use server';

import { fetchAndExtractPdfText } from '@/lib/langchain';
import { generateSummaryFromOpenAI } from '@/lib/openai';
import { generateSummaryFromGemini } from '@/lib/geminiai';
import { auth } from '@clerk/nextjs/server';
import { getDBConnection } from '@/lib/db';
import { formatFileNameAsTitle } from '@/utils/format-utils';
import { revalidatePath } from 'next/cache';

interface PdfSummaryType {
  userId?: string;
  fileUrl: string;
  summary: string;
  title: string;
  fileName: string;
}

export async function generatePdfSummary(
  uploadResponse: [
    {
      serverData: {
        userId: string;
        file: {
          url: string;
          name: string;
        };
      };
    },
  ],
) {
  if (!uploadResponse) {
    return {
      success: false,
      message: 'File upload failed',
      data: null,
    };
  }

  const {
    serverData: {
      userId,
      file: { url: pdfUrl, name: fileName },
    },
  } = uploadResponse[0];

  if (!pdfUrl) {
    return {
      success: false,
      message: 'File upload failed',
      data: null,
    };
  }

  try {
    console.log('pdfUrl =>>>>>', pdfUrl);
    const pdfText = await fetchAndExtractPdfText(pdfUrl);
    console.log('pdfText =>>>>>', pdfText);

    let summary;
    try {
      summary = await generateSummaryFromOpenAI(pdfText);
    } catch (err) {
      console.log(err);
      //call gemini code
      if (err instanceof Error && err.message == 'RATE_LIMIT_EXCEEDED') {
        try {
          summary = await generateSummaryFromGemini(pdfText);
        } catch (geminiError) {
          console.log(
            'Gemini API failed after OpenAI  quote exceeded',
            geminiError,
          );
          throw new Error(
            'Failed to generate summary with available AI providers',
          );
        }
      }
    }

    if (!summary) {
      return {
        success: false,
        message: 'Failed to generate summary',
        data: null,
      };
    }

    const formatedFileName = formatFileNameAsTitle(fileName);

    return {
      success: true,
      message: 'Summary generated successfully',
      data: {
        title: formatedFileName,
        summary,
      },
    };
  } catch {
    return {
      success: false,
      message: 'File upload failed',
      data: null,
    };
  }
}

async function saveSummary({
  userId,
  fileUrl,
  summary,
  title,
  fileName,
}: PdfSummaryType) {
  try {
    const sql = await getDBConnection();
    const [savedSummary] = await sql`INSERT INTO pdf_summaries (
      user_id,
      original_file_url,
      summary_text,
      title,
      file_name
    )
    VALUES (
      ${userId},
      ${fileUrl},
      ${summary},
      ${title},
      ${fileName}
    ) RETURNING id, summary_text;`;

    return savedSummary;
  } catch (e) {
    console.error('Error saving PDF summary', e);
    throw e;
  }
}

export async function storePdfSummaryAction({
  fileUrl,
  summary,
  title,
  fileName,
}: PdfSummaryType) {
  //user is logged in and has a userId
  //savepdfsummary
  //savedPdfSummary

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let savedSummary: any;
  try {
    const { userId } = await auth();
    if (!userId) {
      return {
        success: false,
        message: 'User not found',
      };
    }

    savedSummary = await saveSummary({
      userId,
      fileUrl,
      summary,
      title,
      fileName,
    });

    console.log('savedSummary =>>>>>>>', savedSummary.id);

    if (!savedSummary) {
      return {
        success: false,
        message: 'Failed to save PDF summary, please try again...',
      };
    }
  } catch (e) {
    return {
      success: false,
      message: e instanceof Error ? e.message : 'Error saving PDF summary',
    };
  }

  revalidatePath(`/summaries/${savedSummary.id}`);

  return {
    success: true,
    message: 'PDF Summary saved successfully',
    data: {
      id: savedSummary.id,
    },
  };
}
