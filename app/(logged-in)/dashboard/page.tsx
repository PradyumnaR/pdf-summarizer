import Link from 'next/link';
import { ArrowRight, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SummaryCard from '@/components/summaries/summary-card';
import { getSummaries } from '@/lib/summaries';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

async function DashboardPage() {
  const user = await currentUser();
  const userId = user?.id;
  if (!userId) {
    return redirect('/sign-in');
  }
  const uploadLimit = 5;
  const summaries = await getSummaries(userId);
  return (
    <main className="min-h-screen">
      <div className="container mx-auto flex flex-col gap-4">
        <div className="px-2 py-12 sm:py-24">
          <div className="flex gap-4 mb-8 justify-between">
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl font-bold">Your Summaries</h1>
              <p className="text-gray-600">
                Transform your PDFs into concise, actionable insights
              </p>
            </div>
            <Button
              variant={'link'}
              className="bg-primary hover:no-underline hover:bg-primary/80"
            >
              <Link href="/upload" className="flex items-center text-white">
                <Plus className="w-5 h-5 mr-2" />
                New summary
              </Link>
            </Button>
          </div>
          <div className="mb-6">
            <div className="bg-gray-400 p-4 rounded-lg">
              <p className="text-sm">
                Youve reached the limit of {uploadLimit} uploads on the Basic
                plan{' '}
                <Link
                  href="/#pricing"
                  className="underline font-medium underline-offset-4 inline-flex items-center"
                >
                  Click here to upgrade to Pro
                  <ArrowRight className="w-4 h-4 inline-block" />
                </Link>
                for unlimited uploads
              </p>
            </div>
          </div>
          {summaries.length === 0 ? (
            <div className="flex flex-col items-center gap-2 justify-center">
              <h3 className="text-2xl font-bold pt-10">No summaries yet</h3>
              <p className="text-gray-500">
                Upload your first PDF to get started with AI powered summaries
              </p>
              <Button
                variant={'link'}
                className="bg-primary hover:no-underline hover:bg-primary/80"
              >
                <Link href="/upload" className="flex items-center text-white">
                  Create your first summary
                </Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 sm:px-0">
              {summaries.map((summary, index) => (
                <SummaryCard key={index} summary={summary} />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default DashboardPage;
