import Header from "@/components/Header";
import Hero from "@/components/hero/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { translations } from "@/lib/translations";
import type { Lang } from "@/lib/i18n";

export function generateStaticParams() {
	return [{ lang: "en" }, { lang: "es" }];
}

export default async function Home({
	params,
}: {
	params: Promise<{ lang: Lang }>;
}) {
	const { lang } = await params;
	const t = translations[lang];

	return (
		<div className="min-h-screen bg-background">
			<Header lang={lang} t={t.header} />

			<main id="main">
				<Hero t={t.hero} />

				<About t={t.about} />

				<Experience t={t.experience} />

				<Projects t={t.projects} />

				<Contact t={t.contact} lang={lang} />
			</main>

			<Footer />
		</div>
	);
}
