import { Pizza } from 'lucide-react';

function DemoSection() {
  return (
    <section className="relative px-5 py-5">
      <div>
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="inline-flex items-center justify-center bg-gray-300 rounded-2xl w-10 h-10">
            <Pizza className="w-6 h-6 text-red-500" />
          </div>
          <h3 className="font-bold">
            Watch how PDF Transformer transforms{' '}
            <span className="text-amber-500">this Next.js course PDF</span> into
            an easy-to-read summary!
          </h3>
        </div>
        <div>{/* summary section*/}</div>
      </div>
    </section>
  );
}

export default DemoSection;
