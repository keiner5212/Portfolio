"use client";

import { useState } from "react";
import Image from "next/image";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { GithubIcon } from "@/components/ui/github-icon";
import { ExternalLink, ImageOff } from "lucide-react";
import type { Project } from "@/lib/i18n";

interface ProjectModalProps {
	project: Project | null;
	open: boolean;
	onOpenChange: (open: boolean) => void;
	viewGithub: string;
	viewWebsite: string;
	onImageClick: (image: string) => void;
}

const PLACEHOLDER = "/placeholder-image.jpg";

export function ProjectModal({
	project,
	open,
	onOpenChange,
	viewGithub,
	viewWebsite,
	onImageClick,
}: ProjectModalProps) {
	const [failed, setFailed] = useState<Record<string, boolean>>({});

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="max-w-[95vw] sm:max-w-[85vw] md:max-w-[700px] max-h-[90vh] overflow-y-auto p-4 sm:p-6 rounded-2xl">
				<DialogHeader className="pr-6 sm:pr-0">
					<DialogTitle className="text-lg sm:text-xl md:text-2xl pr-2 font-semibold text-balance">
						{project?.title}
					</DialogTitle>
					<DialogDescription className="text-xs sm:text-sm md:text-base text-pretty">
						{project?.description}
					</DialogDescription>
				</DialogHeader>

				{project?.images && project.images.length > 0 && (
					<div className="mt-3 sm:mt-4 grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
						{project.images.map((image, i) => {
							const isFailed = failed[image];
							return (
								<button
									key={`modal-image-${i}`}
									type="button"
									aria-label={`View ${project.title} image ${i + 1} fullscreen`}
									className="relative aspect-square overflow-hidden rounded-lg border border-border/60 cursor-pointer transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
									onClick={() => onImageClick(image)}
								>
									{isFailed ? (
										<div className="absolute inset-0 flex flex-col items-center justify-center gap-1 bg-muted text-muted-foreground">
											<ImageOff className="size-5" aria-hidden />
											<span className="text-[10px]">N/A</span>
										</div>
									) : (
										<Image
											src={image}
											fill
											alt={`${project.title} preview ${i + 1}`}
											className="object-cover"
											sizes="(max-width: 640px) 45vw, (max-width: 768px) 30vw, 220px"
											onError={() => setFailed((prev) => ({ ...prev, [image]: true }))}
										/>
									)}
								</button>
							);
						})}
					</div>
				)}

				<div className="flex flex-col sm:flex-row gap-2 mt-3 sm:mt-4">
					{project?.github[0] && (
						<Button
							variant="outline"
							asChild
							className="w-full sm:w-auto h-10 sm:h-9 rounded-lg"
						>
							<a
								href={project.github[0]}
								target="_blank"
								rel="noopener noreferrer"
								className="flex items-center justify-center text-sm"
							>
								<GithubIcon className="mr-2 size-4" /> {viewGithub}
							</a>
						</Button>
					)}
					{project?.website && (
						<Button
							variant="outline"
							asChild
							className="w-full sm:w-auto h-10 sm:h-9 rounded-lg"
						>
							<a
								href={project.website}
								target="_blank"
								rel="noopener noreferrer"
								className="flex items-center justify-center text-sm"
							>
								<ExternalLink className="mr-2 size-4" /> {viewWebsite}
							</a>
						</Button>
					)}
				</div>
			</DialogContent>
		</Dialog>
	);
}
