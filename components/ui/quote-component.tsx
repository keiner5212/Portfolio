import { QuoteIcon } from "lucide-react";

interface QuoteProps {
    text: string;
    author: string;
}

export default function Quote({ text, author }: QuoteProps) {
    return (
        <div className="max-w-2xl mx-auto my-8 p-6 rounded-lg shadow-lg transition-colors bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-gray-800 dark:to-gray-900">
            <div className="relative">
                <QuoteIcon className="absolute top-0 left-0 w-8 h-8 -mt-4 -ml-4 text-purple-400 dark:text-purple-300" />
                <blockquote className="pl-8 pt-2">
                    <p className="text-lg font-serif italic text-gray-800 dark:text-gray-200 mb-4">{text}</p>
                    <footer className="text-right">
                        <cite className="text-sm font-medium text-gray-600 dark:text-gray-400 not-italic">
                            — {author}
                        </cite>
                    </footer>
                </blockquote>
            </div>
        </div>
    );
}
