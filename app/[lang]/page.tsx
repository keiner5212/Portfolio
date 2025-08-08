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

export default function Home({
  params: { lang },
}: {
  params: { lang: "en" | "es" };
}) {
  const t = translations[lang as keyof typeof translations];

  return (
    <div className="min-h-screen bg-background">
      <Header lang={lang} t={t.header} />

      <main>
        <AnimatedSection>
          <Hero t={t.hero} />
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <About t={t.about} />
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <Experience t={t.experience} />
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <Projects t={t.projects} />
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <Contact t={t.contact} lang={lang} />
        </AnimatedSection>
      </main>

      <Footer t={t.footer} />
    </div>
  );
}
