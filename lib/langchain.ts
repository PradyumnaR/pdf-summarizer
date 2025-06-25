import { WebPDFLoader } from '@langchain/community/document_loaders/web/pdf';

export async function fetchAndExtractPdfText(fileUrl: string) {
  try {
    const response = await fetch(fileUrl);

    console.log(response);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const blob = await response.blob();
    const loader = new WebPDFLoader(blob);
    const docs = await loader.load();

    return docs.map((doc) => doc.pageContent).join('\n');
  } catch (err) {
    console.error('Failed to load PDF:', err);
    return null;
  }
}
