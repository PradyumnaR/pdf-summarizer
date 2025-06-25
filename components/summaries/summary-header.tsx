import { Button } from '@/components/ui/button';
import { Calendar, ChevronLeft, Clock, Sparkles } from 'lucide-react';
import Link from 'next/link';

function SummaryHeader({
  title,
  createdAt,
  readingTime,
}: {
  title: string;
  createdAt: string;
  readingTime: number;
}) {
  return (
    <div className="flex gap-4 mb-4 justify-between">
      <div className="space-y-6 flex flex-col">
        <div className="flex flex-row gap-2">
          <div className="flex flex-row items-center justify-center rounded-2xl bg-gray-400 px-4 py-2">
            <Sparkles className="h-4 w-4 mr-1.5" />
            AI Summary
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 text-gray-400" />
            {new Date(createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4 text-gray-400" />
            {readingTime} min read
          </div>
        </div>
        <div className="text-xl flex items-center justify-center">{title}</div>
      </div>
      <div>
        <Link
          href={`/dashboard`}
          className=" bg-primary no-underline self-start"
        >
          <Button
            variant={'link'}
            size="sm"
            className="group flex items-center gap-1"
          >
            <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4" />
            Back to dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default SummaryHeader;
