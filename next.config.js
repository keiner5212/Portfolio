const WebpackObfuscatorPlugin = require("webpack-obfuscator");
const CompressionPlugin = require("compression-webpack-plugin");

module.exports = {
  images: {
    formats: ["image/avif", "image/webp"],
  },

  webpack(config, { isServer, dev }) {
    //obfuscate
    if (!isServer && !dev) {
      config.plugins.push(
        new WebpackObfuscatorPlugin(
          {
            rotateStringArray: true,
            stringArray: true,
            stringArrayEncoding: ["base64"],
            stringArrayThreshold: 0.75,
          },
          [],
        ),
      );

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
