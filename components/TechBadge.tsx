"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { ExternalLink, Star } from "lucide-react";
import Link from "next/link";

export interface Technology {
	name: string;
	url: string;
	tooltip: string;
	isStrong?: boolean;
}

export const TechBadge = ({ tech }: { tech: Technology }) => (
	<Tooltip delayDuration={200}>
		<TooltipTrigger asChild>
			<motion.div
				whileHover={{ scale: 1.06, y: -2 }}
				whileTap={{ scale: 0.95 }}
				transition={{ type: "spring", stiffness: 400, damping: 17 }}
				className="relative inline-block"
			>
				<Link
					href={tech.url}
					target="_blank"
					rel="noopener noreferrer"
					aria-label={`${tech.name} documentation, opens in new tab`}
					className="inline-block"
				>
					<Badge
						variant={tech.isStrong ? "default" : "outline"}
						className="cursor-pointer gap-1.5 px-2.5 py-1 text-xs font-medium transition-colors group"
					>
						{tech.isStrong && (
							<Star className="size-3 fill-current" aria-hidden />
						)}
						<span>{tech.name}</span>
						<ExternalLink
							className="size-3 opacity-0 transition-opacity group-hover:opacity-100"
							aria-hidden
						/>
					</Badge>
				</Link>
			</motion.div>
		</TooltipTrigger>
		<TooltipContent
			side="top"
			sideOffset={8}
			className="z-[60] max-w-xs"
		>
			<div className="space-y-1">
				<p className="text-sm font-medium">{tech.tooltip}</p>
				{tech.isStrong && (
					<p className="text-xs text-muted-foreground flex items-center gap-1">
						<Star className="size-3 fill-current" aria-hidden />
						Core expertise
					</p>
				)}
			</div>
		</TooltipContent>
	</Tooltip>
);
