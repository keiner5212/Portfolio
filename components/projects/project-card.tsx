"use client";

import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ProjectGallery } from "./project-gallery";
import { ProjectLinks } from "./project-links";
import { TechChips } from "./tech-chips";
import type { Project } from "@/lib/i18n";
import { DUR, EASE, fadeUp } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
	project: Project;
	index: number;
	viewGithub: string;
	viewWebsite: string;
	viewMore: string;
	isTeamText: string;
	onOpenModal: (project: Project) => void;
}

export function ProjectCard({
	project,
	index,
	viewGithub,
	viewWebsite,
	viewMore,
	isTeamText,
	onOpenModal,
}: ProjectCardProps) {
	const isTeam = !!project.isTeam;
	return (
		<motion.div
			variants={fadeUp}
			transition={{
				duration: DUR.slow,
				ease: EASE.outExpo,
				delay: index * 0.06,
			}}
			className="group h-full"
		>
			<Card className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/60 bg-card/60 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-glow-primary">
				<span
					aria-hidden
					className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent"
				/>

				<div className="absolute top-2 right-2 sm:top-3 sm:right-3 z-20">
					<span
						className={cn(
							"rounded-full px-2 py-0.5 sm:px-2.5 sm:py-1 text-[10px] sm:text-xs font-medium uppercase tracking-wider shadow-md backdrop-blur",
							isTeam
								? "bg-violet/15 text-violet border border-violet/20"
								: "bg-cyan/15 text-cyan border border-cyan/20",
						)}
					>
						{isTeam ? isTeamText : "Personal"}
					</span>
				</div>

				<CardHeader className="px-4 sm:px-6 pt-4 pb-3">
					<CardTitle className="text-base sm:text-lg pr-16 sm:pr-20 font-semibold text-balance">
						{project.title}
					</CardTitle>
					<button
						type="button"
						onClick={() => onOpenModal(project)}
						className="text-left cursor-pointer rounded-md -mx-1 px-1 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
						aria-label={`View full details of ${project.title}`}
					>
						<p className="line-clamp-2 sm:line-clamp-1 text-xs sm:text-sm text-muted-foreground text-pretty">
							{project.description}
						</p>
						<span className="mt-1 inline-block text-sm font-medium text-primary group-hover:underline">
							{viewMore} →
						</span>
					</button>
				</CardHeader>

				<CardContent className="mb-4 px-4 sm:px-6">
					<TechChips
						technologies={project.technologies}
						projectIndex={index}
					/>
					<div className="overflow-hidden rounded-xl border border-border/40">
						<ProjectGallery images={project.images} title={project.title} />
					</div>
				</CardContent>

				<div className="mt-auto px-4 sm:px-6 pb-4">
					<ProjectLinks
						github={project.github}
						website={project.website}
						viewGithub={viewGithub}
						viewWebsite={viewWebsite}
					/>
				</div>
			</Card>
		</motion.div>
	);
}
