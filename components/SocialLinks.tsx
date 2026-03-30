"use client";

import { links } from "@/lib/links";
import { Github, Linkedin, Mail } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

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
		<div className="flex items-center space-x-1">
			<a
				href={links.github}
				target="_blank"
				rel="noopener noreferrer"
				className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-all duration-200"
				aria-label="Visit my GitHub profile"
			>
				<Github className="h-5 w-5" />
			</a>
			<a
				href={links.linkedin}
				target="_blank"
				rel="noopener noreferrer"
				className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-all duration-200"
				aria-label="Visit my LinkedIn profile"
			>
				<Linkedin className="h-5 w-5" />
			</a>
			<button
				onClick={copyEmail}
				aria-label="Copy email address to clipboard"
				title="Copy email"
				className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
			>
				<Mail className="h-5 w-5" />
			</button>
		</div>
	);
};

export default SocialLinks;
