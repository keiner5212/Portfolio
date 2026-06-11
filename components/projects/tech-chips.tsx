"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TechChipsProps {
	technologies: string[];
	projectIndex: number;
}

export function TechChips({ technologies, projectIndex }: TechChipsProps) {
	const scrollRef = useRef<HTMLDivElement>(null);
	const [arrows, setArrows] = useState({ left: false, right: false });

	const checkScroll = () => {
		const el = scrollRef.current;
		if (!el) return;
		const showLeft = el.scrollLeft > 0;
		const showRight = el.scrollLeft < el.scrollWidth - el.clientWidth - 1;
		setArrows({ left: showLeft, right: showRight });
	};

	useEffect(() => {
		checkScroll();
		const el = scrollRef.current;
		let ro: ResizeObserver | null = null;
		if (typeof ResizeObserver !== "undefined" && el) {
			ro = new ResizeObserver(checkScroll);
			ro.observe(el);
		}
		window.addEventListener("resize", checkScroll, { passive: true });
		return () => {
			window.removeEventListener("resize", checkScroll);
			ro?.disconnect();
		};
	}, [technologies.length]);

	const scroll = (direction: "left" | "right") => {
		const el = scrollRef.current;
		if (!el) return;
		el.scrollBy({
			left: direction === "right" ? 200 : -200,
			behavior: "smooth",
		});
		setTimeout(checkScroll, 300);
	};

	return (
		<div className="relative flex items-center mb-4 min-h-[32px]">
			{arrows.left && (
				<motion.button
					type="button"
					aria-label="Scroll technologies left"
					onClick={() => scroll("left")}
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.9 }}
					className="absolute left-0 z-10 inline-flex size-7 items-center justify-center rounded-full bg-card border border-border text-muted-foreground shadow-sm"
				>
					<ChevronLeft className="size-4" />
				</motion.button>
			)}
			<div
				ref={scrollRef}
				id={`technologies${projectIndex}`}
				className="flex overflow-x-auto scrollbar-none space-x-2 px-1 w-full"
				style={{ scrollbarWidth: "none" }}
			>
				{technologies.map((tech, i) => (
					<motion.span
						key={`${tech}-${i}`}
						initial={{ opacity: 0, x: -6 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ delay: i * 0.04 }}
						className={cn(
							"inline-flex shrink-0 items-center rounded-full border border-border bg-background/50 px-2.5 py-1",
							"text-[10px] sm:text-xs text-foreground whitespace-nowrap",
						)}
					>
						{tech}
					</motion.span>
				))}
			</div>
			{arrows.right && (
				<motion.button
					type="button"
					aria-label="Scroll technologies right"
					onClick={() => scroll("right")}
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.9 }}
					className="absolute right-0 z-10 inline-flex size-7 items-center justify-center rounded-full bg-card border border-border text-muted-foreground shadow-sm"
				>
					<ChevronRight className="size-4" />
				</motion.button>
			)}
		</div>
	);
}
