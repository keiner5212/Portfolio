import "../globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "@/components/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Keiner José Alvarado - Portfolio",
	description:
		"Professional portfolio of Keiner José Alvarado - Software Developer",
};

export default function RootLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: { lang: string };
}) {
	return <Providers>{children}</Providers>;
}
