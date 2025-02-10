"use client"

import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { useRef } from 'react';
import { useCanvasAnimation } from './background/useCanvasAnimation';
import { useTheme } from 'next-themes';

const githubProfilePic = 'https://avatars.githubusercontent.com/u/122523028?v=4';

const Hero = ({ t }: { t: any }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const {theme} = useTheme();
  useCanvasAnimation(canvasRef, theme || 'light');
  return (
    <section className="bg-background py-20 relative h-[400px] md:h-[300px]">
      <canvas ref={canvasRef} className='absolute top-0 left-0 w-full h-[400px] md:h-[300px] z-0'> </canvas>
      <div className="container px-4 absolute z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col items-center text-center md:flex-row md:justify-center md:items-center md:text-left">
          <div className="mb-8 md:mb-0 md:mr-8">
            <Image
              src={githubProfilePic}
              alt="GitHub Profile"
              width={100}
              height={100}
              className="rounded-full"
            />
          </div>

          <div>
            <h1 className="mb-4 text-4xl font-bold sm:text-5xl md:text-6xl">
              {t.title}
            </h1>
            <p className="mb-8 text-xl text-muted-foreground">
              {t.subtitle}
            </p>
            <Button asChild>
              <a href="#contact" className="inline-flex items-center">
                {t.cta} <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;