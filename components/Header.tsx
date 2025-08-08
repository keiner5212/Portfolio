"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import LanguageToggle from "@/components/LanguageToggle";
import { motion, AnimatePresence } from "framer-motion";

const Header = ({ lang, t }: { lang: string; t: any }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href={`/${lang}`} className="mr-6 flex items-center space-x-2">
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden font-bold sm:inline-block px-5"
            >
              Keiner José Alvarado
            </motion.span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <motion.div whileHover={{ scale: 1.05 }}>
              <Link href={`/${lang}#about`}>{t.about}</Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Link href={`/${lang}#experience`}>{t.experience}</Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Link href={`/${lang}#projects`}>{t.projects}</Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Link href={`/${lang}#contact`}>{t.contact}</Link>
            </motion.div>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <ModeToggle />
          </div>
          <LanguageToggle />
          <nav className="flex items-center">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={toggleMenu}
              >
                {isMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            </motion.div>
          </nav>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="container md:hidden overflow-hidden"
          >
            <motion.nav
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="flex flex-col space-y-3 py-4"
            >
              <motion.div variants={itemVariants}>
                <Link href={`/${lang}#about`} onClick={toggleMenu}>
                  {t.about}
                </Link>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Link href={`/${lang}#experience`} onClick={toggleMenu}>
                  {t.experience}
                </Link>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Link href={`/${lang}#projects`} onClick={toggleMenu}>
                  {t.projects}
                </Link>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Link href={`/${lang}#contact`} onClick={toggleMenu}>
                  {t.contact}
                </Link>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
