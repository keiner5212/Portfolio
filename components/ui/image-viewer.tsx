"use client";

import { Dialog, DialogContent, DialogOverlay, DialogTitle } from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";

interface ImageViewerDialogProps {
  src: string | null;
  onClose: () => void;
}

export const ImageViewerDialog = ({ src, onClose }: ImageViewerDialogProps) => {
  return (
    <Dialog open={!!src} onOpenChange={(open) => !open && onClose()}>
      <AnimatePresence>
        {src && (
          <DialogContent className="bg-transparent border-none p-0 z-[99999] max-w-screen max-h-screen flex items-center justify-center">
            <DialogTitle className="sr-only">Image viewer</DialogTitle>
            <motion.div
              className="relative z-10 my-8 p-4 h-[95vh] w-[80vw]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Image
                src={src}
                alt="Fullscreen"
                className="h-full w-full"
                style={{ objectFit: "contain" }}
                width={0}
                height={0}
              />
            </motion.div>
          </DialogContent>
        )}
      </AnimatePresence>
    </Dialog>
  );
};
