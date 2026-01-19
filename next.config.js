const CompressionPlugin = require("compression-webpack-plugin");

module.exports = {
  images: {
    unoptimized: true,
  },

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Content-Security-Policy',
            value: `
              default-src 'self';
              script-src 'self' 'unsafe-eval' 'unsafe-inline';
              style-src 'self' 'unsafe-inline';
              img-src 'self' data: https:;
              font-src 'self' data:;
              connect-src 'self' https://backend.keiner-alvarado-quintero.top;
              frame-ancestors 'none';
            `.replace(/\s+/g, ' ').trim(),
          },
        ],
      },
    ];
  },

  webpack(config, { isServer, dev }) {
    // Use memory cache to avoid serialization warnings
    config.cache = { type: 'memory' };

    //obfuscate
    if (!isServer && !dev) {
      //gzip
      config.plugins.push(
        new CompressionPlugin({
          algorithm: "gzip",
          test: /\.(js|css|html|svg)$/,
        }),
        new CompressionPlugin({
          filename: "[path][base].br",
          algorithm: "brotliCompress",
          test: /\.(js|css|html|svg)$/,
          compressionOptions: { level: 11 },
          threshold: 10240,
          minRatio: 0.8,
        }),
      );
    }

    return config;
  },
};
