import Link from 'next/link';
import { FileText } from 'lucide-react';
import { UserButton, SignedIn, SignedOut } from '@clerk/nextjs';
import { bgGradiat } from '@/app/page.const';

function Header() {
  return (
    <nav
      className={`relative flex flex-row flex-nowrap items-center gap-5 justify-center p-2 ${bgGradiat}`}
    >
      <div className="flex-1">
        <Link href="/" className="flex items-center gap-1 lg:gap-2 shrink-0">
          <FileText className="w-5 h-5 text-gray-900 hover:rotate-12 transform transition duration-200 ease-in-out" />
          <span className="font-extrabold text-gray-900">PDF Reader</span>
        </Link>
      </div>
      <div className="flex flex-1 items-center justify-center gap-5">
        <Link href="/#pricing">Pricing</Link>
        <SignedIn>
          <Link href="/dashboard">Your Summaries</Link>
        </SignedIn>
      </div>
      <div className="flex flex-1 items-center justify-end">
        <SignedIn>
          <div className="flex gap-2 items-center">
            <Link href="/upload">Upload a PDF</Link>
            <div>Pro</div>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </SignedIn>
        <SignedOut>
          <Link href="/sign-in">Sign In</Link>
        </SignedOut>
      </div>
    </nav>
  );
}

export default Header;
