"use client";

import { useRouter, usePathname } from "next/navigation";
import { Languages } from "lucide-react";
import { Button } from "@/components/ui/button";

const LanguageToggle = () => {
	const router = useRouter();
	const pathname = usePathname();
	const isEs = pathname.startsWith("/es");

	const toggleLanguage = () => {
		const newLocale = isEs ? "en" : "es";
		// Strip the current locale prefix from the pathname so we never
		// produce paths like /en/es when toggling from /en.
		const stripped =
			pathname.startsWith("/es/")
				? pathname.slice(3)
				: pathname === "/es"
					? "/"
					: pathname.startsWith("/en/")
						? pathname.slice(3)
						: pathname === "/en"
							? "/"
							: pathname;
		router.push(`/${newLocale}${stripped === "/" ? "" : stripped}`);
	};

	return (
		<Button
			onClick={toggleLanguage}
			variant="outline"
			size="sm"
			aria-label={`Switch language to ${isEs ? "English" : "Spanish"}`}
			className="rounded-md gap-1.5 font-medium"
		>
			<Languages className="size-3.5" aria-hidden />
			<span className="text-xs uppercase tracking-wider">
				{isEs ? "EN" : "ES"}
			</span>
		</Button>
	);
};

export default LanguageToggle;
