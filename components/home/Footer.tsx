import Link from 'next/link';
import Image from 'next/image';
import { SquareArrowUp } from 'lucide-react';
import { mainLogo } from '@/assets'; // Ensure correct path

export default function Footer() {
  return (
    <footer className='w-full bg-background text-foreground py-12 mt-16'>
      <div className='max-w-7xl mx-auto px-6 md:px-10'>
        {/* Top Section */}
        <div className='flex flex-col md:flex-row justify-between items-start gap-10 pb-12'>
          {/* Logo */}
          <div className='md:w-1/4 flex md:items-start md:justify-start h-full'>
            <Image
              src={mainLogo}
              alt='Logo'
              width={120}
              height={120}
              className='object-contain md:-translate-y-6'
            />
          </div>

          {/* Links Section */}
          <div className='grid md:grid-cols-3 gap-10 flex-1 md:place-items-end'>
            {/* About Us */}
            <div>
              <h3 className='text-lg font-semibold tracking-wide'>About Us</h3>
              <ul className='mt-4 space-y-2'>
                <li>
                  <Link
                    href='/pub/about'
                    className='hover:text-gray-400 hover:underline transition'
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href='/pub/syllabus'
                    className='hover:text-gray-400 hover:underline transition'
                  >
                    Syllabus
                  </Link>
                </li>
                <li>
                  <Link
                    href='/pub/blog'
                    className='hover:text-gray-400 hover:underline transition'
                  >
                    Blogs
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className='text-lg font-semibold tracking-wide'>Support</h3>
              <ul className='mt-4 space-y-2'>
                <li>
                  <Link
                    href='/pub/contact'
                    className='hover:text-gray-400 hover:underline transition'
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    href='#'
                    className='hover:text-gray-400 hover:underline transition'
                  >
                    FAQs
                  </Link>
                </li>
                <li>
                  <Link
                    href='#'
                    className='hover:text-gray-400 hover:underline transition'
                  >
                    Terms
                  </Link>
                </li>
              </ul>
            </div>

            {/* Social */}
            <div>
              <h3 className='text-lg font-semibold tracking-wide'>Social</h3>
              <ul className='mt-4 space-y-2'>
                <li>
                  <Link
                    href='mailto:bit2bytekuet@gmail.com'
                    className='hover:text-gray-400 hover:underline transition'
                  >
                    Email
                  </Link>
                </li>
                <li>
                  <Link
                    href='https://www.facebook.com/bittwobyte'
                    target='_blank'
                    className='hover:text-gray-400 hover:underline transition'
                  >
                    Facebook
                  </Link>
                </li>
                <li>
                  <Link
                    href='https://www.linkedin.com/company/bit2byte-kuet'
                    className='hover:text-gray-400 hover:underline transition'
                  >
                    LinkedIn
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Separator */}
        <hr className='border-t border-foreground/50 opacity-50' />

        {/* Bottom Section */}
        <div className='flex flex-col md:flex-row justify-between items-center pt-6 gap-2 text-sm'>
          {/* Copyright & Terms */}
          <div className='flex flex-col md:flex-row md:items-center gap-12'>
            <p>&copy; {new Date().getFullYear()} Bit2Byte</p>
            <Link href='#' className='hover:text-gray-400 transition'>
              Terms of Service
            </Link>
          </div>

          {/* Back to Top */}
          <Link
            href='#'
            className='flex items-center gap-2 hover:text-gray-400 transition'
          >
            <span>Back to top</span>
            <SquareArrowUp
              size={16}
              className='transition-transform transform hover:-translate-y-1'
            />
          </Link>
        </div>
      </div>
    </footer>
  );
}
