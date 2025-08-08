import { QuoteIcon } from "lucide-react";
import { motion } from "framer-motion";

interface QuoteProps {
  text: string;
  author: string;
}

export default function Quote({ text, author }: QuoteProps) {
  return (
    <motion.div
      className="max-w-2xl mx-auto my-8 p-6 rounded-lg shadow-lg transition-colors bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-gray-800 dark:to-gray-900"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="relative">
        <QuoteIcon className="absolute top-0 left-0 w-8 h-8 -mt-4 -ml-4 text-purple-400 dark:text-purple-300" />
        <blockquote className="pl-8 pt-2">
          <motion.p
            className="text-lg font-serif italic text-gray-800 dark:text-gray-200 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            {text}
          </motion.p>
          <motion.footer
            className="text-right"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <cite className="text-sm font-medium text-gray-600 dark:text-gray-400 not-italic">
              — {author}
            </cite>
          </motion.footer>
        </blockquote>
      </div>
    </motion.div>
  );
}
