/** @type {import('next').NextConfig} */
module.exports = {
	images: {
		formats: ["image/avif", "image/webp"],
		deviceSizes: [640, 750, 828, 1080, 1200],
		imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
		remotePatterns: [
			{ protocol: "https", hostname: "avatars.githubusercontent.com" },
		],
	},

	async headers() {
		return [
			{
				source: "/:path*",
				headers: [
					{
						key: "Strict-Transport-Security",
						value: "max-age=63072000; includeSubDomains; preload",
					},
					{
						key: "X-Content-Type-Options",
						value: "nosniff",
					},
					{
						key: "X-Frame-Options",
						value: "DENY",
					},
					{
						key: "Referrer-Policy",
						value: "strict-origin-when-cross-origin",
					},
					{
						key: "Permissions-Policy",
						value: "camera=(), microphone=(), geolocation=()",
					},
					{
						// 'unsafe-eval' is required by Next.js dev (webpack HMR).
						// 'unsafe-inline' is required by Radix UI + Framer-Motion
						// (they inject inline styles). In production both should be
						// replaced with nonces or hashes via a CSP middleware; the
						// current config is the minimum Next.js-compatible baseline.
						key: "Content-Security-Policy",
						value: [
							"default-src 'self'",
							"script-src 'self' 'unsafe-eval' 'unsafe-inline'",
							"style-src 'self' 'unsafe-inline'",
							"img-src 'self' data: https:",
							"font-src 'self' data:",
							"connect-src 'self' https://backend.keiner-alvarado-quintero.top",
							"form-action 'self' https://backend.keiner-alvarado-quintero.top",
							"base-uri 'self'",
							"object-src 'none'",
							"frame-ancestors 'none'",
							"upgrade-insecure-requests",
						].join("; "),
					},
				],
			},
		];
	},
};
