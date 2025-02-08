import "../globals.css";
import "normalize.css";
import type { Metadata } from "next";
import { Providers } from "@/components/Providers";

export const metadata: Metadata = {
	title: "Keiner José Alvarado - Portfolio",
	description:
		"Professional portfolio of Keiner José Alvarado Quintero - Software Developer",
};

export default function RootLayout({
	children
}: {
	children: React.ReactNode;
	params: { lang: string };
}) {
	return <Providers>{children}</Providers>;
}
