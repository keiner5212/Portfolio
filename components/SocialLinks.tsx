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
		<div className="flex space-x-4">
			<a
				href={links.github}
				target="_blank"
				rel="noopener noreferrer"
				className="text-muted-foreground hover:text-primary transition-colors"
				aria-label="Visit my GitHub profile"
			>
				<Github className="h-5 w-5" />
			</a>
			<a
				href={links.linkedin}
				target="_blank"
				rel="noopener noreferrer"
				className="text-muted-foreground hover:text-primary transition-colors"
				aria-label="Visit my LinkedIn profile"
			>
				<Linkedin className="h-5 w-5" />
			</a>
			<p title="Copy email">
				<Mail className="h-5 w-5 cursor-pointer text-muted-foreground hover:text-primary transition-colors" onClick={copyEmail} />
			</p>
		</div>
	);
};

export default SocialLinks;
