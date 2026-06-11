import { cn } from "@/lib/utils";

type OrbTone = "primary" | "cyan" | "violet";

interface OrbProps {
	tone?: OrbTone;
	className?: string;
}

export function Orb({ tone = "primary", className }: OrbProps) {
	return (
		<div
			aria-hidden
			className={cn(
				"orb",
				tone === "primary" && "orb-primary",
				tone === "cyan" && "orb-cyan",
				tone === "violet" && "orb-violet",
				className,
			)}
		/>
	);
}
