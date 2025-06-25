import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

function HeroSection() {
  return (
    <section className="relative px-5 py-5">
      <div className="relative flex flex-col items-center justify-center">
        <div className="flex">
          <div className="flex items-center justify-center w-[200px] h-[40px] rounded-full bg-white border-2 border-black text-black">
            <Sparkles className="w-6 h-6" />
            <p className="text-base px-2">Powered by AI</p>
          </div>
        </div>
        <h1 className="font-bold py-4 text-center">
          Transfrom PDF into concise summaries
        </h1>
        <h2 className="text-center py-2 text-gray-500">
          Get a beautiful summary reel of the document in seconds.
        </h2>
        <Button
          variant="secondary"
          className="rounded-full border-2 hover:border-black"
        >
          <Link href="/#pricing" className="flex gap-2 items-center">
            <span>Try PDF Reader</span>
            <ArrowRight className="animate-pulse" />
          </Link>
        </Button>
      </div>
    </section>
  );
}

export default HeroSection;
