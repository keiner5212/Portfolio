import SocialLinks from "./SocialLinks";

const Footer = () => {
	return (
		<footer className="relative bg-surface-2 pt-10 pb-8">
			<div className="section-divider mb-10" aria-hidden />
			<div className="mx-auto max-w-7xl px-6">
				<div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
					<p className="text-sm text-muted-foreground">
						© {new Date().getFullYear()}{" "}
						<a
							href="https://keiner-alvarado-quintero.top"
							target="_blank"
							rel="noopener noreferrer"
							className="text-foreground hover:text-primary transition-colors"
						>
							keiner-alvarado-quintero.top
						</a>
					</p>
					<SocialLinks />
				</div>
			</div>
		</footer>
	);
};

export default Footer;
