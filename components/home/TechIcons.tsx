import {
  androidIcon,
  bugIcon,
  cIcon,
  cppIcon,
  flutterIcon,
  githubIcon,
  gitIcon,
  javaIcon,
  jsIcon,
  lavarelIcon,
  nextIcon,
  reactIcon,
  springbootIcon,
} from '@/assets';
import Image from 'next/image';
import React from 'react';

const icons = [
  cIcon,
  cppIcon,
  javaIcon,
  jsIcon,
  reactIcon,
  nextIcon,
  androidIcon,
  bugIcon,
  flutterIcon,
  lavarelIcon,
  springbootIcon,
  gitIcon,
  githubIcon,
];

const TechIcons = () => {
  return (
    <div className='mx-auto w-full px-4 md:px-20 pb-16 pt-10'>
      <div className='max-w-7xl mx-auto w-full'>
        <div className='w-full lg:w-[80%] mx-auto flex gap-8 flex-row flex-wrap justify-center items-center'>
          {icons.map((icon: any, key: number) => (
            <div key={key} className='relative'>
              <Image
                className='max-w-[40px] md:max-w-[60px] '
                alt='icon img'
                src={icon}
                width={60}
                height={60}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TechIcons;
