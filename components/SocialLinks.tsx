"use client";

import {
	TooltipProvider,
	Tooltip,
	TooltipTrigger,
	TooltipContent,
} from "@/components/ui/tooltip";
import { motion } from "framer-motion";
import { GithubIcon } from "./ui/github-icon";
import { Linkedin, Mail, type LucideIcon } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { links } from "@/lib/links";
import { cn } from "@/lib/utils";

const buttonClass = cn(
	"inline-flex h-10 w-10 items-center justify-center rounded-md",
	"text-muted-foreground hover:text-foreground hover:bg-accent",
	"transition-colors duration-200",
	"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
);

function SocialAnchor({
	href,
	icon: Icon,
	label,
}: {
	href: string;
	icon: LucideIcon | typeof GithubIcon;
	label: string;
}) {
	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<motion.a
					href={href}
					target="_blank"
					rel="noopener noreferrer"
					aria-label={`Visit my ${label} profile`}
					whileHover={{ y: -2 }}
					whileTap={{ scale: 0.92 }}
					className={buttonClass}
				>
					<Icon className="size-5" aria-hidden />
				</motion.a>
			</TooltipTrigger>
			<TooltipContent side="top">{label}</TooltipContent>
		</Tooltip>
	);
}

function SocialCopyButton({
	icon: Icon,
	onCopy,
}: {
	icon: LucideIcon;
	onCopy: () => void;
}) {
	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<motion.button
					type="button"
					aria-label="Copy email address to clipboard"
					onClick={onCopy}
					whileHover={{ y: -2 }}
					whileTap={{ scale: 0.92 }}
					className={buttonClass}
				>
					<Icon className="size-5" aria-hidden />
				</motion.button>
			</TooltipTrigger>
			<TooltipContent side="top">Copy email</TooltipContent>
		</Tooltip>
	);
}

const SocialLinks = () => {
	const { toast } = useToast();

	const copyEmail = () => {
		navigator.clipboard.writeText(links.email);
		toast({
			title: "Email copied",
			description: "Email address copied to clipboard",
		});
	};

	return (
		<TooltipProvider delayDuration={150}>
			<div className="flex items-center gap-1">
				<SocialAnchor href={links.github} icon={GithubIcon} label="GitHub" />
				<SocialAnchor href={links.linkedin} icon={Linkedin} label="LinkedIn" />
				<SocialCopyButton icon={Mail} onCopy={copyEmail} />
			</div>
		</TooltipProvider>
	);
};

export default SocialLinks;
