import { NextRequest, NextResponse } from "next/server";

const SUPPORTED_LANGS = ["en", "es"] as const;
type Lang = (typeof SUPPORTED_LANGS)[number];

export function middleware(request: NextRequest) {
	const seg = request.nextUrl.pathname.split("/")[1];
	const lang: Lang = (SUPPORTED_LANGS as readonly string[]).includes(seg)
		? (seg as Lang)
		: "en";

	const requestHeaders = new Headers(request.headers);
	requestHeaders.set("x-lang", lang);

	return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
	// Run on actual page routes only — skip Next internals (_next/*),
	// API routes, the favicon, files with extensions, and the root /.
	matcher: ["/en/:path*", "/es/:path*"],
};
