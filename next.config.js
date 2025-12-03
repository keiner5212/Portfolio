const CompressionPlugin = require("compression-webpack-plugin");

module.exports = {
  images: {
    unoptimized: true,
  },

  webpack(config, { isServer, dev }) {
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
