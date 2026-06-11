"use client";

import { MotionConfig } from "framer-motion";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/toaster";
import { DEFAULT_THEME } from "@/lib/constants";
import { SkipLink } from "@/components/ui/skip-link";
import { NoiseOverlay } from "@/components/ui/noise-overlay";

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<ThemeProvider
			attribute="class"
			defaultTheme={DEFAULT_THEME}
			enableSystem
			disableTransitionOnChange
		>
			<MotionConfig reducedMotion="user">
				<SkipLink />
				<NoiseOverlay />
				{children}
				<Toaster />
			</MotionConfig>
		</ThemeProvider>
	);
}
