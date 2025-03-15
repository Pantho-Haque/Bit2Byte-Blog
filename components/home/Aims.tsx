import Image from 'next/image';
import {
  blogsGraphics,
  buildCareerGraphics,
  communityGraphics,
  SyllabusGraphics,
} from '@/assets';

const aims = [
  {
    text: 'Find Blogs on any topic',
    img: blogsGraphics,
  },
  {
    text: 'Syllabus based Learning',
    img: SyllabusGraphics,
  },
  {
    text: 'Build your Career',
    img: buildCareerGraphics,
  },
  {
    text: 'Find a Community',
    img: communityGraphics,
  },
];

const Aims = () => {
  return (
    <div className='mx-auto w-full px-4 md:px-20 py-24'>
      <div className='max-w-7xl mx-auto w-full'>
        <div className='flex flex-row flex-wrap items-center justify-center gap-6'>
          {aims.map((item, key) => (
            <div
              key={key}
              className='bg-background border border-gray-300 rounded-xl p-2 sm:p-4 md:p-6 w-full max-w-[250px] h-[220px] flex flex-col items-center justify-center text-center transition duration-300 ease-in-out hover:bg-card-foreground hover:text-white shadow-lg'
            >
              <Image
                src={item.img}
                alt={item.text}
                width={80}
                height={80}
                className='mb-4'
              />
              <p className='text-lg font-semibold bg-gradient-to-r from-blue-500 via-cyan-500 to-green-400 text-transparent bg-clip-text'>
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Aims;
