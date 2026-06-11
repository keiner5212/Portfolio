"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Code, Database, Globe } from "lucide-react";
import { technologies } from "@/lib/technologies";
import { TechBadge } from "@/components/TechBadge";
import { SectionHeading } from "@/components/ui/section-heading";
import { Orb } from "@/components/ui/orb";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DUR, EASE, fadeUp, hoverLift, inViewTrigger, sectionReveal, staggerContainer } from "@/lib/motion";

interface AboutTranslation {
	title: string;
	content: string;
}

const CATEGORIES = [
	{ key: "frontend" as const, label: "Frontend", icon: Code },
	{ key: "backend" as const, label: "Backend", icon: Database },
	{ key: "others" as const, label: "Cloud, DevOps & Others", icon: Globe },
];

const About = ({ t }: { t: AboutTranslation }) => {
	const reduced = useReducedMotion();

	return (
		<section
			id="about"
			className="relative bg-surface-1 py-10 md:py-14 lg:py-16 overflow-hidden"
		>
			<Orb
				tone="primary"
				className="w-[400px] h-[400px] -top-32 -left-32 animate-float-slow"
			/>
			<Orb
				tone="cyan"
				className="w-[350px] h-[350px] -bottom-32 -right-20 animate-float-slower"
			/>

			<div
				aria-hidden
				className="pointer-events-none absolute inset-0 opacity-30 bg-dot-grid [mask-image:radial-gradient(50%_50%_at_50%_50%,black_30%,transparent_80%)]"
			/>

			<motion.div
				initial="hidden"
				whileInView="visible"
				viewport={inViewTrigger}
				variants={sectionReveal}
				className="relative z-10 mx-auto max-w-7xl px-6"
			>
				<SectionHeading title={t.title} />

				<motion.p
					initial="hidden"
					whileInView="visible"
					viewport={inViewTrigger}
					variants={fadeUp}
					transition={{ duration: reduced ? 0 : DUR.slow, ease: EASE.outExpo, delay: reduced ? 0 : 0.1 }}
					className="mx-auto mb-10 text-center text-base md:text-lg text-muted-foreground text-pretty whitespace-pre-line leading-relaxed"
				>
					{t.content}
				</motion.p>

				<TooltipProvider delayDuration={200}>
					<motion.div
						initial="hidden"
						whileInView="visible"
						viewport={inViewTrigger}
						variants={staggerContainer(0.12)}
						className="grid gap-6 md:grid-cols-3"
					>
						{CATEGORIES.map(({ key, label, icon: Icon }) => (
							<motion.div
								key={key}
								variants={fadeUp}
								{...hoverLift}
								className="group"
							>
								<Card className="relative h-full rounded-2xl border border-border/60 bg-card/60 backdrop-blur-xl p-6 transition-all duration-300 hover:border-primary/40 hover:shadow-glow-primary">
									<span
										aria-hidden
										className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent"
									/>
									<CardHeader className="p-0 pb-4">
										<CardTitle className="flex items-center gap-3 text-lg md:text-xl">
											<span className="inline-flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary/15">
												<Icon className="size-5" />
											</span>
											{label}
										</CardTitle>
									</CardHeader>
									<CardContent className="p-0">
										<div className="flex flex-wrap gap-2">
											{technologies[key].map((tech) => (
												<TechBadge key={tech.name} tech={tech} />
											))}
										</div>
									</CardContent>
								</Card>
							</motion.div>
						))}
					</motion.div>
				</TooltipProvider>
			</motion.div>
		</section>
	);
};

export default About;
