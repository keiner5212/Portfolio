import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { translations } from '@/lib/translations';

export function generateStaticParams() {
  return [
    { lang: 'en' },
    { lang: 'es' },
  ];
}

export default function Home({ params: { lang } }: { params: { lang: 'en' | 'es' } }) {
  const t = translations[lang as keyof typeof translations];

  return (
    <div className="min-h-screen bg-background">
      <Header lang={lang} t={t.header} />
      <main>
        <Hero t={t.hero} />
        <About t={t.about} />
        <Experience t={t.experience} />
        <Projects t={t.projects} />
        <Contact t={t.contact} />
      </main>
      <Footer t={t.footer} />
    </div>
  );
}