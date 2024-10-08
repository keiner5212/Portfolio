import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const Hero = ({ t }: { t: any }) => {
  return (
    <section className="bg-background py-20 text-center">
      <div className="container mx-auto px-4">
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
    </section>
  );
};

export default Hero;