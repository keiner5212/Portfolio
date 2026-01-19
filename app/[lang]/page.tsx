import Header from "@/components/Header";
import Hero from "@/components/hero/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { translations } from "@/lib/translations";
import { AnimatedSection } from "@/components/AnimatedSection";

export function generateStaticParams() {
  return [{ lang: "en" }, { lang: "es" }];
}

export default async function Home({
  params,
}: {
  params: Promise<{ lang: "en" | "es" }>;
}) {
  const { lang } = await params;
  const t = translations[lang as keyof typeof translations];

  return (
    <div className="min-h-screen bg-background">
      <Header lang={lang} t={t.header} />

      <main>
        <AnimatedSection>
          <Hero t={t.hero} />
        </AnimatedSection>

        <AnimatedSection delay={0.3}>
          <About t={t.about} />
        </AnimatedSection>

        <AnimatedSection delay={0.3}>
          <Experience t={t.experience} />
        </AnimatedSection>

        <AnimatedSection delay={0.3}>
          <Projects t={t.projects} />
        </AnimatedSection>

        <AnimatedSection delay={0.3}>
          <Contact t={t.contact} lang={lang} />
        </AnimatedSection>
      </main>

      <Footer />
    </div>
  );
}
