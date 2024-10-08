"use client"

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { ModeToggle } from '@/components/mode-toggle';
import LanguageToggle from '@/components/LanguageToggle';

const Header = ({ lang, t }: { lang: string, t: any }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href={`/${lang}`} className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block px-5">Keiner José Alvarado</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link href={`/${lang}#about`}>{t.about}</Link>
            <Link href={`/${lang}#experience`}>{t.experience}</Link>
            <Link href={`/${lang}#projects`}>{t.projects}</Link>
            <Link href={`/${lang}#contact`}>{t.contact}</Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <ModeToggle />
          </div>
          <LanguageToggle />
          <nav className="flex items-center">
            <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu}>
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </nav>
        </div>
      </div>
      {isMenuOpen && (
        <div className="container md:hidden">
          <nav className="flex flex-col space-y-3 py-4">
            <Link href={`/${lang}#about`} onClick={toggleMenu}>{t.about}</Link>
            <Link href={`/${lang}#experience`} onClick={toggleMenu}>{t.experience}</Link>
            <Link href={`/${lang}#projects`} onClick={toggleMenu}>{t.projects}</Link>
            <Link href={`/${lang}#contact`} onClick={toggleMenu}>{t.contact}</Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;