import type { Transition, Variants } from "framer-motion";

export const EASE = {
	out: [0, 0, 0.2, 1] as [number, number, number, number],
	in: [0.4, 0, 1, 1] as [number, number, number, number],
	inOut: [0.4, 0, 0.2, 1] as [number, number, number, number],
	outExpo: [0.16, 1, 0.3, 1] as [number, number, number, number],
	outQuart: [0.25, 1, 0.5, 1] as [number, number, number, number],
};

export const DUR = {
	fast: 0.18,
	base: 0.4,
	slow: 0.7,
} as const;

export const spring = {
	gentle: {
		type: "spring",
		stiffness: 120,
		damping: 18,
		mass: 1,
	} as Transition,
	snappy: {
		type: "spring",
		stiffness: 300,
		damping: 22,
		mass: 0.8,
	} as Transition,
	bouncy: {
		type: "spring",
		stiffness: 260,
		damping: 14,
		mass: 0.9,
	} as Transition,
	stiff: {
		type: "spring",
		stiffness: 400,
		damping: 30,
		mass: 0.5,
	} as Transition,
};

export const fadeUp: Variants = {
	hidden: { opacity: 0, y: 28 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: DUR.slow, ease: EASE.outExpo },
	},
};

export const fadeIn: Variants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: { duration: DUR.base, ease: EASE.out },
	},
};

export const fadeLeft: Variants = {
	hidden: { opacity: 0, x: -40 },
	visible: {
		opacity: 1,
		x: 0,
		transition: { duration: DUR.slow, ease: EASE.outExpo },
	},
};

export const fadeRight: Variants = {
	hidden: { opacity: 0, x: 40 },
	visible: {
		opacity: 1,
		x: 0,
		transition: { duration: DUR.slow, ease: EASE.outExpo },
	},
};

export const scaleIn: Variants = {
	hidden: { opacity: 0, scale: 0.9 },
	visible: { opacity: 1, scale: 1, transition: spring.bouncy },
};

export const staggerContainer = (delay = 0.1): Variants => ({
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: { staggerChildren: delay, delayChildren: 0.05 },
	},
});

export const sectionReveal: Variants = {
	hidden: { opacity: 0, y: 40 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.7, ease: EASE.outExpo },
	},
};

export const hoverLift = {
	whileHover: { y: -4, transition: { duration: DUR.fast, ease: EASE.out } },
	whileTap: { y: -1, scale: 0.99, transition: { duration: DUR.fast } },
};

export const glowPulse: Variants = {
	initial: { opacity: 0.6, scale: 1 },
	animate: {
		opacity: [0.55, 1, 0.55],
		scale: [1, 1.04, 1],
		transition: { duration: 3.5, repeat: Infinity, ease: "easeInOut" },
	},
};

export const heroReveal: Variants = {
	hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
	visible: {
		opacity: 1,
		y: 0,
		filter: "blur(0px)",
		transition: { duration: 0.7, ease: EASE.outExpo },
	},
};

export const inViewTrigger = { once: true, margin: "-80px 0px" } as const;
