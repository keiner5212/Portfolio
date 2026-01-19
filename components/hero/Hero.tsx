"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { useCanvasAnimation } from "./background/useCanvasAnimation";
import { useTheme } from "next-themes";
import { motion, useInView } from "framer-motion";
import SocialLinks from "../SocialLinks";
import { DEFAULT_THEME } from "@/lib/constants";

const githubProfilePic =
  "/profile.jpeg";

const Hero = ({ t }: { t: any }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [mounted, setMounted] = useState(false);
  const { theme = DEFAULT_THEME } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const calculateAge = (birthDate: string) => {
    const [day, month, year] = birthDate.split('/').map(Number);
    const birth = new Date(year, month - 1, day);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  useCanvasAnimation(canvasRef, mounted ? theme || "light" : "light");

  return (
    <section
      ref={sectionRef}
      className="bg-background py-20 relative h-[400px] md:h-[300px] overflow-hidden"
    >
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-[400px] md:h-[300px] z-0"
      />

      <motion.div
        className="container px-4 absolute z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col items-center text-center md:flex-row md:justify-center md:items-center md:text-left">
          <motion.div
            className="mb-8 md:mb-0 md:mr-8"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 10,
              delay: 0.2,
            }}
          >
            <Image
              src={githubProfilePic}
              alt="GitHub Profile"
              width={100}
              height={100}
              className="rounded-full border-4 border-primary/20 shadow-lg"
              priority
            />
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{
              duration: 0.6,
              delay: 0.4,
            }}
          >
            <motion.h1
              className="mb-4 text-4xl font-bold sm:text-5xl md:text-6xl"
              initial={{ y: 10 }}
              animate={isInView ? { y: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: 0.5,
              }}
            >
              {t.title}
            </motion.h1>

            <motion.div
              className="mb-8 flex flex-wrap items-center justify-center md:justify-start gap-3 text-xl text-muted-foreground"
              initial={{ y: 10 }}
              animate={isInView ? { y: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: 0.6,
              }}
            >
              <span className="transition-all duration-300 hover:text-foreground hover:scale-105 cursor-default">
                {t.subtitle}
              </span>
              <span className="text-muted-foreground/50">•</span>
              <span className="transition-all duration-300 hover:text-foreground hover:scale-105 cursor-default">
                {t.country}
              </span>
              <span className="text-muted-foreground/50">•</span>
              <span className="transition-all duration-300 hover:text-foreground hover:scale-105 cursor-default">
                {calculateAge(t.birth)} {t.yo}
              </span>
            </motion.div>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : {}}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 10,
                delay: 0.7,
              }}
              className="flex flex-row justify-between"
            >
              <Button asChild className="hover:translate-x-2 transition-transform duration-300">
                <a href="#contact" className="inline-flex items-center">
                  {t.cta} <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <SocialLinks />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
