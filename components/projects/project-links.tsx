"use client";

import { GithubIcon } from "@/components/ui/github-icon";
import { Button } from "@/components/ui/button";
import { ExternalLink, ChevronDown } from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ProjectLinksProps {
	github: string[];
	website?: string;
	viewGithub: string;
	viewWebsite: string;
}

const BUTTON_VARIANTS = {
	hover: { scale: 1.03, transition: { duration: 0.2 } },
	tap: { scale: 0.97 },
};

export function ProjectLinks({
	github,
	website,
	viewGithub,
	viewWebsite,
}: ProjectLinksProps) {
	return (
		<div className="flex flex-col sm:flex-row gap-2 w-full">
			{github.length > 1 ? (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<motion.div
							whileHover="hover"
							whileTap="tap"
							variants={BUTTON_VARIANTS}
							className="w-full sm:flex-1"
						>
							<Button
								variant="outline"
								size="sm"
								className="w-full min-h-[44px] text-xs sm:text-sm rounded-lg hover:border-primary/50 hover:text-primary transition-colors"
							>
								<GithubIcon className="mr-1.5 sm:mr-2 size-4" />
								{viewGithub}
								<ChevronDown className="ml-1.5 size-3.5 opacity-60" />
							</Button>
						</motion.div>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="start" className="min-w-[14rem]">
						{github.map((link, i) => (
							<DropdownMenuItem key={`${link}-${i}`} asChild>
								<a
									href={link}
									target="_blank"
									rel="noopener noreferrer"
									className="w-full cursor-pointer"
								>
									<GithubIcon className="mr-2 size-4" />
									{link.includes("priv")
										? "Private repository"
										: `Repository ${i + 1}`}
								</a>
							</DropdownMenuItem>
						))}
					</DropdownMenuContent>
				</DropdownMenu>
			) : (
				<motion.div
					whileHover="hover"
					whileTap="tap"
					variants={BUTTON_VARIANTS}
					className="w-full sm:flex-1"
				>
					<Button
						variant="outline"
						size="sm"
						asChild
						className="w-full min-h-[44px] text-xs sm:text-sm rounded-lg hover:border-primary/50 hover:text-primary transition-colors"
					>
						{github[0]?.includes("priv") ? (
							<span className="cursor-not-allowed inline-flex items-center">
								<GithubIcon className="mr-1.5 sm:mr-2 size-4" />
								(Private)
							</span>
						) : (
							<a
								href={github[0]}
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex items-center"
							>
								<GithubIcon className="mr-1.5 sm:mr-2 size-4" />
								{viewGithub}
							</a>
						)}
					</Button>
				</motion.div>
			)}
			{website && (
				<motion.div
					whileHover="hover"
					whileTap="tap"
					variants={BUTTON_VARIANTS}
					className={cn("w-full sm:flex-1")}
				>
					<Button
						variant="outline"
						size="sm"
						asChild
						className="w-full min-h-[44px] text-xs sm:text-sm rounded-lg hover:border-primary/50 hover:text-primary transition-colors"
					>
						<a
							href={website}
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center"
						>
							<ExternalLink className="mr-1.5 sm:mr-2 size-4" />
							{viewWebsite}
						</a>
					</Button>
				</motion.div>
			)}
		</div>
	);
}
