'use client';
import Image from 'next/image';
import React from 'react';
import { WobbleCard } from '@/components/ui/wobble-card';

export default function Mission() {
  return (
    <div className='mx-auto w-full px-20 min-h-[90vh] py-16'>
      <h1 className='text-4xl md:text-6xl font-bold text-center bg-gradient-to-r from-blue-500 via-cyan-500 to-green-400 text-transparent bg-clip-text mb-6'>
        Our Mission and Vision
      </h1>
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl mx-auto w-full'>
        <WobbleCard
          containerClassName='col-span-1 lg:col-span-2 h-full bg-pink-800 min-h-[300px] lg:min-h-[300px]'
          className=''
        >
          <div className='max-w-xs z-10 absolute'>
            <h2 className='text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white'>
              Cultivating a Collaborative Community
            </h2>
            <p className='mt-4 text-left  text-base/6 text-neutral-200'>
              To create a supportive community where members collaborate, share
              knowledge, and grow together towards technical excellence.
            </p>
          </div>
          <Image
            src='/node.png'
            width={250}
            height={250}
            alt='mew'
            className='absolute -right-[10%] -bottom-8 md:-right-2 md:-bottom-10 grayscale filter object-contain rounded-2xl z-0'
          />
        </WobbleCard>
        <WobbleCard containerClassName='col-span-1 min-h-[200px]'>
          <h2 className='max-w-80  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white'>
            Driving Future-Ready Innovation
          </h2>
          <p className='mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200'>
            To be a hub for groundbreaking projects that address real-world
            challenges, advancing both the university&apos;s and the
            region&apos;s tech landscape.
          </p>
        </WobbleCard>
        <WobbleCard containerClassName='col-span-1 lg:col-span-3 bg-blue-900 min-h-[300px] lg:min-h-[400px] xl:min-h-[350px]'>
          <div className='max-w-sm z-10 absolute'>
            <h2 className='max-w-sm md:max-w-lg  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white'>
              Connecting Academia and Industry
            </h2>
            <p className='mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200'>
              To bridge the gap between academic knowledge and industry
              practices, preparing members for impactful careers in software
              development and research.
            </p>
          </div>
          <Image
            src='/android.png'
            width={400}
            height={400}
            alt='mew'
            className='absolute -right-[40%] -bottom-32 md:-right-[3%] md:-bottom-10 object-contain rounded-2xl'
          />
        </WobbleCard>
      </div>
    </div>
  );
}
