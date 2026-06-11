"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ModeToggle } from "@/components/mode-toggle";
import LanguageToggle from "@/components/LanguageToggle";
import { cn } from "@/lib/utils";
import { EASE, DUR } from "@/lib/motion";

interface NavLink {
	href: string;
	label: string;
}

interface HeaderProps {
	lang: string;
	t: {
		about: string;
		experience: string;
		projects: string;
		contact: string;
	};
}

const Header = ({ lang, t }: HeaderProps) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);
	const reduced = useReducedMotion();

	useEffect(() => {
		const onScroll = () => {
			const next = window.scrollY > 16;
			setScrolled((prev) => (prev === next ? prev : next));
		};
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	const toggleMenu = () => setIsMenuOpen((v) => !v);

	const links: NavLink[] = [
		{ href: `/${lang}#about`, label: t.about },
		{ href: `/${lang}#experience`, label: t.experience },
		{ href: `/${lang}#projects`, label: t.projects },
		{ href: `/${lang}#contact`, label: t.contact },
	];

	return (
		<motion.header
			initial={reduced ? false : { y: -40, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			transition={{ duration: DUR.slow, ease: EASE.outExpo }}
			className={cn(
				"sticky top-0 z-50 w-full transition-[backdrop-filter,background-color,box-shadow] duration-300",
				scrolled
					? "bg-background/70 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 shadow-[0_4px_20px_-12px_rgba(0,0,0,0.15)]"
					: "bg-background/40 backdrop-blur-md",
			)}
		>
			<div className="absolute inset-x-0 bottom-0 h-px section-divider" aria-hidden />
			<div className="mx-auto flex h-16 max-w-7xl items-center px-6">
				<div className="mr-6 hidden md:flex">
					<Link
						href={`/${lang}`}
						className="mr-6 flex items-center space-x-2 font-heading font-bold tracking-tight"
					>
						<span className="inline-block rounded-md bg-primary/10 px-2 py-0.5 text-sm text-primary">
							K
						</span>
						<span className="hidden sm:inline-block text-foreground">
							Keiner José Alvarado
						</span>
					</Link>
					<nav className="flex items-center space-x-1 text-sm font-medium">
						{links.map((link) => (
							<Link
								key={link.href}
								href={link.href}
								className="group relative rounded-md px-3 py-1.5 text-muted-foreground transition-colors duration-200 hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
							>
								{link.label}
								<span className="absolute -bottom-0.5 left-3 right-3 h-[2px] origin-left scale-x-0 rounded-full bg-foreground transition-transform duration-300 group-hover:scale-x-100" />
							</Link>
						))}
					</nav>
				</div>

				<div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
					<Link
						href={`/${lang}`}
						className="md:hidden flex items-center space-x-2 font-heading font-bold"
					>
						<span className="inline-block rounded-md bg-primary/10 px-2 py-0.5 text-sm text-primary">
							K
						</span>
					</Link>
					<div className="flex items-center gap-1.5">
						<ModeToggle />
						<LanguageToggle />
						<button
							type="button"
							onClick={toggleMenu}
							className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-md border border-border bg-background/60 backdrop-blur transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
							aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
							aria-expanded={isMenuOpen}
							aria-controls="mobile-menu"
						>
							{isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
						</button>
					</div>
				</div>
			</div>

			<AnimatePresence>
				{isMenuOpen && (
					<motion.nav
						id="mobile-menu"
						initial={{ height: 0, opacity: 0 }}
						animate={{ height: "auto", opacity: 1 }}
						exit={{ height: 0, opacity: 0 }}
						transition={{ duration: 0.3, ease: EASE.out }}
						className="md:hidden overflow-hidden border-t border-border/40 bg-background/90 backdrop-blur-xl"
					>
						<motion.ul
							initial="hidden"
							animate="show"
							variants={{
								hidden: {},
								show: { transition: { staggerChildren: 0.06 } },
							}}
							className="mx-auto flex max-w-7xl flex-col px-6 py-2"
						>
							{links.map((link) => (
								<motion.li
									key={link.href}
									variants={{
										hidden: { opacity: 0, x: -8 },
										show: { opacity: 1, x: 0 },
									}}
								>
									<Link
										href={link.href}
										onClick={toggleMenu}
										className="flex items-center py-3 text-base text-muted-foreground transition-colors hover:text-foreground border-b border-border/40 last:border-b-0"
									>
										{link.label}
									</Link>
								</motion.li>
							))}
						</motion.ul>
					</motion.nav>
				)}
			</AnimatePresence>
		</motion.header>
	);
};

export default Header;
