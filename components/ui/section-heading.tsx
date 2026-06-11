"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { fadeUp, inViewTrigger } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
	title: ReactNode;
	className?: string;
}

export function SectionHeading({ title, className }: SectionHeadingProps) {
	return (
		<motion.div
			initial="hidden"
			whileInView="visible"
			viewport={inViewTrigger}
			variants={fadeUp}
			className={cn("mb-12 text-center", className)}
		>
			<h2 className="text-3xl md:text-4xl font-bold text-balance">{title}</h2>
			<span className="accent-bar" />
		</motion.div>
	);
}
