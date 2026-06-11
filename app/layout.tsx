import "./globals.css";
import type { Metadata } from "next";
import { Archivo, Space_Grotesk } from "next/font/google";

const archivo = Archivo({
	subsets: ["latin"],
	variable: "--font-heading",
	display: "swap",
});

const spaceGrotesk = Space_Grotesk({
	subsets: ["latin"],
	variable: "--font-body",
	display: "swap",
});

const SITE_URL = "https://keiner-alvarado-quintero.top";

export const metadata: Metadata = {
	title: {
		default: "Keiner Alvarado Quintero - Full Stack Developer Portfolio",
		template: "%s | Keiner Alvarado Quintero",
	},
	description:
		"Portfolio of Keiner Alvarado Quintero - Experienced Full Stack Developer specializing in modern web technologies. Check out my projects and skills.",
	keywords: [
		"Keiner Alvarado",
		"Software Developer",
		"Full Stack Developer",
		"Web Developer",
		"Portfolio",
		"React Developer",
		"Next.js Developer",
		"JavaScript Expert",
	],
	authors: [{ name: "Keiner Alvarado Quintero" }],
	creator: "Keiner Alvarado Quintero",
	publisher: "Keiner Alvarado Quintero",
	metadataBase: new URL(SITE_URL),
	alternates: {
		canonical: "/",
	},
	openGraph: {
		title: "Keiner Alvarado Quintero - Full Stack Developer",
		description:
			"Professional portfolio showcasing my projects and skills as a Full Stack Developer",
		url: SITE_URL,
		siteName: "Keiner Alvarado Portfolio",
		images: [
			{
				url: "/opengraph-image.jpg",
				width: 1200,
				height: 630,
				alt: "Keiner Alvarado Portfolio",
			},
		],
		locale: "en_US",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "Keiner Alvarado Quintero - Full Stack Developer",
		description:
			"Professional portfolio showcasing my projects and skills as a Full Stack Developer",
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
};

const jsonLd = {
	"@context": "https://schema.org",
	"@type": "Person",
	name: "Keiner Alvarado Quintero",
	url: SITE_URL,
	jobTitle: "Full-Stack Software Developer",
	knowsAbout: [
		"React",
		"Next.js",
		"TypeScript",
		"Node.js",
		"AWS",
		"Docker",
	],
	sameAs: [
		"https://github.com/keiner5212",
		"https://www.linkedin.com/in/keiner-alvarado-quintero-96245a232/",
	],
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" className="scroll-smooth" suppressHydrationWarning>
			<head>
				<link rel="icon" href="/favicon.ico" sizes="any" />
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
				/>
			</head>
			<body className={`${archivo.variable} ${spaceGrotesk.variable}`}>
				{children}
			</body>
		</html>
	);
}
