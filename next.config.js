// @ts-check

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  output: "export",
  images: { unoptimized: true },
  // output dir
  distDir: "dist",
};

module.exports = nextConfig;
