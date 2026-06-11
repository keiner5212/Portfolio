/** @type {import('next').NextConfig} */
module.exports = {
	eslint: {
		ignoreDuringBuilds: true,
	},
	images: {
		formats: ["image/avif", "image/webp"],
		deviceSizes: [640, 750, 828, 1080, 1200],
		imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
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
						key: "X-XSS-Protection",
						value: "1; mode=block",
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
						key: "Content-Security-Policy",
						value: `
							default-src 'self';
							script-src 'self' 'unsafe-eval' 'unsafe-inline';
							style-src 'self' 'unsafe-inline';
							img-src 'self' data: https:;
							font-src 'self' data:;
							connect-src 'self' https://backend.keiner-alvarado-quintero.top;
							frame-ancestors 'none';
						`
							.replace(/\s+/g, " ")
							.trim(),
					},
				],
			},
		];
	},
};
