import Link from 'next/link';
import { Separator } from '@/components/ui/separator';

export default function Footer() {
  return (
    <footer className='w-full py-3 bg-background md:px-20 z-40 mt-20'>
      <div className='container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row max-h-[7vh]'>
        <p className='text-md text-muted-foreground'>Bit2Byte @ 2024</p>
        <Separator className='md:hidden' />
        <nav className='flex gap-4 sm:gap-6'>
          <Link
            href='#'
            className='text-sm font-medium hover:underline underline-offset-4'
          >
            Terms
          </Link>
          <Link
            href='#'
            className='text-sm font-medium hover:underline underline-offset-4'
          >
            Privacy
          </Link>
          <Link
            href='/contact'
            className='text-sm font-medium hover:underline underline-offset-4'
          >
            Contact
          </Link>
        </nav>
      </div>
    </footer>
  );
}
