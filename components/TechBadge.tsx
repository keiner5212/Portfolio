"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ExternalLink, Star } from "lucide-react";
import Link from "next/link";

interface Technology {
  name: string;
  url: string;
  tooltip: string;
  isStrong?: boolean;
}

export const TechBadge = ({ tech }: { tech: Technology }) => (
  <TooltipProvider>
    <Tooltip delayDuration={200}>
      <TooltipTrigger asChild>
        <motion.div
          whileHover={{ scale: 1.08, y: -2 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <Link
            href={tech.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block"
          >
            <Badge
              variant={tech.isStrong ? "default" : "secondary"}
              className={`cursor-pointer gap-1.5 px-3 py-1.5 text-sm font-medium transition-all group ${
                tech.isStrong
                  ? "bg-primary text-primary-foreground shadow-md hover:shadow-lg"
                  : "hover:bg-primary hover:text-primary-foreground"
              }`}
            >
              {tech.isStrong && (
                <Star className="h-3 w-3 fill-current" />
              )}
              <span>{tech.name}</span>
              <ExternalLink className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
            </Badge>
          </Link>
        </motion.div>
      </TooltipTrigger>
      <TooltipContent side="top" className="max-w-xs">
        <div className="space-y-1">
          <p className="text-sm font-medium">{tech.tooltip}</p>
          {tech.isStrong && (
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <Star className="h-3 w-3 fill-current" />
              Core expertise
            </p>
          )}
        </div>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);
