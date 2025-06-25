import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

function CtaSection() {
  return (
    <section className="bg-gray-200 px-5 py-5">
      <div className="mx-auto">
        <div className="flex flex-col items-center justify-center">
          <div className="text-center flex flex-col gap-2 p-2">
            <h2 className="font-bold">Ready to save hours of reading time?</h2>
            <p>
              Transform lengthy documents into clear, actionable insights with
              our AI power PDF Reader
            </p>
          </div>
          <div>
            <Button
              variant="outline"
              className="bg-white border-2 border-gray-500 rounded-2xl"
            >
              <Link href="/#pricing" className="flex flex-row items-center">
                <span className="text-black">Get Started </span>
                <ArrowRight className="w-4 h-4 animate-pulse ml-2 text-black" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CtaSection;
