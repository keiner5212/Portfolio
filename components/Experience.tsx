"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Briefcase, Calendar, ExternalLink } from "lucide-react";
import Image from "next/image";
import { SectionHeading } from "@/components/ui/section-heading";
import { Orb } from "@/components/ui/orb";
import { DUR, EASE, fadeLeft, fadeRight, fadeUp, inViewTrigger } from "@/lib/motion";
import type { ExperienceEntry } from "@/lib/i18n";

interface ExperienceTranslation {
	title: string;
	present: string;
	OrgaAI: ExperienceEntry;
	TheorimAI: ExperienceEntry;
	helloApp: ExperienceEntry;
	notiexpress: ExperienceEntry;
}

const calculateMonths = (start: string, end: Date | string) => {
	const [sm, sy] = start.split("/").map(Number);
	const startDate = new Date(sy, sm - 1);
	const endDate =
		end instanceof Date
			? end
			: (() => {
					const [em, ey] = end.split("/").map(Number);
					return new Date(ey, em - 1);
				})();
	return (
		(endDate.getFullYear() - startDate.getFullYear()) * 12 +
		(endDate.getMonth() - startDate.getMonth())
	);
};

const monthLabel = (n: number, lang: string) =>
	lang === "es" ? (n === 1 ? "mes" : "meses") : n === 1 ? "month" : "months";

const yearLabel = (n: number, lang: string) =>
	lang === "es" ? (n === 1 ? "año" : "años") : n === 1 ? "year" : "years";

const formatDuration = (totalMonths: number, lang: string) => {
	const years = Math.floor(totalMonths / 12);
	const remMonths = totalMonths % 12;
	const parts: string[] = [];
	if (years > 0) parts.push(`${years} ${yearLabel(years, lang)}`);
	if (remMonths > 0) parts.push(`${remMonths} ${monthLabel(remMonths, lang)}`);
	return parts.length > 0 ? parts.join(" ") : `0 ${monthLabel(0, lang)}`;
};

const formatPeriod = (period: string, presentText: string, lang: string) => {
	if (period === "No period" || period === "Sin período definido") return period;
	if (period.includes("-xxxx")) {
		const start = period.replace("-xxxx", "");
		const months = calculateMonths(start, new Date());
		return `${start} - ${presentText} (${formatDuration(months, lang)})`;
	}
	if (period.includes("-")) {
		const [start, end] = period.split("-");
		const months = calculateMonths(start, end);
		return `${period} (${formatDuration(months, lang)})`;
	}
	return period;
};

const Experience = ({ t }: { t: ExperienceTranslation }) => {
	const reduced = useReducedMotion();
	const lang = t.present === "Present" ? "en" : "es";

	const experiences: ExperienceEntry[] = [
		t.OrgaAI,
		t.TheorimAI,
		t.helloApp,
		t.notiexpress,
	];

	return (
		<section
			id="experience"
			className="relative bg-background py-20 md:py-24 lg:py-32 overflow-hidden"
		>
			<Orb
				tone="cyan"
				className="w-[400px] h-[400px] -top-32 right-0 animate-float-slow"
			/>

			<div className="relative z-10 mx-auto max-w-7xl px-6">
				<SectionHeading title={t.title} />

				<div className="relative">
					{/* Timeline line */}
					<motion.div
						className="absolute left-4 lg:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/40 to-transparent"
						initial={{ scaleY: 0 }}
						whileInView={{ scaleY: 1 }}
						viewport={inViewTrigger}
						transition={{ duration: reduced ? 0 : 1, delay: reduced ? 0 : 0.3 }}
						style={{ transformOrigin: "top" }}
						aria-hidden
					/>

					<div className="space-y-12">
						{experiences.map((exp, index) => {
							const isEven = index % 2 === 0;
							const formattedPeriod = formatPeriod(exp.period, t.present, lang);
							const variants = isEven ? fadeLeft : fadeRight;

							return (
								<motion.div
									key={exp.company + index}
									initial="hidden"
									whileInView="visible"
									viewport={inViewTrigger}
									variants={variants}
									transition={{
										duration: reduced ? 0 : DUR.slow,
										ease: EASE.outExpo,
										delay: reduced ? 0 : index * 0.15,
									}}
									className={`relative flex items-center ${
										isEven ? "lg:flex-row" : "lg:flex-row-reverse"
									} flex-row`}
								>
									{/* Timeline dot */}
									<motion.div
										className={`absolute left-4 z-10 size-4 rounded-full bg-primary border-4 border-background ${
											isEven
												? "lg:left-[calc(50%-0.875rem)]"
												: "lg:left-[calc(50%-0.875rem)]"
										}`}
										initial={{ scale: 0 }}
										whileInView={{ scale: 1 }}
										viewport={inViewTrigger}
										transition={{
											duration: reduced ? 0 : 0.3,
											delay: reduced ? 0 : 0.5 + index * 0.15,
										}}
										whileHover={{ scale: 1.5 }}
										aria-hidden
									>
										<span className="absolute inset-0 rounded-full bg-primary animate-glow-pulse" />
									</motion.div>

									<div
										className={`w-full lg:w-[calc(50%-2.5rem)] ml-12 lg:ml-0 ${
											isEven ? "lg:pr-8" : "lg:pl-8"
										}`}
									>
										<Card className="relative overflow-hidden rounded-2xl border border-border/60 bg-card/70 backdrop-blur-xl p-0 transition-all duration-300 hover:border-primary/40 hover:shadow-glow-primary">
											<span
												aria-hidden
												className={`pointer-events-none absolute top-0 h-full w-px bg-gradient-to-b from-primary/0 via-primary/60 to-primary/0 ${
													isEven ? "right-0" : "left-0"
												}`}
											/>
											<CardHeader className="p-5 pb-3">
												<CardTitle className="text-lg md:text-xl flex items-center gap-2 font-semibold">
													<span className="inline-flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
														<Briefcase className="size-4" />
													</span>
													{exp.title}
												</CardTitle>
												<div className="mt-3 flex flex-col gap-2 text-sm text-muted-foreground">
													<div className="flex items-center gap-2 flex-wrap">
														{exp.logo && (
															<Image
																src={exp.logo}
																alt={`${exp.company} logo`}
																width={24}
																height={24}
																loading="lazy"
																className="size-6 rounded-full object-cover ring-1 ring-border"
															/>
														)}
														{exp.link ? (
															<a
																href={exp.link}
																target="_blank"
																rel="noopener noreferrer"
																className="font-semibold text-foreground hover:text-primary transition-colors flex items-center gap-1 group"
															>
																{exp.company}
																<ExternalLink className="size-3 opacity-0 group-hover:opacity-100 transition-opacity" />
															</a>
														) : (
															<span className="font-semibold text-foreground">
																{exp.company}
															</span>
														)}
													</div>
													<div className="inline-flex w-fit items-center gap-2 rounded-full bg-muted px-2.5 py-1 text-xs">
														<Calendar className="size-3.5" />
														<span>{formattedPeriod}</span>
													</div>
												</div>
											</CardHeader>
											<CardContent className="p-5 pt-0">
												<p className="text-muted-foreground leading-relaxed text-pretty whitespace-pre-line">
													{exp.description}
												</p>
											</CardContent>
										</Card>
									</div>
								</motion.div>
							);
						})}
					</div>
				</div>
			</div>
		</section>
	);
};

export default Experience;
