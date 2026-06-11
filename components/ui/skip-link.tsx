export function SkipLink() {
	return (
		<a
			href="#main"
			className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground focus:shadow-lg"
		>
			Skip to content
		</a>
	);
}
