import "../globals.css";
import "normalize.css";
import type { Metadata } from "next";
import { Providers } from "@/components/Providers";

export const metadata: Metadata = {
	title: "Keiner José Alvarado - Portfolio",
	description:
		"Professional portfolio of Keiner José Alvarado Quintero - Software Developer",
};

export default async function RootLayout({
	children,
	params
}: {
	children: React.ReactNode;
	params: Promise<{ lang: string }>;
}) {
	await params;
	return <Providers>{children}</Providers>;
}
