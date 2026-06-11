"use client";

import { useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowUp } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Orb } from "@/components/ui/orb";
import { ImageViewerDialog } from "@/components/ui/image-viewer";
import { ProjectCard } from "./projects/project-card";
import { ProjectModal } from "./projects/project-modal";
import { FinalCard } from "./projects/final-card";
import { DUR, EASE, fadeUp, staggerContainer } from "@/lib/motion";
import type { Project, ProjectsTranslation } from "@/lib/i18n";
import { useRef } from "react";

const INITIAL_VISIBLE = 3;

const Projects = ({ t }: { t: ProjectsTranslation }) => {
	const [visibleProjects, setVisibleProjects] = useState(INITIAL_VISIBLE);
	const [selectedProject, setSelectedProject] = useState<Project | null>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedImage, setSelectedImage] = useState<string | null>(null);
	const sectionRef = useRef<HTMLElement>(null);
	const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
	const reduced = useReducedMotion();

	const openModal = (project: Project) => {
		setSelectedProject(project);
		setIsModalOpen(true);
	};

	const loadMore = () =>
		setVisibleProjects((prev) => Math.min(prev + 3, t.data.length));
	const showLess = () => setVisibleProjects(INITIAL_VISIBLE);

	const showLoadMore = visibleProjects < t.data.length;
	const showShowLess = visibleProjects > INITIAL_VISIBLE;
	const showFinal = visibleProjects >= t.data.length;

	return (
		<>
			<section
				ref={sectionRef}
				id="projects"
				className="relative bg-surface-1 py-20 md:py-24 lg:py-32 overflow-hidden"
			>
				<Orb
					tone="violet"
					className="w-[450px] h-[450px] -top-40 -left-32 animate-float-slow"
				/>
				<Orb
					tone="cyan"
					className="w-[400px] h-[400px] -bottom-32 -right-20 animate-float-slower"
				/>

				<div
					aria-hidden
					className="pointer-events-none absolute inset-0 opacity-30 bg-dot-grid [mask-image:radial-gradient(60%_60%_at_50%_50%,black_30%,transparent_80%)]"
				/>

				<div className="relative z-10 mx-auto max-w-7xl px-6">
					<SectionHeading title={t.title} />

					<motion.div
						initial="hidden"
						animate={isInView ? "visible" : "hidden"}
						variants={staggerContainer(0.06)}
						className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
					>
						{t.data.slice(0, visibleProjects).map((project, index) => (
							<ProjectCard
								key={`${project.title}-${index}`}
								project={project}
								index={index}
								viewGithub={t.viewGithub}
								viewWebsite={t.viewWebsite}
								viewMore={t.viewMore}
								isTeamText={t.isTeamText}
								onOpenModal={openModal}
							/>
						))}
						{showFinal && (
							<FinalCard
								title={t.finalCard.title}
								description={t.finalCard.description}
								buttonText={t.finalCard.buttonText}
								href="https://github.com/keiner5212"
							/>
						)}
					</motion.div>

					<div className="mt-12 flex min-h-[44px] justify-center">
						<AnimatePresence mode="wait">
							{showLoadMore ? (
								<motion.div
									key="load-more"
									initial={{ opacity: 0, y: 8 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: -8 }}
									transition={{ duration: reduced ? 0 : 0.2 }}
								>
									<Button
										onClick={loadMore}
										size="lg"
										variant="outline"
										className="rounded-lg border-border bg-background/60 backdrop-blur hover:border-primary/60 hover:bg-primary/5"
									>
										{t.viewMore}
										<ArrowDown className="ml-2 size-4" />
									</Button>
								</motion.div>
							) : showShowLess ? (
								<motion.div
									key="show-less"
									initial={{ opacity: 0, y: 8 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: -8 }}
									transition={{ duration: reduced ? 0 : 0.2 }}
								>
									<Button
										onClick={showLess}
										size="lg"
										variant="outline"
										className="rounded-lg border-border bg-background/60 backdrop-blur hover:border-primary/60 hover:bg-primary/5"
									>
										{t.viewLess}
										<ArrowUp className="ml-2 size-4" />
									</Button>
								</motion.div>
							) : null}
						</AnimatePresence>
					</div>
				</div>
			</section>

			<ProjectModal
				project={selectedProject}
				open={isModalOpen}
				onOpenChange={setIsModalOpen}
				viewGithub={t.viewGithub}
				viewWebsite={t.viewWebsite}
				onImageClick={(image) => setSelectedImage(image)}
			/>

			<ImageViewerDialog
				src={selectedImage}
				alt={selectedProject ? `${selectedProject.title} preview` : undefined}
				onClose={() => setSelectedImage(null)}
			/>
		</>
	);
};

export default Projects;
