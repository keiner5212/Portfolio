"use client";

import { Quote as QuoteIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface QuoteProps {
	text: string;
	author: string;
}

export function QuoteCard({ text, author }: QuoteProps) {
	return (
		<div className="relative glass-card rounded-2xl p-6 md:p-8 h-full min-h-[280px] flex flex-col justify-center">
			<QuoteIcon
				aria-hidden
				className="absolute -top-4 -left-4 size-14 text-primary/15 transition-colors"
				strokeWidth={1}
			/>
			<blockquote className="pl-2">
				<AnimatePresence mode="wait">
					<motion.p
						key={text}
						initial={{ opacity: 0, y: 6 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -6 }}
						transition={{ duration: 0.4 }}
						className="text-lg md:text-xl font-heading italic text-pretty leading-relaxed text-foreground"
					>
						“{text}”
					</motion.p>
				</AnimatePresence>
				<motion.footer
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.2, duration: 0.4 }}
					className="mt-6 text-right"
				>
					<cite className="text-sm font-medium text-muted-foreground not-italic">
						— {author}
					</cite>
				</motion.footer>
			</blockquote>
		</div>
	);
}
