import type { Metadata } from "next";
import { Providers } from "@/components/Providers";
import type { Lang } from "@/lib/i18n";

const TITLES: Record<Lang, string> = {
	en: "Keiner José Alvarado - Portfolio",
	es: "Keiner José Alvarado - Portafolio",
};

const DESCRIPTIONS: Record<Lang, string> = {
	en: "Professional portfolio of Keiner José Alvarado Quintero - Software Developer",
	es: "Portafolio profesional de Keiner José Alvarado Quintero - Desarrollador de Software",
};

export async function generateMetadata({
	params,
}: {
	params: Promise<{ lang: string }>;
}): Promise<Metadata> {
	const { lang } = await params;
	const safeLang: Lang = lang === "es" ? "es" : "en";
	return {
		title: TITLES[safeLang],
		description: DESCRIPTIONS[safeLang],
		alternates: {
			languages: { en: "/en", es: "/es" },
		},
	};
}

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <Providers>{children}</Providers>;
}
