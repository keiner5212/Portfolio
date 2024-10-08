"use client"

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';

const LanguageToggle = () => {
  const router = useRouter();
  const pathname = usePathname();

  const toggleLanguage = () => {
    const newLocale = pathname.startsWith('/es') ? 'en' : 'es';
    router.push(`/${newLocale}${pathname.substring(3)}`);
  };

  return (
    <Button onClick={toggleLanguage} variant="outline" size="sm">
      {pathname.startsWith('/es') ? 'EN' : 'ES'}
    </Button>
  );
};

export default LanguageToggle;