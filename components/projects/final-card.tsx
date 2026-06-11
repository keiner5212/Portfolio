"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GithubIcon } from "@/components/ui/github-icon";
import { ArrowUpRight } from "lucide-react";
import { fadeUp } from "@/lib/motion";

interface FinalCardProps {
	title: string;
	description: string;
	buttonText: string;
	href: string;
}

export function FinalCard({ title, description, buttonText, href }: FinalCardProps) {
	return (
		<motion.div variants={fadeUp} className="h-full">
			<Card className="spotlight-card relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/60 bg-card/60 backdrop-blur-xl p-0 transition-all duration-300 hover:shadow-glow-primary">
				<span
					aria-hidden
					className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent"
				/>

				{/* Spotlight beam — originates from the top center, sways slightly,
				    points down at the GitHub button. */}
				<div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
					<div
						className="spotlight-beam absolute left-1/2 top-0 -translate-x-1/2 origin-top animate-spotlight-sway"
					/>
					{/* Dust / haze inside the beam */}
					<div
						className="spotlight-haze absolute left-1/2 top-0 -translate-x-1/2 animate-spotlight-sway"
					/>
				</div>

				<CardHeader className="relative z-10 p-6 pb-3">
					<CardTitle className="text-lg md:text-xl font-semibold text-balance">
						{title}
					</CardTitle>
				</CardHeader>
				<CardContent className="relative z-10 flex flex-1 flex-col items-center justify-center gap-6 p-6 pt-2 text-center">
					<p className="text-sm text-muted-foreground text-pretty max-w-xs">
						{description}
					</p>
					<a
						href={href}
						target="_blank"
						rel="noopener noreferrer"
						className="spotlight-target group relative inline-flex items-center gap-2 overflow-hidden rounded-lg border border-border bg-background/60 px-4 py-3 text-sm font-medium transition-all hover:border-primary/60 hover:bg-primary/5 hover:shadow-glow-primary"
					>
						<GithubIcon className="size-5" aria-hidden />
						<span>{buttonText}</span>
						<ArrowUpRight
							className="size-4 text-muted-foreground transition-all group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
							aria-hidden
						/>
					</a>
				</CardContent>
			</Card>
		</motion.div>
	);
}
