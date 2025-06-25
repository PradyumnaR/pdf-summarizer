import UploadForm from '@/components/upload/upload-form';
import UploadHeader from '@/components/upload/upload-header';

function UploadPage() {
  return (
    <section className="min-h-screen">
      <div className="mx-auto px-6 py-24 flex flex-col items-center justify-center gap-6">
        <UploadHeader />
        <UploadForm />
      </div>
    </section>
  );
}

export default UploadPage;
