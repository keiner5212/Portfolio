"use client";

import {
	Dialog,
	DialogContent,
	DialogTitle,
} from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";

interface ImageViewerDialogProps {
	src: string | null;
	alt?: string;
	onClose: () => void;
}

export const ImageViewerDialog = ({
	src,
	alt,
	onClose,
}: ImageViewerDialogProps) => {
	return (
		<AnimatePresence>
			{src && (
				<Dialog open={!!src} onOpenChange={(open) => !open && onClose()}>
					<DialogContent
						showCloseButton={false}
						className="bg-transparent border-none p-0 gap-0 z-[99999] w-screen h-screen max-w-none max-h-none sm:rounded-none flex items-center justify-center"
					>
						<DialogTitle className="sr-only">Image viewer</DialogTitle>
						<motion.button
							type="button"
							onClick={onClose}
							aria-label="Close image viewer"
							initial={{ opacity: 0, scale: 0.8 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0.8 }}
							transition={{ duration: 0.2 }}
							className="absolute right-4 top-4 z-30 inline-flex size-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
						>
							<X className="size-5" />
						</motion.button>
						<motion.div
							className="relative z-10 p-4 w-[90vw] h-[85vh] max-w-[1400px]"
							initial={{ opacity: 0, scale: 0.95 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0.95 }}
							transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
							onClick={(e) => e.stopPropagation()}
						>
							<Image
								src={src}
								alt={alt ?? "Fullscreen image"}
								fill
								sizes="(max-width: 1280px) 90vw, 1280px"
								className="object-contain"
								quality={90}
								priority
							/>
						</motion.div>
					</DialogContent>
				</Dialog>
			)}
		</AnimatePresence>
	);
};
