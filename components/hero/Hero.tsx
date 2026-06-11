"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

import { useCanvasAnimation } from "./background/useCanvasAnimation";
import SocialLinks from "@/components/SocialLinks";
import { Button } from "@/components/ui/button";
import { EASE } from "@/lib/motion";

interface HeroTranslation {
	title: string;
	subtitle: string;
	birth: string;
	country: string;
	cta: string;
	yo: string;
}

const calculateAge = (birthDate: string) => {
	const [day, month, year] = birthDate.split("/").map(Number);
	const birth = new Date(year, month - 1, day);
	const today = new Date();
	let age = today.getFullYear() - birth.getFullYear();
	const monthDiff = today.getMonth() - birth.getMonth();
	if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
		age--;
	}
	return age;
};

const Hero = ({ t }: { t: HeroTranslation }) => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [mounted, setMounted] = useState(false);
	const { resolvedTheme } = useTheme();
	const effectiveTheme = resolvedTheme === "dark" ? "dark" : "light";

	useEffect(() => {
		setMounted(true);
	}, []);

	useCanvasAnimation(canvasRef, mounted ? effectiveTheme : "light");

	return (
		<section className="relative overflow-hidden bg-background py-10 md:py-14">
			{/* Custom animated points layer (drift + twinkle) */}
			<div
				aria-hidden
				className="floating-points [mask-image:radial-gradient(70%_65%_at_50%_50%,black,transparent_85%)]"
			/>

			{/* Canvas points animation (WebGPU / Canvas 2D fallback) */}
			<canvas
				ref={canvasRef}
				aria-hidden
				className="pointer-events-none absolute inset-0 h-full w-full opacity-60"
			/>

			<div className="relative z-10 mx-auto max-w-7xl px-6">
				<div className="flex flex-col items-center text-center md:flex-row md:justify-center md:items-center md:gap-10 md:text-left">
					{/* Profile picture — appears first */}
					<motion.div
						initial={{ opacity: 0, scale: 0.85 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.55, delay: 0, ease: EASE.outExpo }}
						className="relative mb-6 md:mb-0 shrink-0"
					>
						<Image
							src="/profile.jpeg"
							alt="Keiner José Alvarado"
							width={100}
							height={100}
							priority
							className="size-[100px] rounded-full border-4 border-primary/20 object-cover shadow-lg"
						/>
					</motion.div>

					{/* Text block */}
					<div className="flex flex-col items-center md:items-start max-w-2xl">
						{/* Name — slightly after pic */}
						<motion.h1
							initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
							animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
							transition={{ duration: 0.6, delay: 0.18, ease: EASE.outExpo }}
							className="font-heading font-bold text-balance text-4xl sm:text-5xl md:text-6xl tracking-tight"
						>
							{t.title}
						</motion.h1>

						{/* Subtitle row — noticeably after name */}
						<motion.div
							initial={{ opacity: 0, y: 16 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.55, delay: 0.35, ease: EASE.outExpo }}
							className="mt-4 flex flex-wrap items-center justify-center md:justify-start gap-3 text-base md:text-xl text-muted-foreground"
						>
							<span className="transition-all duration-300 hover:text-foreground">
								{t.subtitle}
							</span>
							<span className="text-muted-foreground/50">•</span>
							<span className="transition-all duration-300 hover:text-foreground">
								{t.country}
							</span>
							<span className="text-muted-foreground/50">•</span>
							<span className="transition-all duration-300 hover:text-foreground">
								{calculateAge(t.birth)} {t.yo}
							</span>
						</motion.div>

						{/* CTA + socials — last to arrive */}
						<motion.div
							initial={{ opacity: 0, y: 16 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.55, delay: 0.5, ease: EASE.outExpo }}
							className="mt-8 flex flex-row flex-wrap items-center justify-center md:justify-start gap-3 sm:gap-5"
						>
							<Button
								asChild
								size="default"
								className="group h-11 rounded-lg bg-primary px-5 text-sm font-medium text-primary-foreground shadow-glow-primary transition-all duration-300 hover:translate-x-1 active:scale-[0.98]"
							>
								<a href="#contact" className="inline-flex items-center gap-2">
									{t.cta}
									<ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
								</a>
							</Button>
							<SocialLinks />
						</motion.div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Hero;
